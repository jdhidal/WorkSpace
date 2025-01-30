import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import './MainPage.css'; // Import Styles
import Edificios from './Edificios.jpg';

const MainPage = () => {
  const navigate = useNavigate();
  const [spaces, setSpaces] = useState([]); 

  const handleLogout = () => {
    navigate('/');
  };

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await fetch('http://localhost:3005/coworking_spaces', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Datos recibidos:', data);

        if (data && Array.isArray(data)) {
          setSpaces(data);
        } else {
          console.error('La API devolvió un formato inesperado:', data);
        }
      } catch (error) {
        console.error('Error fetching spaces:', error);
      }
    };

    fetchSpaces();
  }, []);

  const byteaToImageUrl = (bytea) => {
  
    // Velidate bytes
    if (!bytea || typeof bytea !== 'string') {
      console.error('Invalid photo data:', bytea);
      return 'path_to_default_image'; 
    }
    const cleanedBytea = bytea.startsWith('\\x') ? bytea.slice(2) : bytea;

    if (!cleanedBytea) {
      return 'path_to_default_image';
    }
  
    const imageUrl = `data:image/jpeg;base64,${cleanedBytea}`;
  
    return imageUrl;
  };

  return (
    <div className="main-page-container">
      <header className="main-page-header">
        <Header onLogout={handleLogout} />
      </header>
      <main className="main-page-content">
        <div className="welcome-section">
          <img src={Edificios} alt="Welcome" className="welcome-image" />
          <div className="welcome-overlay"></div>
          <div className="welcome-text">
            <h2>Welcome to WorkSpace</h2>
          </div>
        </div>
        <section className="coworking-spaces-section">
          <h3>Available Coworking Spaces</h3>
          <div className="spaces-grid">
            {spaces.map((space) => (
              <div key={space.id} className="space-card">
                <img
                  src={byteaToImageUrl(space.photo)}
                  alt={space.name}
                  className="space-image"
                />
                <div className="space-details">
                  <h4>{space.name}</h4>
                  <p>{space.description}</p>
                </div>
                <button className="reserve-button">Reservar</button>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="main-page-footer">
        <p>Footer content-Add continue test 4</p>
      </footer>
    </div>
  );
};

export default MainPage;