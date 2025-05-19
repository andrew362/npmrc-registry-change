import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        marginTop: '2rem',
        borderTop: '1px solid #e5e7eb',
        paddingTop: '1rem',
      }}
    >
      <p
        style={{
          fontSize: '13px',
          color: '#9ca3af',
          margin: 0,
        }}
      >
        NPM Registry Manager • Select a registry to
        configure your npm client
      </p>
    </footer>
  );
};

export default Footer;
