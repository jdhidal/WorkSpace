import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import './MainPage.css'; // Import Styles
import Edificios from './Edificios.jpg';

const MainPage = () => {
  
  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="main-page-container">
      <header className="main-page-header">
        <Header onLogout={handleLogout} />
      </header>
      <main className="main-page-content">
        <div className="welcome-section">
        <img src={Edificios} alt="Welcome" className="welcome-image" />
          <h2>Welcome to WorkSpace</h2>
        </div>
      </main>
      <footer className="main-page-footer">
        <p>Footer content-Add continue test 4</p>
      </footer>
    </div>
  );
};

export default MainPage;
