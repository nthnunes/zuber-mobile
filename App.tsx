import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from "./src/pages/Home"
import Login from "./src/pages/Login"
import NewUser from "./src/pages/NewUser"

import { NativeWindStyleSheet } from "nativewind";
import { RootStackParamList } from 'navigation';


NativeWindStyleSheet.setOutput({
  default: "native",
});


const Stack = createStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />  
        <Stack.Screen
          name="NewUser"
          component={NewUser}
          options={{
            headerShown: false
          }}
        />
        {/* <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}