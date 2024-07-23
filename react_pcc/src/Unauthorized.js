import React from 'react';

const Unauthorized = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      color: '#333',
      backgroundColor: '#f8f8f8',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>No Autorizado</h1>
      <p style={{ fontSize: '1.2rem' }}>No tienes permiso para acceder a esta página.</p>
    </div>
  );
};

export default Unauthorized;