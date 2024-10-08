import React from 'react';
import '../navBar.css';

export const Navbar = () => {
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
      </div>
    </nav>
    );
};


