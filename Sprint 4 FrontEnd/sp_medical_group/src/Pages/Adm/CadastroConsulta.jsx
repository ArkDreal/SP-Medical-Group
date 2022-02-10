import axios from "axios";
import { Component } from "react";
import pastel_de_queijo from "../../assets/img/horizontal_on_white_by_logaster.png"

import '../../assets/CSS/cadastro.css';

export default class CadastroConsulta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idMedico: '',
            idPaciente: '',
            idSituacao: 0,
            dataConsulta: new Date(),
            descricao: '',
            errorMessage: '',
            loading: false
        }
    }

    cadastrarConsulta = (event) => {
        event.preventDefault();
        this.setState({ loading: true })

        let consulta = {
            idMedico: this.state.idMedico,
            idPaciente: this.state.idPaciente,
            idSituacao: 3,
            dataConsulta: this.state.dataConsulta,
            descricao: this.state.descricao
        }

        this.setState({ loading: true });

        axios
            .post('https://62055999161670001741b984.mockapi.io/Consulta', consulta, {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('usuario-login') }
            })
            .then((resposta) => {
                if (resposta.status === 201) {
                    console.log('Consulta cadastrada!');
                    this.setState({
                        idMedico: '',
                        idPaciente: '',
                        idSituacao: 0,
                        dataConsulta: new Date(),
                        descricao: '',
                        errorMessage: '',
                        loading: false
                    });
                }
            })
            .catch((erro) => {
                console.log(erro);
                this.setState({
                    errorMessage: 'Dados inválidos',
                    loading: false
                });
            })
    };

    atualizaStateCampo = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value });
    }

    render() {
        return (
            <div>
                <header classNameName="header_cc">
                    <div className="container container_header">
                        <a href="#"><img style={{ width: "227px", height: "90px" }} src={pastel_de_queijo} alt="Logo SP Medical Group"></img></a>

                        <nav className="nav_header">
                            <a className="nav1" href="#">Ver Consultas</a>
                            <a className="sair" href="#">Sair</a>
                        </nav>
                    </div>
                </header>

                <main>
                    <section className="container_cadastro">
                        <div className="span_cadastrar">
                            <h1>Cadastrar Consultas</h1>
                        </div>
                        <div className="div_form">
                            <form classNameName="form_cc">

                                <input className="input"
                                    placeholder="CRM do Médico"
                                    type="text"
                                    name=""
                                ></input>

                                <input className="input"
                                    placeholder="CPF do Paciente"
                                    type="text"
                                    name=""
                                ></input>

                                <input className="input"
                                    type="datetime-local"
                                    name=""
                                ></input>

                                <textarea className="textarea" id="id_ta" placeholder="Descrição" ></textarea>

                                <button className="btn_cadastrar">Cadastrar</button>


                            </form>
                        </div>
                    </section>
                </main>

                <footer className="container_footer">
                    <h2>©2021 | SP Medical Group | Todos os direitos reservados.</h2>
                </footer>
            </div>
        )
    }
}