import React, { useEffect, useState, useRef, useCallback } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from "react-native-maps";
import {
    requestForegroundPermissionsAsync, 
    getCurrentPositionAsync, 
    watchPositionAsync,
    LocationAccuracy
} from "expo-location";
import { RootStackScreenProps } from "navigation";
import * as Paho from 'paho-mqtt';
import throttle from "lodash.throttle";


type Props = RootStackScreenProps<"Home">;

const brokerUrl = `192.168.0.138`;
const client = new Paho.Client(brokerUrl, 8883, "clientId");

const Home = ({ route }: Props) => {
    const navigation = useNavigation();
    const [location, setLocation] = useState(null);
    const mapRef = useRef(null);
    const subscriptionRef = useRef(null);
    const [sprintStatus, setSprintStatus] = useState("Iniciar corrida");
    const [sprintId, setSprintId] = useState(null);
    const [mqttConnected, setMqttConnected] = useState(false);

    const api = `http://`+ brokerUrl + `:3001`;

    const sendLocationData = useCallback(
      throttle((_location, _sprintId) => {
        if (mqttConnected) {
          const message = new Paho.Message(
            JSON.stringify({
              lat: _location.coords.latitude,
              lon: _location.coords.longitude,
              sprintId: _sprintId,
            })
          );
          console.log({
            lat: _location.coords.latitude,
            lon: _location.coords.longitude,
          });
          message.destinationName = "geolocation";
          client.send(message);
        }
      }, 30000),
      [mqttConnected]
    );

    const createSprint = async () => {
        try {
            const response = await fetch(api + "/corrida/" + route.params.idUser, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const sprintData = await response.json();
    
            if (sprintData.id !== null) {
                setSprintId(sprintData.id);
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    async function startRace() {
        if (sprintStatus == "Iniciar corrida") {
            setSprintStatus("Parar corrida");
            await createSprint();

            client.connect({
              onSuccess() {
                setMqttConnected(true);
              },
              onFailure(error) {
                console.error(error);
              },
            });
        } else {
            setSprintStatus("Iniciar corrida");
            setSprintId(null);
            setMqttConnected(false);
            client.disconnect();
        }
    }

    async function logout() {
        if (subscriptionRef.current) {
            subscriptionRef.current.remove();
        }
        navigation.navigate("Login");
    }

    async function requestLocationPermissions() {
        const { granted } = await requestForegroundPermissionsAsync();
        if (!granted) {
            Alert.alert('Permissão necessária', 'Este app precisa de acesso à localização.');
            return;
        }
        const currentPosition = await getCurrentPositionAsync();
        setLocation(currentPosition);
    }

    useEffect(() => {
        requestLocationPermissions();

        const unsubscribe = watchPositionAsync({
            accuracy: LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1,
        }, (location) => {
            setLocation(location);
            mapRef.current?.animateCamera({ center: location.coords });
        }).then(subscription => {
            subscriptionRef.current = subscription;
            return () => subscription.remove();
        });

        return () => {
            unsubscribe.then(remove => remove());
        };
    }, []);

    useEffect(() => {
        subscriptionRef.current = watchPositionAsync({
            accuracy: LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1,
        }, (response) => {
            //console.log(response);
            setLocation(response);
            mapRef.current?.animateCamera({ center: response.coords });
        });

        return () => subscriptionRef.current && subscriptionRef.current.remove();
    }, []);

    useEffect(() => {
        if (sprintStatus != "Iniciar corrida" && sprintId && mqttConnected) {
            sendLocationData(location, sprintId);
        }
    }, [location, sprintId, mqttConnected]);

    return (    
        <View className="flex-1">
            {
                location && (
                    <MapView
                        className="flex-1"
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                        ref={mapRef}
                    >
                        <Marker
                            coordinate={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            }}
                        />
                    </MapView>
                )
            }
            <TouchableOpacity
                className="absolute top-16 right-4 p-2 bg-[#000] rounded-full items-center text-center"
                onPress={logout}
            >
                <MaterialCommunityIcons name="logout" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
                className="absolute bottom-8 self-center bg-black py-3 px-[60px] rounded-full"
                onPress={startRace}
            >
                <Text className="text-white text-lg">{sprintStatus}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Home;
