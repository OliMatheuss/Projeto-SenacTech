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
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <ProtectedRoute path="/dashboard" component={Dashboard} />
                    <ProtectedRoute path="/resgatar-recompensa" component={ResgatarRecompensa} />
                    <ProtectedRoute path="/criar-missao" component={CriarMissao} />
                    <ProtectedRoute path="/listar-missoes" component={ListarMissoes} />
                    <ProtectedRoute path="/criar-recompensa" component={CriarRecompensa} />
                    <ProtectedRoute path="/listar-recompensas" component={ListarRecompensas} />
                </Switch>
            </Router>
        </AuthProvider>
    );
}

export default App;