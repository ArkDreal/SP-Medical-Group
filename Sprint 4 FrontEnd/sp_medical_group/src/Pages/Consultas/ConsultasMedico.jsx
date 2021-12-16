import { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/consultas.css"

export default function ConsultasMedico() {
    const [listaConsultas, setListaConsultas] = useState([]);
    const [descricao, setDescricao] = useState("");


    function buscarMinhasConsultas() {
        axios("http://localhost:5000/api/Consultas/Minhas", {
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

    function permitirTextArea(idConsulta, descricaoConsulta) {
        // console.log("Você está editando a situação da consulta " + idConsulta + "e a situação é " + idSituacao)
        setDescricao(descricaoConsulta);
        var textoDescricao = document.getElementById("texto_desc" + idConsulta)
        textoDescricao.removeAttribute("readOnly");

        if (textoDescricao.value === null || textoDescricao.value === "") {
            textoDescricao.value = "Consulta sem descrição";

        }

        if (textoDescricao.style.display === "none") {
            textoDescricao.style.display = "";
        } else {
            textoDescricao.style.display = "none";
        }

        var btn = document.getElementById("btn" + idConsulta);

        if (btn.style.display === "none") {
            btn.style.display = "";
        } else {
            setDescricao("")
            btn.style.display = "none";
        }

    }

    function atualizarDescricao(idConsulta) {
        console.log(descricao + idConsulta)
        axios.patch("http://localhost:5000/api/Consultas/descricao/" + idConsulta, {
            Descricao: descricao
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 204) {
                    console.log("descricao da consulta" + idConsulta + "atualizada");
                    // document.getElementById(idConsulta).setAttribute("readOnly");
                    var btn = document.getElementById("btn" + idConsulta)
                    btn.style.display = "none";
                    buscarMinhasConsultas();
                    setDescricao("")
                }
            }).catch(erro => console.log(erro))
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
                                <th>Descricao</th>
                            </tr>

                            <tr className="tr_td" key={Consultum.idConsulta}>
                                <td>{Consultum.idMedicoNavigation.NomeMedico}</td>
                                <td>{Consultum.idPacienteNavigation.NomePaciente}</td>
                                <td>{Intl.DateTimeFormat("pt-BR", {
                                    year: 'numeric', month: 'numeric', day: 'numeric',
                                    hour: 'numeric', minute: 'numeric', hour12: true
                                }).format(new Date(Consultum.DataConsulta))}</td>
                                <td>{Consultum.Descricao}</td>
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
