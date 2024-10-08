import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const AddProductPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
      setMessage('Debes estar logueado para publicar un producto');
      navigate('/login'); // Redirige a la página de login si no está logueado.
    }
  }, [navigate]);
  
  
  const handleAddProduct = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Suponiendo que almacenas el token JWT en localStorage
        },
        body: JSON.stringify({ name, description, price, category, imageUrl })
      });

      if (res.ok) {
        const data = await res.json();
        setMessage('Producto publicado con éxito');
      } else {
        const error = await res.json();
        setMessage(`Error: ${error}`);
      }
    } catch (error) {
      setMessage('Error en la conexión');
    }
  };

  return (
    <div className="container">
      <h2>Agregar Producto</h2>
      <div className="form-group">
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del producto"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción del producto"
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Precio</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Precio del producto"
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Categoría</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Categoría del producto"
        />
      </div>
      <div className="form-group">
        <label htmlFor="imageUrl">URL de la Imagen</label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="URL de la imagen del producto (opcional)"
        />
      </div>
      <button onClick={handleAddProduct}>Publicar Producto</button>
    </div>
  );
};

export default AddProductPage;