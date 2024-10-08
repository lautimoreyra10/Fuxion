import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />; // Redirige al login si no hay token
  }

  return children; // Si hay token, muestra el contenido protegido
};

export default ProtectedRoute;