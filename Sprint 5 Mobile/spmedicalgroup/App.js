import 'react-native-gesture-handler';
import { Component } from 'react';
import React, {Component} from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/screens/login';

const AuthStack = createStackNavigator();


export default function Stack() {
    return(
        <NavigationContainer>
            <StatusBar
                hidden = {true}
            />

            <AuthStack.Navigator
                initialRouteName = "Login"
                screenOptions = {{
                    headerShown: false,
                }}
>
                <AuthStack.Screen name= "Login" Component= {Login}/>
            </AuthStack.Navigator>
        </NavigationContainer>
    )
}