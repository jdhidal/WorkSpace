// src/components/Header/Header.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Header.css';

const Header = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Llamar al backend para hacer logout
    fetch('http://localhost:3003/logout', {
      method: 'POST',
      credentials: 'include', 
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        onLogout(); // Ejecutar la función onLogout pasada como prop
        
        window.location.reload();
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <header className="header">
      <button className="button logout-button" onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
