import React, { Component } from 'react';
import axios from 'axios';
import { parseJwt, usuarioAutenticado } from '../../services/auth';

import '../../assets/CSS/login.css';
import pastel_de_queijo from "../../assets/img/horizontal_on_white_by_logaster.png"
import pastel_de_flango from "../../assets/img/bannerlogin.png"

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            senha: '',
            erroMensagem: '',
            isLoading: false
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
                        this.props.history.push('/CadastroConsulta');
                        console.log('estou logado: ' + usuarioAutenticado());
                        // <Redirect to = 'CadastroConsulta' />
                    }

                    else {
                        this.props.history.push('/CadastroConsulta')
                    }
                }
            })

            .catch(() => {
                // define o state erroMensagem com uma mensagem personalizada e que a requisição terminou
                this.setState({ erroMensagem: 'E-mail ou senha inválidos! Tente novamente.', isLoading: false });
            })
    }

    atualizaStateCampo = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value });
    }

    render() {
        return (
            <div  >
                <main className="body_login">
                    <section className="conteudo1">

                        <div className="banner_login">
                            <img className="img_login" style={{ width: "697px" }} src={pastel_de_flango} alt="banner de login"></img>
                        </div>
                    </section>

                    <section className="conteudo2">

                        <button className="botao_voltar" >Voltar</button>

                        <div className="login_form">

                            <img style={{ width: "257px", marginBottom: "47px", height: "123px" }} src={pastel_de_queijo} alt="Logop do sp Medical Group"></img>

                            <form className="form_login" onSubmit={this.efetualogin}>

                                <input className="input_login"
                                    placeholder="E-Mail"
                                    type="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.atualizaStateCampo}
                                ></input>

                                <input className="input_login"
                                    placeholder="Senha"
                                    type="password"
                                    name="senha"
                                    value={this.state.senha}
                                    onChange={this.atualizaStateCampo}
                                ></input>

                                {this.state.isLoading === true &&
                                    <div className="item">
                                        <button className="botao_enviar" id="botao_enviar" type="submit" disabled>Loading...</button>
                                    </div>
                                }



                                {this.state.isLoading === false &&
                                    <div className="item">
                                        <button
                                            className="botao_enviar" id="botao_enviar"
                                            type="submit"
                                            disabled={this.state.email === '' || this.state.senha === '' ? 'none' : ''}>
                                            Login
                                        </button>
                                    </div>
                                }
                            </form>
                        </div>


                    </section>
                    </main>
            </div>
        );
    }
}
