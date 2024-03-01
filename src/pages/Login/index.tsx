import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import firebase from "../../config/firebaseconfig";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RootStackScreenProps } from "../../../navigation";
type Props = RootStackScreenProps<"Login">;

const Login = ({ navigation }: Props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const loginFirebase = () => {
        if (email === "" || password === "") {
            setErrorLogin(true);
        } else {
            /* firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    let user = userCredential.user;
                    navigation.navigate("Home", { idUser: user.uid });
                    setEmail("");
                    setPassword("");
                    setErrorLogin(false);
                })
                .catch(() => {
                    setErrorLogin(true);
                }); */
        }
    };

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                navigation.navigate("Home", { idUser: user.uid });
            }
            setIsLoading(false);
        });
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
                    <TextInput
                        className="w-3/4 px-4 py-4 border-b-2 border-black"
                        placeholder="Enter your email"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                    <TextInput
                        className="w-3/4 mt-5 px-4 py-4 border-b-2 border-black"
                        secureTextEntry={true}
                        placeholder="Enter your password"
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />
                    {errorLogin ? (
                        <View className="flex-row items-center mt-5">
                            <MaterialCommunityIcons
                                name="alert-circle"
                                size={24}
                                color="#bdbdbd"
                            />
                            <Text className="pl-2 text-gray-400 text-lg">Invalid email or password</Text>
                        </View>
                    ) : null}
                    <TouchableOpacity
                        className="w-3/4 mt-10 bg-black rounded-full py-3 items-center justify-center"
                        onPress={loginFirebase}
                    >
                        <Text className="text-white text-bold">Login</Text>
                    </TouchableOpacity>
                    <Text className="mt-5 text-gray-600">
                        Don't have an account?{' '}
                        <Text
                            className="text-blue-500"
                            onPress={() => navigation.navigate("NewUser")}
                        >
                            Sign Up!
                        </Text>
                    </Text>
                    <View className="h-24"></View>
                </>
            )}
        </KeyboardAvoidingView>
    );
};

export default Login;
