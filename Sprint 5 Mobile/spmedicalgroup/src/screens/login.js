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
      email: 'ricardo.lemos@spmedicalgroup.com.br',
      senha: 'ricardo123',
    };
  }
  realizarLogin = async () => {


    console.warn(this.state.email + ' ' + this.state.senha);

    console.warn("aqui")

    const resposta = await api.post('/Login', {
      email: this.state.email, //ricardo.lemos@spmedicalgroup.com.br
      senha: this.state.senha, //ricardo123
    });

    console.warn("aqui")
    const token = resposta.data.token;
    await AsyncStorage.setItem('userToken', token);

    console.warn("aqui")
    let userRole = jwt_decode(token).role;

    if (resposta.status == 200 && userRole === '2') {

      console.warn("aa")
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
          placeholderTextColor="#fff"
          keyboardType='email-address'
          value={this.state.email}
          onChangeText={email => this.setState({email})}
        />
        <TextInput
          style={styles.inputLogin}
          placeholder='Senha'
          placeholderTextColor='#fff'
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
  mainImgLogin: {
    marginBottom: 57,
  },
  inputLogin: {
    width: 300,
    height: 50,
    marginBottom: 57,
    fontSize: 18,
    borderBottomColor: '#FFF',
    borderBottomWidth: 2,
    backgroundColor: '#CDF9CC',
    borderRadius: 10,
  },
  // inputLogin:placeholder{
  // },

  btnLoginText: {
    fontSize: 12, //aumentar um pouco
    fontFamily: 'Sarabun', //troca de fonte
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#fff', //mesma cor identidade
    letterSpacing: 1, //espacamento entre as letras
    textTransform: 'uppercase', //estilo maiusculo
  },
  btnLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 47,
    width: 127,
    backgroundColor: '#3CA834',
    borderRadius: 10,
    shadowOffset: { height: 1, width: 1 },
  },
})