import React, { useEffect, useState,useRef } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { RootStackScreenProps } from "../../../navigation";
import MapView,{ Marker } from "react-native-maps";
import {
    requestForegroundPermissionsAsync, 
    getCurrentPositionAsync,LocationObject,
    watchPositionAsync,LocationAccuracy
  } from "expo-location"

type Props = RootStackScreenProps<"Home">;

const Home = ({ route }: Props) => {

    const navigation = useNavigation();

    const [location,setLocation] = useState<LocationObject | null>(null);

    const mapRef = useRef<MapView>(null)

    function logout() {
        /* firebase.auth().signOut().then(() => {
            navigation.navigate("Login");
        }); */
    }

    // Permissao para rastrear localizacao
    async function requestLocationPermissions() {

        const {granted} = await requestForegroundPermissionsAsync()

        if(granted){
            const currentPosition = await getCurrentPositionAsync();
            setLocation(currentPosition);
        }
    }

    useEffect(()=>{
        requestLocationPermissions()
    },[])
    
    useEffect(()=>{
        // observa quando altera a localizacao do usuario
        watchPositionAsync({
            accuracy : LocationAccuracy.Highest,
            timeInterval : 1000,
            distanceInterval : 1,
        },(response)=>{
            // detalhes da nova localizacao
            console.log(response);
            setLocation(response);
            mapRef.current?.animateCamera({
                // pitch : 70,
                center : response.coords
            })
        }
        )
    },[])
    return (    
        <View className="flex flex-col h-20 flex-1">
            <View className="flex-row justify-between items-center px-4 mt-8 mb-4">
                <Text className="text-2xl font-bold text-black">Zuber</Text>
                <TouchableOpacity
                    className="w-14 h-14 justify-center items-center mr-[-5px]"
                    onPress={logout}
                >
                    <MaterialCommunityIcons
                        name="location-exit"
                        size={23}
                        color="#06C167"
                    />
                </TouchableOpacity>
            </View>
            
            <TouchableOpacity
                className="w-14 h-14 absolute bottom-14 left-9 bg-black rounded-full flex justify-center items-center"
                //onPress={() => navigation.navigate("Call Car", { idUser: route.params.idUser })}
            >
                <MaterialCommunityIcons
                    name="car"
                    size={26}
                    color="#fff"
                />
            </TouchableOpacity>
            {
                location && 
                    
                    <View className="items-center justify-center w-full h-1/3 rounded-sm gap-4 bg-black">
                        <MapView
                            className="w-full h-full"
                            initialRegion={{
                                latitude : location.coords.latitude,
                                longitude : location.coords.longitude,
                                latitudeDelta : 0.005,
                                longitudeDelta : 0.005,
                            }}
                            ref={mapRef}
                        >
                            <Marker
                                coordinate={{
                                    latitude : location.coords.latitude,
                                    longitude : location.coords.longitude,
                                }}
                            />
                        </MapView>
                    </View>

            }
        </View>
    );
}

export default Home;
