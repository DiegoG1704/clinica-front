import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import fondo from '../../img/img03.png';
import './registerU.css'; 
import { useNavigate } from 'react-router-dom'; 

export default function RegisterU() {
    const [idValue, setIdValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const navigate = useNavigate();
    
    const handleRegister = () => {
        navigate('/home'); 
    };
    
    return (
        <div className="login-containe">
            <div className="login-left">
                <h1 className="tituloLogin">Registrar Usuario</h1>
                <div className="input-group">
                    <label htmlFor="id">Correo o DNI</label>
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
                <Button onClick={handleRegister} label="Siguiente" className="login-button" />
            </div>

            <div className="login-righ">
                <img src={fondo} alt="Illustration" className="login-img" />
                <div className='info'>
                    <h1>Tu plan incluye</h1>
                    <p>º Acceso exclusivo a ofertas especiales</p>
                    <p>º Uso ilimitado de promociones</p>
                    <p>º Noticias médicas de primera</p>
                </div>
            </div>
        </div>
    );
}
