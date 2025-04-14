import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/home.css';
const Home = () => {
    const history = useHistory();

    return (
        <div>
            <h1>Bem-vindo ao GachaLife!</h1>
            <p>Incentive-se a realizar bons atos e ganhe recompensas!</p>
            <div style={{ marginTop: '20px' }}>
                <button onClick={() => history.push('/login')} className="btn btn-primary" style={{ marginRight: '10px' }}>
                    Login
                </button>
                <button onClick={() => history.push('/register')} className="btn btn-secondary">
                    Registrar
                </button>
            </div>
        </div>
    );
};

export default Home;