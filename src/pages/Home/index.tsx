import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { RootStackScreenProps } from "../../../navigation";
type Props = RootStackScreenProps<"Home">;

const Home = ({ route }: Props) => {
    const navigation = useNavigation();

    function logout() {
        /* firebase.auth().signOut().then(() => {
            navigation.navigate("Login");
        }); */
    }

    return (
        <View className="flex-1 bg-white">
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
        </View>
    );
}

export default Home;
