import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ResgatarRecompensa from './pages/ResgatarRecompensa';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CriarMissao from './components/Missoes/CriarMissao';
import ListarMissoes from './components/Missoes/ListarMissoes';
import CriarRecompensa from './components/Recompensas/CriarRecompensa';
import ListarRecompensas from './components/Recompensas/ListarRecompensas';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/resgatar-recompensa" component={ResgatarRecompensa} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/criar-missao" component={CriarMissao} />
                <Route path="/listar-missoes" component={ListarMissoes} />
                <Route path="/criar-recompensa" component={CriarRecompensa} />
                <Route path="/listar-recompensas" component={ListarRecompensas} />
            </Switch>
        </Router>
    );
}

export default App;