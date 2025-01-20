// src/components/Header/Header.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('http://localhost:3003/logout', {
      method: 'POST',
      credentials: 'include'
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
