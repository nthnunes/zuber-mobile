import React, { useState, useEffect } from "react"
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native"

import firebase from "../../config/firebaseconfig"
import styles from "./style"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default function NewUser({ navigation }){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorRegister, setErrorRegister] = useState("")

    const registerFirebase = () => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/g;

        if(email == "" || password == ""){
            setErrorRegister(true)
        }
        else if(password.match(regex) == null) {
            setErrorRegister(true)
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                let user = userCredential.user
                navigation.navigate("Login", { idUser: user.uid })
                setEmail("")
                setPassword("")
                setErrorRegister(false)
            })
            .catch(() => {
                setErrorRegister(true)
            })
        }
    }

    useEffect(() => {

    }, [])

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Text style={styles.title}>Create Account</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                type="text"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Enter your password"
                type="text"
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            {errorRegister === true
            ?
                <View style={styles.contentAlert}>
                    <MaterialCommunityIcons
                        name="alert-circle"
                        size={24}
                        color="#bdbdbd"
                    />
                    <Text style={styles.warningAlert}>Invalid email or password</Text>
                </View>
            :
                <View/>
            }
                <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={registerFirebase}
                >
                    <Text style={styles.textButtonLogin}>Register</Text>
                </TouchableOpacity>
                <Text style={styles.registration}>
                    Already have an account?{' '}
                    <Text
                        style={styles.linkSubscribe}
                        onPress={() => navigation.navigate("Login")}
                    >
                        Sign In
                    </Text>
                </Text>
                <View style={{height:100}}/>
        </KeyboardAvoidingView>
    )
}