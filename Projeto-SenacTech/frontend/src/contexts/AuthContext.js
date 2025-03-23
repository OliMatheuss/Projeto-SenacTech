import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Inicializa o estado do usuário com os dados do localStorage
        const storedUser = localStorage.getItem('user');
        if (!storedUser || storedUser === 'undefined') return null; // Retorna null se não houver dados válidos no localStorage

        try {
            return JSON.parse(storedUser); // Faz o parse apenas se houver dados válidos
        } catch (error) {
            console.error('Erro ao parsear os dados do usuário no localStorage:', error);
            return null; // Retorna null se houver erro no parse
        }
    });

    const login = (userData) => {
        setUser(userData); // Salva os dados do usuário
        localStorage.setItem('user', JSON.stringify(userData)); // Salva no localStorage
    };

    const logout = () => {
        setUser(null); // Limpa o estado do usuário
        localStorage.removeItem('user'); // Remove os dados do localStorage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;