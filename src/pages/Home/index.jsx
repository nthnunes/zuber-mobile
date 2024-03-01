import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
//import { SignOut, Car } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

const Home = ({ route }) => {
    const navigation = useNavigation();
    const [location, setLocation] = useState(null);

    useEffect(() => {
        getLocation();
    }, []);

    async function getLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Permissão de localização negada", "Por favor, conceda permissão de localização para acessar esta funcionalidade.");
            return;
        }

        let userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation.coords);
    }

    function logout() {
        firebase.auth().signOut().then(() => {
            navigation.navigate("Login");
        });
    }

    return (
        <View className="flex-1 bg-white">
            <View className="flex-row justify-between items-center px-4 mt-8 mb-4">
                <Text className="text-2xl font-bold text-black">Zuber</Text>
                <TouchableOpacity
                    className="w-14 h-14 justify-center items-center mr-[-5px]"
                    onPress={logout}
                >
                    {/* <SignOut className="text-lg text-black" /> */}
                </TouchableOpacity>
            </View>
            <Text className="text-center">
                {location ? `Sua localização: \nLat: ${location.latitude} \nLon: ${location.longitude}` : 'Obtendo localização...'}
            </Text>
            <TouchableOpacity
                className="w-14 h-14 absolute bottom-14 left-9 bg-black rounded-full flex justify-center items-center"
                onPress={() => navigation.navigate("Call Car", { idUser: route.params.idUser })}
            >
                {/* <Car className="text-lg text-white" /> */}
            </TouchableOpacity>
        </View>
    );
}

export default Home;
