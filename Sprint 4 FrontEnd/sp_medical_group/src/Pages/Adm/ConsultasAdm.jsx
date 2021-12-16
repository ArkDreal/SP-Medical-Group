import { useState, useEffect } from "react";
import axios from "axios";


import "../../assets/CSS/ConsultasAdm.css"
import { render } from "@testing-library/react";

export default function ConsultasAdm() {
    const [listaConsultas, setListaConsultas] = useState([]);

    const [listaPacientes, setListaPacientes] = useState([]);
    const [listaMedicos, setListaMedicos] = useState([]);

    const [idPaciente, setIdPaciente] = useState(0);
    const [idMedico, setIdMedico] = useState(0);
    const [idSituacao, setIdSituacao] = useState(0);
    const [dataConsulta, setDataConsulta] = useState(new Date());
    const [descricao, setDescricaoConsulta] = useState("");


    function buscarMedicos() {
        axios("http://localhost:5000/api/Medicos", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaMedicos(resposta.data);
                }
            }).catch(erro => console.log(erro));
    }

    useEffect(buscarMedicos, [])

    function buscarPacientes() {
        axios("http://localhost:5000/api/Pacientes", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaPacientes(resposta.data);
                }
            }).catch(erro => console.log(erro));
    }

    useEffect(buscarPacientes, []);

    function buscarConsultas() {
        axios("http://localhost:5000/api/Consultas", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaConsultas(resposta.data);
                    // console.log(resposta.data)
                    // console.log(listaConsultas)
                }
            }).catch(erro => console.log(erro));
    }

    useEffect(buscarConsultas, []);

    function Cadastrar(evento) {
        evento.preventDefault();
        axios.post("http://localhost:5000/api/Consultas", {
            idPaciente: idPaciente,
            idMedico: idMedico,
            idSituacao: idSituacao,
            dataConsulta: dataConsulta,
            descricao: descricao
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 201) {
                    console.log("consulta cadastrada");
                    buscarConsultas();
                    setIdPaciente(0);
                    setIdMedico(0);
                    setIdSituacao(0);
                    setDataConsulta("");
                    setDescricaoConsulta("");
                }
            }).catch(erro => console.log(erro))
    }

    function permitirSelect(idConsulta) {
        // console.log("Você está editando a situação da consulta " + idConsulta + "e a situação é " + idSituacao)        
        document.getElementById(idConsulta).removeAttribute("disabled");
        var btn = document.getElementById("btn" + idConsulta);

        if (btn.style.display === "none") {
            btn.style.display = "";
        } else {
            btn.style.display = "none";
        }


    }

    function atualizarSituacao(idConsulta) {

        axios.patch("http://localhost:5000/api/consultas/" + idConsulta, {
            idSituacao: idSituacao
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 204) {
                    console.log("consulta" + idConsulta + "atualizada");
                    document.getElementById(idConsulta).setAttribute("disabled", "disabled");
                    var btn = document.getElementById("btn" + idConsulta)

                    btn.style.display = "none";
                    buscarConsultas();
                }
            }).catch(erro => console.log(erro))
    }

    function abrirDescricao(idConsulta) {
        //mesma coisa pra desalterar select, porém com a descrição display none ou não
        var Descricao = document.getElementById("texto_desc" + idConsulta);
        if (Descricao.value === null || Descricao.value === "" || Descricao.value === undefined) {
            Descricao.value = "Consulta sem descrição";

        }

        if (Descricao.style.display === "none") {
            Descricao.style.display = "";
        } else {
            Descricao.style.display = "none";
        }
    }
    logout = () => {
        localStorage.removeItem('usuario-login');
        console.log('Feito o logout');
    }

    render(
        <div>
            <header>
                <div className="container container_header">
                    <a href="#"><img style="width: 227px; height: 90px; " src="../assets/img/horizontal_on_white_by_logaster 3.png" alt="Logo SP Medical Group" /></a>

                    <nav className="nav_header">
                        <Link to="ConsultasAdm">Cadastrar Consultas</Link>
                        <Link to="/Login"><a href="" onClick={this.logout}>Sair</a></Link>
                    </nav>
                </div>
            </header>

            <main>
                <section className="container_consultas">
                    <div className="div_consultas">
                        <h1>Consultas Cadastradas</h1>
                    </div>



                    <div className="">
                        <table>
                            <tr class="tr_th">
                                <th>#</th>
                                <th>Médico</th>
                                <th>Paciente</th>
                                <th>Data</th>
                                <th>Status</th>
                            </tr>

                            <tr className="tr_td" key={Consulta.idConsulta}>
                                <td>{Consultum.idconsulta}</td>
                                <td>{Consultum.idPacienteNavigation.NomePaciente}</td>
                                <td>{Consultum.idMedicoNavigation.NomeMedico}</td>
                                <td>{Intl.DateTimeFormat("pt-BR", {
                                    year: 'numeric', month: 'numeric', day: 'numeric',
                                    hour: 'numeric', minute: 'numeric', hour12: true
                                }).format(new Date(Consultum.DataConsulta))}</td>
                                <td>{Consultum.idSituacaoNavigation.Situacao1}</td>
                            </tr>
                        </table>
                    </div>
                </section>
            </main>

            <footer className="container_footer">
                <h2>©2021 | SP Medical Group | Todos os direitos reservados.</h2>
            </footer>

        </div>
    )
}