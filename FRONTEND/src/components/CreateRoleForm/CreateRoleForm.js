import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateRoleForm.css';

const CreateRoleForm = () => {
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://LBDomainRole-0779122421317ac1.elb.us-east-1.amazonaws.com:3020/list-role');
      setRoles(response.data.roles);
    } catch (error) {
      console.error('Error al obtener los roles:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      setMessage('Por favor, ingresa un nombre para el rol.');
      return;
    }

    try {
      const response = await axios.post('http://LBDomainRole-0779122421317ac1.elb.us-east-1.amazonaws.com:3017/create-role', {
        role,
      });

      setMessage(response.data);
      setRole('');
      fetchRoles();
    } catch (error) {
      console.error('Error creando el rol:', error);
      setMessage('Error al crear el rol');
    }
  };

  const handleEdit = async (id, newName) => {
    if (!newName) return; // If no name is provided, don't send the request

    // Crear el XML en formato SOAP
    const soapBody = `
      <?xml version="1.0" encoding="UTF-8"?>
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                        xmlns:web="http://34.237.185.147:3019/update-role">
        <soapenv:Header/>
        <soapenv:Body>
            <web:updateRole>
              <role>administrator</role>
              <id>4</id>
            </web:updateRole>
        </soapenv:Body>
      </soapenv:Envelope>
    `;

    // Enviar la solicitud SOAP con axios
    try {
      const response = await axios.post('http://LBDomainRole-0779122421317ac1.elb.us-east-1.amazonaws.com:3019/update-role', soapBody, {
        headers: {
          'Content-Type': 'text/xml',  // Asegurarse de que sea tipo XML
        },
      });

      console.log('Respuesta de la solicitud SOAP:', response.data);
      setMessage('Rol actualizado con éxito');
      fetchRoles(); // Refrescar roles después de la actualización
    } catch (error) {
      console.error('Error al actualizar el rol:', error);
      setMessage('Error al actualizar el rol');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://LBDomainRole-0779122421317ac1.elb.us-east-1.amazonaws.com:3018/delete-role/${id}`);
      fetchRoles();
    } catch (error) {
      console.error('Error eliminando el rol:', error);
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
        <button type="button" onClick={() => navigate('/main')}>Regresar</button>
      </form>
      
      {message && <p>{message}</p>}
      
      <div className="table-container">
        <table className="role-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre del Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((roleItem) => (
              <tr key={roleItem.id}>
                <td>{roleItem.id}</td>
                <td>
                  <input
                    type="text"
                    defaultValue={roleItem.nombre}
                    onBlur={(e) => handleEdit(roleItem.id, e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={() => handleDelete(roleItem.id)}>Eliminar</button>
                  <button onClick={() => handleEdit(roleItem.id, roleItem.nombre)}>Actualizar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateRoleForm;
