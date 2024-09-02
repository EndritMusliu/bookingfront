// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import {API_URL} from "../utils/backendApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!authToken);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (authToken) {
            setAxiosAuthHeader(authToken);
            fetchUserDetails(authToken);
        }
    }, [authToken]);

    const setAxiosAuthHeader = (token) => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Token ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    const fetchUserDetails = async (token) => {
        try {
            const response = await axios.get(`${API_URL}users/me/`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const login = (token) => {
        localStorage.setItem('authToken', token);
        setAuthToken(token);
        setIsAuthenticated(true);
        setAxiosAuthHeader(token);
        fetchUserDetails(token);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthToken(null);
        setIsAuthenticated(false);
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, authToken, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
