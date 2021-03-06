import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { parseJwt, usuarioAutenticado } from './services/auth';
import Login from './Pages/login/login';
import reportWebVitals from './reportWebVitals';
import Home from './Pages/Home/App';
import CadastroConsulta from './Pages/Adm/CadastroConsulta';

// ReactDOM.render(
//   <React.StrictMode>
//     <Login/>
//   </React.StrictMode>,
//   document.getElementById('root')
// );



const PermissaoAdm = ({ component : Component  }) => (
  <Route 
    render = { props =>

      usuarioAutenticado() && parseJwt().role === "1" ? 

      <Component {...props} /> : 

      <Redirect to = 'login' />
    }
  />
);


const routing = (
  <Router>
    <div>
      <Switch>
      <PermissaoAdm path="/CadastroConsultas" component={CadastroConsulta} /> Cadastrar Consultas
        <Route exact path="/" component={Home} /> 
        <Route path="/login" component={Login} /> {/* Login */}
         
        {/* <PermissaoAdm path="/consultasadm" component={ConsultasAdm} /> Consultas Cadastradas */}
        {/* <Route path="/consultasmedico" component={ConsultasMedico} /> Alterar Descricao */}
        {/* <Route exact path="/notfound" component={NotFound} /> {/* Not Found */}
        {/* <Redirect to = "/notfound"/> {} *}*/}
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

reportWebVitals();