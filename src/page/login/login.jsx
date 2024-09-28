import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import fondo from '../../img/img02.png';
import './css/Login.css'; // Assuming you have styles in a CSS file
import {useNavigate } from 'react-router-dom'; // Importa useNavigate

export default function Login() {
  const [idValue, setIdValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate('/DatosU'); // Redirige a la ruta de registro
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1 className="tituloLogin">Inicia Sesión</h1>
        <div className="input-group">
          <label htmlFor="id">ID o DNI</label>
          <InputText
            id="id"
            value={idValue}
            onChange={(e) => setIdValue(e.target.value)}
            placeholder="Ingresa tu ID o DNI"
            
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <InputText
            id="password"
            type="password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            placeholder="Ingresa tu contraseña"
          />
        </div>
        <Button onClick={() => navigate('/Admin')} label="Iniciar sesión" className="login-button" />
        <div className="register-link">
          <label>¿Aún no tienes una cuenta?</label>
          <a onClick={handleRegister}> Regístrate</a>
        </div>
      </div>

      <div className="login-right">
        <img src={fondo} alt="Illustration" className="login-image" />
      </div>
    </div>
  );
}
