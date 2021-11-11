import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { parseJwt, usuarioAutenticado } from '../../services/auth';

import '../../assets/css/login.css';

class Login extends Componenet {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            senha: '',
            erroMensagem: '',
            isLoading: false
        }
    }
}

efetualogin = (event) => {

    event.preventDefault();

    this.setState({ errroMensagem: '', isLoading: true });

    axios.post('http://localhost:5000/api/login', {
        email: this.state.email,
        senha: this.state.senha
    })

        .then(resposta => {

            if (resposta.status === 200) {
                localStorage.setItem('usuario-login', resposta.data.token);

                console.log('Meu token é: ' + resposta.data.token);

                this.setState({ isLoading: false })

                let base64 = localStorage.getItem('usuario-login').split('.')[1];

                console.log(base64);

                console.log(window.atob(base64));

                console.log(JSON.parse(window.atob(base64)));


                console.log(parseJwt().role);

                if (parseJwt().role === '1') {
                    this.props.history.push('/tiposeventos');
                    console.log('estou logado: ' + usuarioAutenticado());
                }

                else {
                    this.props.history.push('/')
                }
            }
        })

        .catch(() => {
            // define o state erroMensagem com uma mensagem personalizada e que a requisição terminou
            this.setState({ erroMensagem: 'E-mail ou senha inválidos! Tente novamente.', isLoading: false });
        })
}

atualizaStateCampo = (campo) => {
    this.setState({ [campo.target.name]: campo.target.value })
};

render(
    <div>
        <section class="conteudo1">

            <div class="banner_login">
                <img style="width: 697px;" src="../assets/img/bannerlogin.png" alt="banner de login"></img>
            </div>
        </section>

        <section class="conteudo2">

            <button class="botao_voltar" >Voltar</button>

            <div class="login_form">

                <img style="width: 257px; margin-bottom: 47px; height: 123px;" src="../assets/img/horizontal_on_white_by_logaster 3.png" alt="Logop do sp Medical Group"></img>

                <form>

                    <input class="input"
                        placeholder="E-Mail"
                        type="email"
                        name="E-Mail"></input>

                        <input class="input"
                            placeholder="Senha"
                            type="password"
                            name="Senha"></input>



                            <button class="botao_enviar">Enviar</button>
                        </form>
                    </div>


                </section>
            </div>
            )

