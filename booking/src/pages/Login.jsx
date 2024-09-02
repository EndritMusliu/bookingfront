import React from 'react';
import LoginComponent from '../components/LoginComponent';

const LoginPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1 style={{ marginBottom: '20px', fontFamily: 'Arial, sans-serif', fontSize: '32px', color: '#007bff', fontWeight: '600', marginTop: '0' }}>Login Page</h1>
      <LoginComponent />
    </div>
  );
};

export default LoginPage;



