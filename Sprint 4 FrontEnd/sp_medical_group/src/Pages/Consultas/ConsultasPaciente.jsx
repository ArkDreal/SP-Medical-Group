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
}