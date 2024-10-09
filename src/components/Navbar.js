import React, { useState, useEffect } from 'react';
import '../navBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';

export const Navbar = () => {

  const [ isAuthenticated, setIsAuthenticated] =useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);
  const handleUserClick = () => {
    if (isAuthenticated) {
      // Si está logueado, redirige al perfil
      navigate('/profile');
    } else {
      // Si no está logueado, redirige a la página de registro
      navigate('/login');
    }
  };
  
    return (
      <nav className="navbar">
      <div className="nameLogo">Fuxion</div>
      <div className="search-bar">
        <input type="text" placeholder="Buscar productos" />
      </div>
      <div className="links">
        <a href="/">Inicio</a>
        <a href="/products">Productos</a>
        <a href="/about">Acerca de</a>
        <button onClick={handleUserClick} className="user-icon-button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding:0, margin:0}}>
          <FontAwesomeIcon icon={faUser} />
        </button>
      </div>
    </nav>
    );
};


