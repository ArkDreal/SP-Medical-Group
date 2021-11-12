import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

import Login from './Pages/login/login';



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
        <Route exact path="/" component={Home} /> {/* Home */}
        <Route path="/login" component={Login} /> {/* Login */}
        <PermissaoAdm path="/tiposusuarios" component={CadastrarConsulta} /> {/* Cadastrar Consultas */}
        <PermissaoAdm path="/consultasadm" component={ConsultasAdm} /> {/* Consultas Cadastradas*/}
        <Route path="/consultasmedico" component={ConsultasMedico} /> {/* Alterar Descricao */}
        <Route exact path="/notfound" component={NotFound} /> {/* Not Found */}
        <Redirect to = "/notfound"/> {}
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

reportWebVitals();