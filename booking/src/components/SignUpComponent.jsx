import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../utils/backendApi';

const SignUpComponent = () => {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    user_type: '', // Should hold the ID of the selected UserType
  });

  const [userTypes, setUserTypes] = useState([]);

  const navigate = useNavigate();

  // Fetch user types from the API
  useEffect(() => {
    const fetchUserTypes = async () => {
      try {
        const response = await axios.get(`${API_URL}usertypes/`);
        setUserTypes(response.data);
      } catch (error) {
        console.error('Error fetching user types:', error);
      }
    };

    fetchUserTypes();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post(`${API_URL}signup/`, formData);
      console.log('Signup Success:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Signup Error:', error.response ? error.response.data : 'Unknown error');
      console.log('Making signup request with data:', formData);
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
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        style={{ marginBottom: '10px', padding: '10px' }}
      />
      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        value={formData.first_name}
        onChange={handleChange}
        style={{ marginBottom: '10px', padding: '10px' }}
      />
      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={formData.last_name}
        onChange={handleChange}
        style={{ marginBottom: '10px', padding: '10px' }}
      />

      {/* Dropdown for selecting user type */}
        <select
            name="user_type"
            value={formData.user_type}
            onChange={handleChange}
            style={{ marginBottom: '10px', padding: '10px' }}
        >
            <option value="">Select User Type</option>
            {userTypes.map((type) => (
                <option key={type.id} value={type.id}>
                    {type.name}
                </option>
            ))}
        </select>


      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        style={{ marginBottom: '10px', padding: '10px' }}
      />
      <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}>
        Submit
      </button>
    </form>
  );
};

export default SignUpComponent;

