import React, { useState } from "react";
import { useNavigate } from "react-router-dom";	
import "../register.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleRegister = async () => {
    if (!validateEmail(email)) {
      setMessage("Por favor, introduce un correo electrónico válido.");
      return;
    }
    if (password.length < 6) {
      setMessage('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), 
      });
      if (res.ok) {
        setMessage("Registro exitoso");
        navigate("/login");
      } else {
        const error = await res.text();
        setMessage(`Error: ${error}`);
      }
    } catch (error) {
      setMessage("Error en la conexión");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Registrate</h1>
      </div>
      <form>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <input type="button" value="Registrar" onClick={handleRegister} />
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default RegisterPage;
