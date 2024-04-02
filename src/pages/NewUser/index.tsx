import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { MaterialCommunityIcons,AntDesign,MaterialIcons } from "@expo/vector-icons";
import { RootStackScreenProps } from "../../../navigation";
import * as Clipboard from 'expo-clipboard';

type Props = RootStackScreenProps<"NewUser">;

const NewUser = ({ navigation }: Props) => {
    const [name, setName] = useState("");
    const [errorRegister, setErrorRegister] = useState(false);
    const [sucessRegister, setSucessRegister] = useState(false);
    const [idDispositivo, setId] = useState("")

    const api = `http://192.168.0.13:3001`;

    const registerFirebase = async () => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/g;

        if (name === "" ) {
            setErrorRegister(true);
        } else {
            try {
                const createUser = await fetch(api + "/dispositivos", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        'nome': name,
                    })
                });

                const createUserConvertido = await createUser.json();

                if(createUserConvertido.id !== null ){
                    setSucessRegister(true)
                    setId(createUserConvertido.id)
                }

            }catch(error){
                console.log(error);
            }
        }
        
    };
    
    async function handleCopyToClipBoard(){
        await Clipboard.setStringAsync(idDispositivo)
    }
    async function handleGetToClipBoard(){
        const res = await Clipboard.getStringAsync
        return res
    }
    
    useEffect(() => {
        const sucessCopy = Clipboard.addClipboardListener(() => {
            // mensagem de copiado
        })
        return () => Clipboard.removeClipboardListener(sucessCopy)
    }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex flex-col items-center justify-center h-screen bg-white"
        >
            <Text className="text-2xl text-black font-bold mb-4">Criar Conta</Text>
            <TextInput
                className="w-64 mt-4 px-4 py-2 border-b-2 border-black"
                placeholder="Coloque seu nome"
                onChangeText={(text) => setName(text)}
                value={name}
            />
           
            {errorRegister ? (
                <View className="flex flex-row items-center mt-4">
                    <MaterialCommunityIcons
                        name="alert-circle"
                        size={24}
                        color="#bdbdbd"
                    />
                    <Text className="text-gray-400 ml-2">Preencha o campo</Text>
                </View>
            ) : null}

            {sucessRegister ? (
                <View className="flex-col items-center pt-10 gap-4">
                    <Text className="pl-2 text-gray-400 text-lg"><AntDesign name="checkcircleo" size={24} color="green" /> Código Criado com Sucesso !</Text>
                    <View className="flex items-center flex-row">
                        <MaterialIcons name="content-copy" size={24} color="black" />
                        <TouchableOpacity className="flex" onPress={handleCopyToClipBoard}><Text className="pl-2 text-gray-400 text-lg">Copiar Código</Text></TouchableOpacity>
                    </View>
                </View>
            ) : null}

            <TouchableOpacity
                className="w-48 h-12 flex items-center justify-center bg-black rounded-full mt-8"
                onPress={registerFirebase}
            >
                <Text className="text-white">Registrar</Text>
            </TouchableOpacity>
            <Text className="mt-8 text-gray-600">Já tem uma conta?{' '}
                <Text
                    className="text-blue-500"
                    onPress={() => navigation.navigate("Login")}
                >
                   Entrar
                </Text>
            </Text>
            <View className="h-100" />
        </KeyboardAvoidingView>
    );
};

export default NewUser;
