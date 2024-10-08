import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../login.css';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        setMessage("Login exitoso");
        navigate('/');
      } else {
        const error = await res.text();
        setMessage(`Error: ${error}`);
      }
    } catch (error) {
      setMessage("Error en la conexión", error);
    }
  };

  return (
    <div className="container">
      <h1>Iniciar sesión</h1>
      <form>
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Correo electrónico"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button type="button" onClick={handleLogin}>Iniciar sesión</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;
