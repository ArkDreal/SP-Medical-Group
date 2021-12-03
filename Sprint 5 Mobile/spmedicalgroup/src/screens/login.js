import React, { useState, useEffect } from "react";

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
import { useNavigation } from "@react-navigation/native";

import api from '../services/api'

export default class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        senha: '',
      };
    }
    //como vamos trabalhar com assync historage,
    //nossa funcao tem que ser async.
    realizarLogin = async () => {
      //nao temos mais  console log.
      //vamos utilizar console.warn.
  
      //apenas para teste.
      console.warn(this.state.email + ' ' + this.state.senha);
  
      const resposta = await api.post('/login', {
        email: this.state.email, //ADM@ADM.COM
        senha: this.state.senha, //senha123
      });
  
      //mostrar no swagger para montar.
      const token = resposta.data.token;
      await AsyncStorage.setItem('userToken', token);
  
      //agora sim podemos descomentar.
      if (resposta.status == 200) {
        this.props.navigation.navigate('Main');
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
                source={require('../../assets/img/banner_login.png')}
                style={styles.mainImgLogin}
            />
            <TextInput
                style={styles.inputLogin}
                placeholder='Email'
                placeholderTextColor="#472A82"
                keyboardType='email-address'
                value={email}
                onChangeText={(campo) => setEmail(campo)}
            />
            <TextInput
                style={styles.inputLogin}
                placeholder='Senha'
                placeholderTextColor='#472A82'
                keyboardType='default'
                value={senha}
                onChangeText={(campo) => setSenha(campo)}
            />
            <TouchableOpacity
                style={styles.btnLogin}
                onPress={realizarLogin}
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
        backgroundColor: '#3CA834'
    },
  })


// export default Login;