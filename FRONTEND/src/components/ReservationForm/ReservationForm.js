import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReservationForm.css';

const ReservationForm = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.post('http://LBDomainReservation-4095db6f9680d4b1.elb.us-east-1.amazonaws.com:3012/list-reservation', {
      query: "{ listReservations { id facility_name user_name reservation_date status } }"
    })
    .then(response => {
      setReservations(response.data.data.listReservations);
      setLoading(false);
    })
    .catch(() => {
      setError('Error al cargar las reservaciones');
      setLoading(false);
    });
  }, []);

  return (
    <div className="reservation-list-container">
      <header className="reservation-list-header">
        <h2>Lista de Reservaciones</h2>
      </header>

      <main className="reservation-list-content">
        {loading && <p>Cargando reservaciones...</p>}
        {error && <p>{error}</p>}

        {reservations.length > 0 ? (
          <table className="reservation-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Espacio</th>
                <th>Usuario</th>
                <th>Fecha</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map(reservation => (
                <tr key={reservation.id}>
                  <td>{reservation.id}</td>
                  <td>{reservation.facility_name}</td>
                  <td>{reservation.user_name}</td>
                  <td>{new Date(reservation.reservation_date).toLocaleDateString()}</td>
                  <td>{reservation.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay reservaciones disponibles.</p>
        )}
      </main>
    </div>
  );
};

export default ReservationForm;
