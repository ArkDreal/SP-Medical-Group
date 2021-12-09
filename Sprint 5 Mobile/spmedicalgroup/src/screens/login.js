import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  Button
} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api'
import jwt_decode from "jwt-decode";
import { back } from 'react-native/Libraries/Animated/Easing';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
    };
  }
  realizarLogin = async () => {


    console.warn(this.state.email + ' ' + this.state.senha);

    const resposta = await api.post('/login', {
      email: this.state.email, //ADM@ADM.COM
      senha: this.state.senha, //senha123
    });

    const token = resposta.data.token;
    await AsyncStorage.setItem('userToken', token);


    let userRole = jwt_decode(token).role;

    if (resposta.status == 200 && userRole === '2') {
      this.props.navigation.navigate('Medico');
    }
    else if (resposta.status == 200 && userRole === '3') {
      this.props.navigation.navigate('Paciente');
    }

    console.warn(token);

    //
  };


  render() {
    return (
      
      
      <View
        style={styles.main}
      >
        <Image
          source={require('../../assets/img/Logo_Moba7.png')}
          style={styles.mainImgLogin}
        />

        <TextInput
          style={styles.inputLogin}
          placeholder='Email'
          placeholderTextColor="#472A82"
          keyboardType='email-address'
          value={this.state.email}
          onChangeText={email => this.setState({email})}
        />
        <TextInput
          style={styles.inputLogin}
          placeholder='Senha'
          placeholderTextColor='#472A82'
          keyboardType='default'
          value={this.state.senha}
          onChangeText={senha => this.setState({senha})}
        />
        <TouchableOpacity
          style={styles.btnLogin}
          onPress={this.realizarLogin}
        >
          <Text style={styles.btnLoginText}>Entrar</Text>
        </TouchableOpacity>
      </View>

    );

  }
}
const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  },
})