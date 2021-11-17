import { Link } from 'react-router-dom';
import "../../assets/CSS/Home.css";
import pastel_de_queijo from "../../assets/img/horizontal_on_white_by_logaster.png"

function Home() {
  return (
    <div className="Home">
      <header className="header_login">
        <div className="container container_header">
            <a href="#"><img  style={{width: "227px" ,height: "90px" }} src={pastel_de_queijo} alt="Logo SP Medical Group"></img></a>
     
            <nav className="nav_header">
                <a href="#">Home</a>
                <Link to="login">Login</Link>
            </nav>
        </div>
    </header>

    <main>
        <section className="container container_intro">
            <h1>SP Medical Group</h1> 
            <hr></hr>
            <span>Clínica médica para você e sua família</span>           
        </section>
        <section className="container container_sobre">

            <div className="imagem_sobre">
                <img style={{ width:"839px", height: "612px"}}  src="../assets/img/undraw_medicine_b1ol-removebg-preview 1.png" alt="Imagem de uma consulta médica"></img>
            </div>
            
            <div className="sobre_nos">
                <h2>Sobre Nós</h2>
                <hr></hr>
                <p>A Clínica Médica, também conhecida como medicina interna,
                 é uma especialidade da medicina responsável pelo atendimento
                 de todas as doenças não cirúrgicas em um adulto. Ou seja, a área
                 engloba todas as áreas não cirúrgicas, sendo subdividida em várias 
                 outras especialidades. O médico clínico pode participar como 
                 coadjuvante no acompanhamento pré e pós operatório, mas  suas
                 principais áreas de atuação são o ambulatório/consultório, os
                 plantões e a medicina interna.</p>
            </div>
           
        </section>
    </main>

    <footer className="container_footer">
        <h3>©2021 | SP Medical Group | Todos os direitos reservados.</h3>
    </footer>
    </div>
  );
}

export default Home;
