import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle, FaTrash } from 'react-icons/fa';
import './AvailabilityForm.css';

const AvailabilityForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, name, description } = location.state || {};

  const [availabilityData, setAvailabilityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3008/availability/${id}`, { withCredentials: true })
        .then(response => {
          setAvailabilityData(response.data);
          setLoading(false);
        })
        .catch(() => {
          setError("No se pudo cargar la información de disponibilidad");
          setLoading(false);
        });
    }
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta disponibilidad?")) {
      try {
        await axios.delete(`http://localhost:3009/delete-availability/${id}`, { withCredentials: true });
        setAvailabilityData(null);
        alert("Disponibilidad eliminada con éxito");
      } catch (error) {
        alert("Error al eliminar la disponibilidad");
      }
    }
  };

  return (
    <div className="availability-form-container">
      <header className="availability-form-header">
        <h2>Detalles del Espacio</h2>
      </header>

      <main className="availability-form-content">
        {loading && <p>Cargando información...</p>}
        {error && <p>{error}</p>}

        {id ? (
          <div className="space-details">
            <div className="space-title">
              <h3>{name}</h3>
              <p className="space-description">{description}</p>
            </div>

            {availabilityData && availabilityData.length > 0 ? (
              <div className="availability-info">
                <h4>Disponibilidad:</h4>
                <div className="availability-item">
                  {availabilityData.map((item) => (
                    <div key={item.id} className="availability-item-details">
                      <p><strong>Fecha Inicio:</strong> {new Date(item.start_date).toLocaleDateString()}</p>
                      <p><strong>Fecha Fin:</strong> {new Date(item.end_date).toLocaleDateString()}</p>
                      <p><strong>Hora Inicio:</strong> {new Date(item.start_time).toLocaleTimeString()}</p>
                      <p><strong>Hora Fin:</strong> {new Date(item.end_time).toLocaleTimeString()}</p>
                      <p><strong>Estado:</strong> 
                        <span className={`status ${item.status}`}>
                          {item.status === 'available' ? <FaCheckCircle /> : <FaTimesCircle />}
                          {item.status === 'available' ? 'Disponible' : 'No Disponible'}
                        </span>
                      </p>
                      <p><strong>Capacidad Máxima:</strong> {item.max_capacity}</p>
                      <div className="notes">
                        <strong>Notas:</strong>
                        <p>{item.notes || 'No hay notas adicionales.'}</p>
                      </div>
                      <p><strong>Fecha Creación:</strong> {new Date(item.created_at).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <button className="delete-availability-button" onClick={handleDelete}>
                  <FaTrash /> Eliminar Disponibilidad
                </button>
              </div>
            ) : (
              <div>
                <p>No hay disponibilidad para mostrar.</p>
                <button className="create-availability-button" onClick={() => {
                  navigate(`/crear-disponibilidad/${id}`, { state: { id, name, description } });
                }}>
                  Crear Disponibilidad
                </button>
              </div>
            )}

            <div className="availability-actions">
              <button className="reserve-button">Reservar</button>
              <button className="back-button" onClick={() => window.history.back()}>Volver</button>
            </div>
          </div>
        ) : (
          <p>No se pudo cargar la información del espacio.</p>
        )}
      </main>
    </div>
  );
};

export default AvailabilityForm;
