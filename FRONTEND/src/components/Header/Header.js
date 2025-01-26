// src/components/Header/Header.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Header.css';

const Header = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Realizar la solicitud de logout al backend
    fetch('http://localhost:3003/logout', {
      method: 'POST',
      credentials: 'include',  // Asegúrate de que las cookies se envíen correctamente
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        onLogout();
        navigate('/');
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
