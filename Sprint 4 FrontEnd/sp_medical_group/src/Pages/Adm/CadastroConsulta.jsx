import { useState, useEffect } from 'react';
import axios from "axios";
import pastel_de_queijo from "../../assets/img/horizontal_on_white_by_logaster.png"

import '../../assets/CSS/cadastro.css';

export default function CadastroConsulta () {
    const [listaConsulta, setListaConsulta] = useState([]);
    const [listaMedico, setListaMedico] = useState([]);
    const [listaPaciente, setListaPaciente] = useState([]);
    const [idPaciente, setCPF] = useState('');
    const [idMedico, setCRM] = useState('');
    const [dataConsulta, setDataConsulta] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    function listarConsultas() {
        axios('http://localhost:5000/api/Consultas', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaConsulta(resposta.data)
                }
            })

            .catch(erro => console.log(erro))
    };

    useEffect(listarConsultas, []);

    function cadastrarConsulta(evento) {
        setIsLoading(true);

        evento.preventDefault()

        axios
            .post('http://localhost:5000/api/Consultas', {
                idPaciente: idPaciente,
                idMedico: idMedico,
                dataConsulta: dataConsulta
            }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
            .then((resposta) => {
                if (resposta.status === 201) {
                    console.log('Consulta cadastrada');
                    setCRM('');
                    setCPF('');
                    setDataConsulta('');
                    listarConsultas();
                    setIsLoading(false);
                }
            })
            .catch(erro => console.log(erro), setCRM(''), setCPF(''), setDataConsulta(''), setInterval(() => {
                setIsLoading(false)
            }, 5000));
    }


    return (
        <div>
            <header className="header_cc">
        <div class="container container_header">
            <a href="#"><img  style={{width: "227px", height: "90px"  }}src={pastel_de_queijo} alt="Logo SP Medical Group"></img></a>
     
            <nav class="nav_header">
                <a class="nav1" href="#">Ver Consultas</a>
                <a class="sair" href="#">Sair</a>
            </nav>
        </div>
    </header>

    <main>
        <section class="container_cadastro">
            <div class="span_cadastrar">
                <h1>Cadastrar Consultas</h1>
            </div>
            <div class="div_form">
                <form className="form_cc">
                    
                    <input class="input"   
                          placeholder="CRM do Médico"
                          type="text"
                          name=""
                    ></input>

                    <input class="input"   
                           placeholder="CPF do Paciente"
                           type="text"
                           name=""
                    ></input>
                    
                    <input class="input"   
                           type="datetime-local"
                           name=""
                    ></input>

                    <textarea class="textarea" id="id_ta" placeholder="Descrição" ></textarea>

                    <button class="btn_cadastrar">Cadastrar</button>


                </form>
            </div>
        </section>
    </main>

    <footer class="container_footer">
        <h2>©2021 | SP Medical Group | Todos os direitos reservados.</h2>
    </footer>
        </div>
    )
}



