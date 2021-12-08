import React, { Component, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    FlatList,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';




export default class Paciente extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listaConsultas: [],
        };
    }

    Logout = async () => {
        await AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('pgLogin');
    }


    buscarConsultas = async () => {

        const token = await AsyncStorage.getItem('userToken')

        const resposta = await api.get('/Usuarios/ListarMinhasConsultas', {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        });

        //console.warn(resposta);

        const dadosDaApi = resposta.data;
        this.setState({ listaConsultas: dadosDaApi });
    };

    componentDidMount() {
        this.buscarConsultas();
        //console.warn(listaConsultas);
    }
}