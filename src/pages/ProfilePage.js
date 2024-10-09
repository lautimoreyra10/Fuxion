import React, { useEffect, useState } from 'react';
import "../profile.css";
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    document: '',
    card: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(true); // Nueva variable de estado para manejar la carga
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Si no hay token, redirige al login
    if (!token) {
      navigate('/login');
      return;
    }
    
    // Verificar si el token es válido
    fetch("http://localhost:5000/api/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          // Si no es válido, redirige al login
          throw new Error('Token inválido o expirado');
        }
        return res.json();
      })
      .then((data) => {
        setUserData(data);
        setLoading(false); // Datos cargados, quitar el estado de carga
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem('token'); // Eliminar token inválido
        navigate('/login'); // Redirigir al login
      });
  }, [navigate]);

  // Mostrar pantalla de carga si los datos no han sido cargados aún
  if (loading) {
    return <div>Cargando Perfil...</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');

  try {
    const res = await fetch("http://localhost:5000/api/users/profile", {
      method: 'PUT',  // Suponiendo que usas PUT para actualizar el perfil
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (res.ok) {
      const updatedData = await res.json();
      setUserData(updatedData);  // Actualiza los datos locales del perfil
      setMessage("Perfil actualizado con éxito");
    } else {
      const error = await res.text();
      setMessage(`Error al actualizar el perfil: ${error}`);
    }
  } catch (error) {
    setMessage('Error en la conexión');
  }
};

return (
  <div className="profile-container">
    <h1>Perfil del Usuario</h1>
    <form className="profile-form" onSubmit={handleFormSubmit}>
      <div className="form-group">
        <label>Nombre</label>
        <input
          type="text"
          name="firstName"
          value={userData.firstName}
          onChange={handleInputChange}
          placeholder="Nombre"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label>Apellido</label>
        <input
          type="text"
          name="lastName"
          value={userData.lastName}
          onChange={handleInputChange}
          placeholder="Apellido"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label>Correo Electrónico</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          placeholder="Correo Electrónico"
          className="form-input"
          disabled
        />
      </div>

      <div className="form-group">
        <label>Dirección</label>
        <input
          type="text"
          name="address"
          value={userData.address}
          onChange={handleInputChange}
          placeholder="Dirección"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label>Documento</label>
        <input
          type="text"
          name="document"
          value={userData.document}
          onChange={handleInputChange}
          placeholder="Documento de Identidad"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label>Tarjeta</label>
        <input
          type="text"
          name="card"
          value={userData.card}
          onChange={handleInputChange}
          placeholder="Número de Tarjeta"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label>URL de la Imagen de Perfil</label>
        <input
          type="text"
          name="imageUrl"
          value={userData.imageUrl}
          onChange={handleInputChange}
          placeholder="URL de Imagen de Perfil"
          className="form-input"
        />
        {userData.imageUrl && (
          <img
            src={userData.imageUrl}
            alt="Foto de Perfil"
            className="profile-image"
          />
        )}
      </div>

      <button type="submit" className="save-button">
        Guardar Cambios
      </button>
    </form>

    {message && <p className="message">{message}</p>}
  </div>
);

};

export default ProfilePage;
