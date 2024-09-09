import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import apiClient from '../services/axiosConfig'; // Import the axios instance
import { API_URL } from '../utils/backendApi'; // Assuming you have this configured elsewhere

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
            apiClient.defaults.headers.common['Authorization'] = `Token ${token}`;
        } else {
            delete apiClient.defaults.headers.common['Authorization'];
        }
    };

    const fetchUserDetails = async (token) => {
        try {
            const response = await apiClient.get('users/me/', {
                headers: {
                    Authorization: `Token ${token}`  // Redundant, but ensures token is sent
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
        delete apiClient.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, authToken, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
