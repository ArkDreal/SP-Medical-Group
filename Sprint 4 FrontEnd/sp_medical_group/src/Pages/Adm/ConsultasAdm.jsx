import { useState, useEffect } from "react";
import axios from "axios";


import "../../assets/css/consultas.css"
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
        } else{
            btn.style.display = "none";
        }
        

    }

    function atualizarSituacao(idConsulta){

        axios.patch("http://localhost:5000/api/consultas/" + idConsulta,{
            idSituacao: idSituacao
        },{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then(resposta =>{
            if (resposta.status === 204) {
                console.log("consulta" + idConsulta + "atualizada");
                document.getElementById(idConsulta).setAttribute("disabled", "disabled");
                var btn = document.getElementById("btn" + idConsulta)
                
                btn.style.display = "none";
                buscarConsultas();
            }
        }).catch(erro => console.log(erro))
    }

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

    render(
        <div>
            <header>
        <div class="container container_header">
            <a href="#"><img  style="width: 227px; height: 90px; " src="../assets/img/horizontal_on_white_by_logaster 3.png" alt="Logo SP Medical Group"/></a>
     
            <nav class="nav_header">
                <a class="nav1" href="#">Cadastrar Consulta</a>
                <a class="sair" href="#">Sair</a>
            </nav>
        </div>
    </header>

    <main>
        <section class="container_consultas">
            <div class="div_consultas">
                <h1>Consultas Cadastradas</h1>
            </div>


            
            <div class="">
                <table>
                    <tr class="tr_th">
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr class="tr_td">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        </section>
    </main>

    <footer class="container_footer">
        <h2>©2021 | SP Medical Group | Todos os direitos reservados.</h2>
    </footer>

        </div>
    )
}