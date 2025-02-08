// src/components/Header/Header.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Header.css';

const Header = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // call backend logout
    fetch('http://100.27.128.132:3003/logout', {
      method: 'POST',
      credentials: 'include', 
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        onLogout();
        
        window.location.reload();
      })
      .catch(error => console.error('Error:', error));
  };

  const handleCreatePlaceRedirect = () => {
    // Redirest Space Coworking
    navigate('/create-place');
  };

  return (
    <header className="header">
      <button className="button logout-button" onClick={handleLogout}>Logout</button>
      <button className="button create-place-button" onClick={handleCreatePlaceRedirect}>Create Place</button>
    </header>
  );
};

export default Header;
