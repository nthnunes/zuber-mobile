import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import firebase from "../../config/firebaseconfig";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RootStackScreenProps } from "../../../navigation";

type Props = RootStackScreenProps<"Login">;

const Login = ({ navigation }: Props) => {
    const [device_id, setDeviceId] = useState("");
    const [errorLogin, setErrorLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const api = `http://`+ `192.168.0.138` + `:3001`;

    const handleLogin = () => {
        setIsLoading(true)
        if (device_id === "") {
            setErrorLogin(true);
            setIsLoading(false)
        } else {
          try{
                fetch(`${api}/dispositivos/${device_id}`)
                .then(response => response.json())
                .then(data => {

                    if(data.statusCode == 404){
                         setErrorLogin(true)
                    }
                    if(data.id !== null){
                        navigation.navigate("Home", { idUser: data.id });
                        setDeviceId("");
                    }
                })
                .finally(function () {
                    setIsLoading(false)
                });
          }catch(error){
            setErrorLogin(true)
          }
        
        }
    };

    useEffect(() => {
        setIsLoading(false);
    }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 bg-white items-center justify-center pt-[${Platform.OS === 'ios' ? '0' : '50'}px]"
        >
            {isLoading ? (
                <View className="items-center">
                    <ActivityIndicator size="large" color="#000" />
                </View>
            ) : (
                <>
                    <Text className="text-6xl text-black mb-10 font-bold">Zuber</Text>
                    
                    <TouchableOpacity className="flex">
                        <TextInput
                            className="w-full px-4 py-4 border-b-2 border-black"
                            placeholder="Entre com seu código"
                            onChangeText={(text) => setDeviceId(text)}
                            value={device_id}
                        />
                    </TouchableOpacity>
                    
                    {errorLogin ? (
                        <View className="flex-row items-center mt-5">
                            <MaterialCommunityIcons
                                name="alert-circle"
                                size={24}
                                color="#bdbdbd"
                            />
                            <Text className="pl-2 text-gray-400 text-lg">Código não encontrado</Text>
                        </View>
                    ) : null}
                    <TouchableOpacity
                        className="w-3/4 mt-10 bg-black rounded-full py-3 items-center justify-center"
                        onPress={handleLogin}
                    >
                        <Text className="text-white text-bold">Login</Text>
                    </TouchableOpacity>
                    <Text className="mt-5 text-gray-600">
                        Você já tem uma conta?{' '}
                        <Text
                            className="text-blue-500"
                            onPress={() => navigation.navigate("NewUser")}
                        >
                           Cadastre-se
                        </Text>
                    </Text>
                    <View className="h-24"></View>
                </>
            )}
        </KeyboardAvoidingView>
    );
};

export default Login;
