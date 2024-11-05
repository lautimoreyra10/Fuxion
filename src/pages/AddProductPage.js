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

  // Verificar si el usuario está logueado
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Debes estar logueado para publicar un producto');
      navigate('/login'); // Redirige a la página de login si no está logueado
    }
  }, [navigate]);

  // Función para manejar el envío del formulario
  const handleAddProduct = async (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario

    // Validación básica
    if (!name || !description || !price || !category) {
      setMessage('Por favor, completa todos los campos obligatorios.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Debes iniciar sesión para agregar un producto.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/products/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Autenticación
        },
        body: JSON.stringify({ name, description, price, category, imageUrl }), // Cambia esto si es un archivo de imagen
      });

      if (res.ok) {
        const data = await res.json();
        setMessage('Producto publicado con éxito');
        navigate('/');
      } else {
        const error = await res.json().catch(() => ({ message: 'Error desconocido' }));
        setMessage(`Error: ${error.message || 'Error al agregar el producto'}`);
        console.log(error);
      }
    } catch (error) {
      setMessage('Error en la conexión');
    }
  };

  return (
    <div className="container">
      <h2>Agregar Producto</h2>
      {message && <p>{message}</p>} {/* Muestra el mensaje de error o éxito */}
      <form onSubmit={handleAddProduct}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre del producto"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción del producto"
            required
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
            required
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
            required
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
        <button type="submit">Publicar Producto</button>
      </form>
    </div>
  );
};

export default AddProductPage;
