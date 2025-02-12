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

  // Estado para manejar los comentarios
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

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
        setUserRole(response.data);
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

    // Fetch comments from the API
    const fetchComments = async () => {
      try {
        const response = await axios.get('http://35.175.25.214:3016/list-comments');
        setComments(response.data); // Set the comments in state
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchUserRole();
    fetchSpaces();
    fetchComments();
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
      state: { id: space.id, name: space.name, description: space.description, nameuser: userRole?.name}
    });
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      toast.error('El comentario no puede estar vacío');
      return;
    }

    if (!userRole?.name) {
      toast.error('No se pudo obtener el nombre del usuario');
      return;
    }

    try {
      const response = await fetch('http://35.175.25.214:3015/create-comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userRole.name,      // Usamos userRole.name
          comment: newComment.trim() // Usamos el comentario que se escribió
        })
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Comentario enviado con éxito:', data);
        // Actualizamos los comentarios en la UI
        setComments((prevComments) => [...prevComments, { name: userRole.name, comment: newComment }]);
        setNewComment(""); // Limpiar el comentario después de enviarlo
        toast.success('Comentario enviado');
      } else {
        console.error('Error al enviar el comentario:', data);
        toast.error('Error al enviar el comentario');
      }
    } catch (error) {
      console.error('Error de red:', error);
      toast.error('Error al enviar el comentario');
    }
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
                {userRole?.role === 'Administrator' && (
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

        <hr className="section-divider" />
  
        {/* Comment Section */}
        <section className="comments-section">
          <h3>Comentarios</h3>
          
          {/* Lista de comentarios */}
          <div className="comments-list">
            {comments.map((comment, index) => (
              <div key={index} className="comment-card">
                <p><strong>{comment.name}:</strong> {comment.comment}</p>
              </div>
            ))}
          </div>

          <hr className="section-divider" />

          {/* Formulario para agregar un comentario */}
          <div className="add-comment">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe un comentario..."
            />
            <button onClick={handleCommentSubmit}>Agregar Comentario</button>
          </div>
        </section>
  
      </main>
      
      <footer className="main-page-footer">
        <p>Footer content-Add continue test 4</p>
      </footer>
  
      {/* Modal Confirmations */}
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
