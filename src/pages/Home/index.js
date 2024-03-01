import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import firebase from "../../config/firebaseconfig";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./style";

export default function Home({ navigation, route }){
    const [location, setLocation] = useState(null);

    async function requestLocationPermission() {
        getLocation();
    }

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation(position.coords);
                },
                (error) => {
                    Alert.alert("Error", "Could not fetch location. Please ensure location services are enabled.");
                    console.log(error);
                }
            );
        } else {
            Alert.alert("Geolocation not supported", "Geolocation is not supported by this browser.");
        }
    }

    useEffect(() => {
        requestLocationPermission();

        // Define o intervalo para atualizar a localização a cada 30 segundos
        const intervalId = setInterval(getLocation, 30000);

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(intervalId);
    }, []);

    function logout(){
        firebase.auth().signOut().then(() => {
            navigation.navigate("Login");
        });
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Zuber</Text>
                <TouchableOpacity
                    style={styles.buttonLogout}
                    onPress={logout}
                >
                    <MaterialCommunityIcons
                    name="location-exit"
                    size={23}
                    color="#06C167"
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.locationText}>
                {location ? `Your location: \nLat: ${location.latitude} \nLon: ${location.longitude}` : 'Fetching location...'}
            </Text>
            <TouchableOpacity
                style={styles.buttonNewTask}
                onPress={() => navigation.navigate("Call Car", { idUser: route.params.idUser })}
            >
                <MaterialCommunityIcons
                    name="car"
                    size={26}
                    color="#fff"
                />
            </TouchableOpacity>
        </View>
    );
}
