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
import { useNavigation } from "@react-navigation/native";

import api from '../services/api'

import jwt_decode from "jwt-decode";


export default class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        senha: '',
      };
    }
    // realizarLogin = async () => {

  

    //   console.warn(this.state.email + ' ' + this.state.senha);
  
    //   const resposta = await api.post('/login', {
    //     email: this.state.email, //ADM@ADM.COM
    //     senha: this.state.senha, //senha123
    //   });
  

    //   const token = resposta.data.token;
    //   await AsyncStorage.setItem('userToken', token);
  

    //   let userRole = jwt_decode(token).role;

    //   if (resposta.status == 200 && userRole === '2') {
    //     this.props.navigation.navigate('Medico');
    //   }
    //   else if (resposta.status == 200 && userRole === '3') {
    //     this.props.navigation.navigate('Paciente');
    //   }
  
    //   console.warn(token);
  
    //   //
    // };


    render() {
        return (
          <Text>wer</Text>
        //     <View
        //     style={styles.main}
        // >
        //     <Image
        //         source={require('../../assets/img/banner_login.png')}
        //         style={styles.mainImgLogin}
        //     />
        //     <TextInput
        //         style={styles.inputLogin}
        //         placeholder='Email'
        //         placeholderTextColor="#472A82"
        //         keyboardType='email-address'
        //         value={email}
        //         onChangeText={(campo) => setEmail(campo)}
        //     />
        //     <TextInput
        //         style={styles.inputLogin}
        //         placeholder='Senha'
        //         placeholderTextColor='#472A82'
        //         keyboardType='default'
        //         value={senha}
        //         onChangeText={(campo) => setSenha(campo)}
        //     />
        //     <TouchableOpacity
        //         style={styles.btnLogin}
        //         onPress={realizarLogin}
        //     >
        //         <Text style={styles.btnLoginText}>Entrar</Text>
        //     </TouchableOpacity>
        // </View>

   // );

        )}
}
  // const styles = StyleSheet.create({
  //   main: {
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       width: '100%',
  //       height: '100%',
  //       backgroundColor: '#3CA834'
  //   },
  // })


// export default Login;