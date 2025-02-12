// src/components/Header/Header.js

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Header.css';

const Header = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState(location.state?.email);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (email) {
      axios.get(`http://localhost:3014/users/${email}`)
        .then(response => {
          setUserData(response.data);
          setLoading(false); 
        })
        .catch(err => {
          console.error('Error fetching user data:', err);
          setError('Failed to fetch user data');
          setLoading(false);
        });
    }
  }, [email]);

  const handleLogout = () => {
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
    navigate('/create-place');
  };

  const handleCreateRoleRedirect = () => {
    navigate('/create-role');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <header className="header">
      <div className="user-info">
        {userData ? (
          <p>Welcome, {userData.name} ({userData.role})</p>
        ) : (
          <p>No user data available</p>
        )}
      </div>

      <div className="button-container">
        {userData.role === "Administrator" && (
          <>
            <button className="button create-place-button" onClick={handleCreatePlaceRedirect}>
              Create Place
            </button>
            <button className="button create-role-button" onClick={handleCreateRoleRedirect}>
              Create Roles
            </button>
          </>
        )}
        
        <button className="button logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
