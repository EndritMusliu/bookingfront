import React from 'react';
import SignUpComponent from "../components/SignUpComponent";

const SignUpPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1 style={{ marginBottom: '20px', fontFamily: 'Arial, sans-serif', fontSize: '32px', color: '#007bff', fontWeight: '600', marginTop: '0' }}>Sign Up Page</h1>
      <SignUpComponent />
    </div>
  );
};

export default SignUpPage;


