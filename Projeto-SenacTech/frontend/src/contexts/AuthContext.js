import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser && storedUser !== 'undefined' ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem('token') || null;
    });

    const login = (userData, token) => {
        setUser(userData);
        setToken(token);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    const fetchUserFromAPI = async () => {
        if (!token) return;

        try {
            const response = await axios.get('http://localhost:5000/api/auth/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const updatedUser = response.data;
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (error) {
            console.error('Erro ao buscar dados atualizados do usuário:', error);
        }
    };

    useEffect(() => {
        fetchUserFromAPI(); // busca os dados do usuário ao carregar
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, fetchUserFromAPI }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
