import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import {API_URL} from "../utils/backendApi";

const LoginComponent = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Destructure login function from the useAuth hook

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${API_URL}signin/`, {
        username: formData.username,
        password: formData.password
      });
      console.log('Login Success:', response.data.token);
      login(response.data.token); // Use the login function from the context to handle successful login
      navigate('/stays'); // Navigate to 'calendar' or any other protected route
    } catch (error) {
      setError('Failed to login. Check username and password.');
      console.error('Login Error:', error.response ? error.response.data : 'Unknown error');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '300px', display: 'flex', flexDirection: 'column' }}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        style={{ marginBottom: '10px', padding: '10px' }}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        style={{ marginBottom: '10px', padding: '10px' }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}>
        Submit
      </button>
    </form>
  );
};

export default LoginComponent;
