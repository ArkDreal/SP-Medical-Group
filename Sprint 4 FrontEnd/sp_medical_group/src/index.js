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

reportWebVitals();
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { parseJwt, usuarioAutenticado } from './services/auth';

import './index.css';

import App from './pages/home/App';
import TiposUsuarios from './pages/tiposUsuarios/tiposUsuarios';
import TiposEventos from './pages/tiposEventos/tiposEventos';
import Eventos from './pages/eventos/eventos';
import Login from './pages/login/login';
import NotFound from './pages/notFound/notFound';

import reportWebVitals from './reportWebVitals';

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
        <Route exact path="/" component={App} /> {/* Home */}
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