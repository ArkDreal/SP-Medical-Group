import { useState, useEffect } from "react";
import axios from "axios";
import Cabecalho from "../../components/cabecalho/cabecalho"
import Rodape from "../../components/rodape/rodape"
import SituacaoConsulta from "../../components/situacaoConsulta/situacaoConsulta";
// import SetaCima from "../../components/icones/setaCima";
import SetaBaixo from "../../components/icones/setaBaixo";

import "../../assets/css/consultas.css"

export default function ConsultasPaciente() {
    const [listaConsultas, setListaConsultas] = useState([]);


    function buscarMinhasConsultas() {
        axios("https://62055999161670001741b984.mockapi.io/Consulta", {
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

    useEffect(buscarMinhasConsultas, []);

    function abrirDescricao(idConsulta){
        //mesma coisa pra desalterar select, porém com a descrição display none ou não
        var textoDescricao = document.getElementById("texto_desc"+ idConsulta);
        if (textoDescricao.value === null || textoDescricao.value === "" || textoDescricao.value === undefined) {
            textoDescricao.value = "Consulta sem descrição";
        }

        if (textoDescricao.style.display === "none") {
            textoDescricao.style.display = "";
        } else{
            textoDescricao.style.display = "none";
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
                        <Link to="Home">Home</Link>
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

                            <tr className="tr_td" key={Consultum.idConsulta}>
                                <td>{Consultum.idMedicoNavigation.NomeMedico}</td>
                                <td>{Consultum.idPacienteNavigation.NomePaciente}</td>
                                <td>{Intl.DateTimeFormat("pt-BR", {
                                    year: 'numeric', month: 'numeric', day: 'numeric',
                                    hour: 'numeric', minute: 'numeric', hour12: true
                                }).format(new Date(Consultum.DataConsulta))}</td>
                                <td>{Consultum.IdSituacaoNavigation.Situacao1}</td>
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