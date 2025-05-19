import React from 'react';

const Header: React.FC = () => {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '2rem',
      }}
    >
      <div
        style={{
          backgroundColor: '#1e293b',
          color: 'white',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '12px',
          fontWeight: 'bold',
          fontSize: '24px',
          marginRight: '16px',
        }}
      >
        📦
      </div>
      <div>
        <h1
          style={{
            margin: '0',
            fontSize: '24px',
            fontWeight: '600',
            color: '#1e293b',
          }}
        >
          NPM Registry Manager
        </h1>
        <p style={{ margin: '4px 0 0', color: '#64748b' }}>
          Easily switch between npm registries
        </p>
      </div>
    </header>
  );
};

export default Header;
