import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const token = getCookie('token');
  console.log('Token:', token); // Verifica el token en la aplicación web

  // Si hay un token, se renderiza el contenido de las rutas anidadas, si no, redirige al login
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
