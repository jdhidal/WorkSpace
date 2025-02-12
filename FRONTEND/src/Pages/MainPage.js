import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import './MainPage.css'; // Import Styles
import Edificios from './Edificios.jpg';
import ConfirmationModal from '../components/ConfirmationModal/ConfirmationModal'; // Import el modal
import { toast } from 'react-toastify'; // For Notifications
import axios from 'axios'; // Import axios para hacer peticiones

const MainPage = () => {
  const navigate = useNavigate();
  const [spaces, setSpaces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estatus modal enable
  const [spaceToDelete, setSpaceToDelete] = useState(null); // Space eliminada en espera
  const [userRole, setUserRole] = useState(null);

  const [email, setEmail] = useState(localStorage.getItem('userEmail'));

  const handleLogout = () => {
    localStorage.removeItem('userEmail'); // Borrar el email del localStorage
    navigate('/');
  };

  useEffect(() => {
    if (!email) {
      navigate('/');
    }
  }, [email, navigate]);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get(`http://100.27.128.132:3014/users/${email}`);
        setUserRole(response.data.role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    const fetchSpaces = async () => {
      try {
        const response = await fetch('http://35.171.43.245:3005/coworking_spaces', {
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

    fetchUserRole();
    fetchSpaces();
  }, [email]);

  const byteaToImageUrl = (bytea) => {
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

  const handleDeleteClick = (id) => {
    setSpaceToDelete(id); // Guardar el ID del espacio
    setIsModalOpen(true); // Abrir el modal
  };

  const handleConfirmDelete = async () => {
    if (!spaceToDelete) return;

    try {
      const response = await fetch(`http://35.171.43.245:3006/coworking_spaces/${spaceToDelete}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Actualizar si el espacio fue eliminado
      setSpaces((prevSpaces) => prevSpaces.filter((space) => space.id !== spaceToDelete));
      setIsModalOpen(false);
      toast.success('Espacio eliminado exitosamente'); 
    } catch (error) {
      console.error('Error eliminando el espacio:', error);
      toast.error('Error al eliminar el espacio'); 
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false); // Cerrar modal
    setSpaceToDelete(null); 
  };

  const handleDetailsClick = (space) => {
    navigate('/availability-form', {
      state: { id: space.id, name: space.name, description: space.description }
    });
  };

  return (
    <div className="main-page-container">
      <header className="main-page-header">
        <Header email={email} onLogout={handleLogout} />
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
                <button 
                  className="reserve-button" 
                  onClick={() => handleDetailsClick(space)}
                >
                  Detalles
                </button>
                {userRole === 'Administrator' && (
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteClick(space.id)}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="main-page-footer">
        <p>Footer content-Add continue test 4</p>
      </footer>

      {/* Modal Confirmations*/}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="¿Estás seguro de que deseas eliminar este espacio?"
      />
    </div>
  );
};

export default MainPage;
