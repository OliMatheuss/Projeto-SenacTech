import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();

    return (
        <div>
            <h1>Bem-vindo ao GachaLife!</h1>
            <p>Incentive-se a realizar bons atos e ganhe recompensas!</p>
            <div style={{ marginTop: '20px' }}>
                <button onClick={() => history.push('/login')} style={{ marginRight: '10px' }}>
                    Login
                </button>
                <button onClick={() => history.push('/register')}>
                    Registrar
                </button>
            </div>
        </div>
    );
};

export default Home;