import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();

    return (
        <div className="page-container">
            <div className="card">
                <h1>Bem-vindo ao GachaLife!</h1>
                <p>Incentive-se a realizar bons atos e ganhe recompensas!</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <button onClick={() => history.push('/login')} className="btn btn-primary">
                        Login
                    </button>
                    <button onClick={() => history.push('/register')} className="btn btn-secondary">
                        Registrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;