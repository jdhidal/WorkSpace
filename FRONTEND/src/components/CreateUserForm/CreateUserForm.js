import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './CreateUserForm.css';

const CreateUserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://34.237.185.147:3020/list-role');
        setRoles(response.data.roles);  // Set the roles array
        setRole(response.data.roles[0]?.nombre);  // Set the default role if available
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://100.27.128.132:3001/create', {
        name,
        email,
        password,
        role
      });
      setMessage(response.data.message);
      navigate('/'); 
    } catch (error) {
      console.error('Error creating user:', error);
      setMessage('Error creating user');
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Register</h2>
      <form id="formRegister" onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            type="text"
            required
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Enter your name</label>
        </div>

        <div className="form-control">
          <input
            type="email"
            required
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Enter your Email</label>
        </div>

        <div className="form-control">
          <input
            type="password"
            required
            id="pass"
            name="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Enter your new Password</label>
        </div>

        {/* Nueva lista desplegable para elegir el rol */}
        <div className="form-control">
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            {roles.map((roleItem) => (
              <option
                key={roleItem.id}
                value={roleItem.nombre}
                disabled={roleItem.nombre === 'Administrator'} // Disable the "Administrador" role
              >
                {roleItem.nombre}
              </option>
            ))}
          </select>
          <label>Select your Role</label>
        </div>

        <button type="submit">Register</button>
        <button onClick={() => navigate('/')}>Cancel</button> {/* Redirect Login*/}
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateUserForm;
