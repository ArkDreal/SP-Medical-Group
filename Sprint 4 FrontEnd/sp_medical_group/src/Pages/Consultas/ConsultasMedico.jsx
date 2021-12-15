import { useState, useEffect } from "react";
import axios from "axios";
import Cabecalho from "../../components/cabecalho/cabecalho"
import Rodape from "../../components/rodape/rodape"
import SituacaoConsulta from "../../components/situacaoConsulta/situacaoConsulta";
// import SetaCima from "../../components/icones/setaCima";
// import SetaBaixo from "../../components/icones/setaBaixo";
import Editar from "../../components/icones/editar";


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
        var textoDescricao = document.getElementById("texto_desc"+ idConsulta)
        textoDescricao.removeAttribute("readOnly");

        if (textoDescricao.value === null || textoDescricao.value === "") {
            textoDescricao.value = "Consulta sem descrição";
            
        }

        if (textoDescricao.style.display === "none") {
            textoDescricao.style.display = "";
        } else{
            textoDescricao.style.display = "none";
        }

        var btn = document.getElementById("btn" + idConsulta);

        if (btn.style.display === "none") {
            btn.style.display = "";      
        } else{
            setDescricao("")
            btn.style.display = "none";
        }
        
    }

    function atualizarDescricao(idConsulta){
        console.log(descricao + idConsulta)
        axios.patch("http://localhost:5000/api/Consultas/descricao/" + idConsulta,{
            descricaoConsulta: descricao
        },{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then(resposta =>{
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
}