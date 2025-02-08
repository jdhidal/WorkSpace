import React, { useState } from "react";
import axios from "axios";
import "./CreateAvailabilityForm.css";
import { useLocation, useNavigate } from "react-router-dom";

const CreateAvailabilityForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, name, description } = location.state || {};

  const today = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    coworking_space_id: id,
    start_date: today,
    end_date: "",
    start_time: "",
    end_time: "",
    status: "available",
    max_capacity: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos a enviar:", formData);  // Verifica la estructura de los datos

    // Validación para la fecha de inicio y fin
    const startDate = new Date(formData.start_date);
    const endDate = new Date(formData.end_date);

    if (endDate <= startDate) {
      alert("La fecha de finalización debe ser posterior a la fecha de inicio.");
      return;
    }

    const maxEndDate = new Date(startDate);
    maxEndDate.setDate(startDate.getDate() + 7);

    if (endDate > maxEndDate) {
      alert("La fecha de finalización no puede ser más de dos días después de la fecha de inicio.");
      return;
    }

    // Asegurarse de que las horas tengan el formato completo HH:MM:SS
    const formattedStartTime = formData.start_time.includes(":") ? formData.start_time + ":00" : formData.start_time;
    const formattedEndTime = formData.end_time.includes(":") ? formData.end_time + ":00" : formData.end_time;

    // Convertir max_capacity a un número entero
    const parsedMaxCapacity = parseInt(formData.max_capacity, 10);

    // Crear un nuevo objeto con las horas formateadas y max_capacity convertido a número
    const dataToSend = {
      ...formData,
      start_time: formattedStartTime,
      end_time: formattedEndTime,
      max_capacity: parsedMaxCapacity,
    };

    try {
      const response = await axios.post("http://44.207.49.60:3007/availability", dataToSend, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      alert(response.data.message); // Mostrar mensaje de éxito
      navigate(-1);
    } catch (error) {
      console.error("Error al crear disponibilidad", error.response ? error.response.data : error);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Volver a la página anterior usando useNavigate
  };

  // Para la fecha de fin, bloqueamos las fechas que no sean dentro de los 2 días posteriores a la fecha de inicio
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setFormData((prevData) => {
      const newEndDate = new Date(newStartDate);
      newEndDate.setDate(newEndDate.getDate() + 2);
      return { 
        ...prevData, 
        start_date: newStartDate, 
        end_date: newEndDate.toISOString().split('T')[0],
      };
    });
  };

  return (
    <div className="form-wrapper">
      <h2>Se está creando disponibilidad para {name}</h2>
      <p className="centered-text">{description}</p>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <input 
            type="date" 
            name="start_date" 
            value={formData.start_date} 
            onChange={handleStartDateChange} 
            required 
            min={today}
          />
          <label>Fecha de Inicio</label>
        </div>
        <div className="form-control">
          <input 
            type="date" 
            name="end_date" 
            value={formData.end_date} 
            onChange={handleChange} 
            required 
            min={formData.start_date}
          />
          <label>Fecha de Fin</label>
        </div>
        <div className="form-control">
          <input type="time" name="start_time" value={formData.start_time} onChange={handleChange} required />
          <label>Hora de Inicio</label>
        </div>
        <div className="form-control">
          <input type="time" name="end_time" value={formData.end_time} onChange={handleChange} required />
          <label>Hora de Fin</label>
        </div>
        <div className="form-control">
          <input type="number" name="max_capacity" value={formData.max_capacity} onChange={handleChange} required />
          <label>Capacidad Máxima</label>
        </div>
        <div className="form-control">
          <input type="text" name="notes" value={formData.notes} onChange={handleChange} />
          <label>Notas (opcional)</label>
        </div>
        <div className="button-group">
          <button type="submit">Crear Disponibilidad</button>
          <button type="button" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default CreateAvailabilityForm;
