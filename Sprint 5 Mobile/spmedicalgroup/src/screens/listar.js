import React, {Component} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';

import api from '../services/api';

import {TouchableOpacity} from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Medico extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaConsultasM: [],
    };
  }

  buscarConsultasM = async () => {
    const resposta = await api.get('/medico');
    // console.warn(resposta);
    const dadosDaApi = resposta.data;
    this.setState({listaEventos: dadosDaApi});
  };

  componentDidMount() {
    this.buscarEventos();
  }

  

  render() {
    return ();
  }
}