import React, { useEffect, useState, useRef } from "react";
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

type Props = RootStackScreenProps<"Home">;

const Home = ({ route }: Props) => {
    const navigation = useNavigation();
    const [location, setLocation] = useState(null);
    const mapRef = useRef(null);
    const subscriptionRef = useRef(null);
    const [sprintStatus, setSprintStatus] = useState("Iniciar corrida");

    function startRace() {
        if (sprintStatus == "Iniciar corrida") {
            setSprintStatus("Parar corrida");
        } else {
            setSprintStatus("Iniciar corrida");
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
            console.log(response);
            setLocation(response);
            mapRef.current?.animateCamera({ center: response.coords });
        });

        return () => subscriptionRef.current && subscriptionRef.current.remove();
    }, []);

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
