import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import firebase from "../../config/firebaseconfig";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const NewUser = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorRegister, setErrorRegister] = useState(false);

    const registerFirebase = () => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/g;

        if (email === "" || password === "" || password.match(regex) === null) {
            setErrorRegister(true);
        } else {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    let user = userCredential.user;
                    navigation.navigate("Login", { idUser: user.uid });
                    setEmail("");
                    setPassword("");
                    setErrorRegister(false);
                })
                .catch(() => {
                    setErrorRegister(true);
                });
        }
    };

    useEffect(() => {}, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex flex-col items-center justify-center h-screen bg-white"
        >
            <Text className="text-2xl text-black font-bold mb-4">Create Account</Text>
            <TextInput
                className="w-64 mt-4 px-4 py-2 border-b-2 border-black"
                placeholder="Enter your email"
                type="text"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                className="w-64 mt-4 px-4 py-2 border-b-2 border-black"
                secureTextEntry={true}
                placeholder="Enter your password"
                type="text"
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            {errorRegister ? (
                <View className="flex flex-row items-center mt-4">
                    <MaterialCommunityIcons
                        name="alert-circle"
                        size={24}
                        color="#bdbdbd"
                    />
                    <Text className="text-gray-400 ml-2">Invalid email or password</Text>
                </View>
            ) : null}
            <TouchableOpacity
                className="w-48 h-12 flex items-center justify-center bg-black rounded-full mt-8"
                onPress={registerFirebase}
            >
                <Text className="text-white">Register</Text>
            </TouchableOpacity>
            <Text className="mt-8 text-gray-600">Already have an account?{' '}
                <Text
                    className="text-blue-500"
                    onPress={() => navigation.navigate("Login")}
                >
                    Sign In
                </Text>
            </Text>
            <View className="h-100" />
        </KeyboardAvoidingView>
    );
};

export default NewUser;
