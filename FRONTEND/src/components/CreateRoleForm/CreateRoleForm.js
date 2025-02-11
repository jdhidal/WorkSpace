import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateRoleForm.css';

const CreateRoleForm = () => {
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      setMessage('Por favor, ingresa un nombre para el rol.');
      return;
    }

    try {
      const response = await axios.post('http://34.237.185.147:3017/create-role', {
        role,
      });

      setMessage(response.data);
      setRole('');
      navigate('/main');
    } catch (error) {
      console.error('Error creando el rol:', error);
      setMessage('Error al crear el rol');
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Crear Nuevo Rol</h2>
      <form id="formRegister" onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            type="text"
            required
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <label>Ingresa el nombre del rol</label>
        </div>

        <button type="submit">Crear Rol</button>
        <button type="button" onClick={() => navigate('/main')}>Cancelar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateRoleForm;
