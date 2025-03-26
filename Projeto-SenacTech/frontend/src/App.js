import React from 'react';
// Importa os módulos necessários do React e do React Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Importa as páginas do projeto
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ResgatarRecompensa from './pages/ResgatarRecompensa';

// Importa os componentes de autenticação
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

// Importa os componentes relacionados às missões
import CriarMissao from './components/Missoes/CriarMissao';
import ListarMissoes from './components/Missoes/ListarMissoes';

// Importa os componentes relacionados às recompensas
import CriarRecompensa from './components/Recompensas/CriarRecompensa';
import ListarRecompensas from './components/Recompensas/ListarRecompensas';

// Importa o componente de rota protegida
import ProtectedRoute from './components/ProtectedRoute';

// Importa o provedor de autenticação para gerenciar o contexto de usuário
import { AuthProvider } from './contexts/AuthContext';

function App() {
    return (
        // Envolve toda a aplicação com o AuthProvider para fornecer contexto de autenticação
        <AuthProvider>
            <Router> {/* Configura o roteamento da aplicação */}
                <Switch> {/* Garante que apenas uma rota seja renderizada por vez */}
                    <Route path="/" exact component={Home} /> {/* Rota pública para a página inicial */}
                    <Route path="/login" component={Login} /> {/* Rota pública para login */}
                    <Route path="/register" component={Register} /> {/* Rota pública para registro */}
                    
                    {/* Rotas protegidas, acessíveis apenas para usuários autenticados */}
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

export default App; // Exporta o componente App como padrão