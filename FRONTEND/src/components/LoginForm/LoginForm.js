import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://100.27.128.132:3002/login', {
        email,
        password
      }, { withCredentials: true }); // Credential

      setMessage('Login successful!');
      Cookies.set('token', response.data.token, { expires: 1, secure: false, sameSite: 'Lax' });
      console.log('Email enviado al main:', email);
      localStorage.setItem('userEmail', email);
      navigate('/main');
      
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('Password or users incorrect. Please log in again');
    }
  };

  return (
    <div className="form-wrapper">
      <div class="centered-text">
        <h2>Welcome to WorkSpace</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            type="email"
            required
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Enter your email</label>
        </div>
        <div className="form-control">
          <input
            type="password"
            required
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Enter your password</label>
        </div>
        <button type="submit">Login</button>
        <button onClick={() => navigate('/create')}>Create Account</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginForm;
