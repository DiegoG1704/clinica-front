import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/recuperacion.css';
import axios from 'axios';

export default function NuevaContrasena() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para la confirmación de contraseña
    const navigate = useNavigate();

    // Obtener el correo y el token desde el estado de React Router o localStorage
    const location = useLocation();
    const correo = location.state?.correo; // Se espera que el correo esté en el estado de la navegación
    const token = location.state?.token; // Se espera que el token esté en el estado de la navegación

    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        } else if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        setError('');

        try {
            // Hacer la solicitud al backend para cambiar la contraseña
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}cambiar-contrasena`, {
                correo,
                token,
                nuevaContrasena: password
            });

            console.log(response.data);
            navigate('/Confirmacion'); // Redirigir a una página de confirmación
        } catch (error) {
            console.error("Error al cambiar la contraseña:", error);
            setError(error.response?.data?.error || 'Hubo un problema al cambiar la contraseña.');
        }
    };

    return (
        <div className="containerST">
            <div className="form-containerST">
                <h2 className='title1'>Crea una Nueva Contraseña</h2>
                <p>Ingresa una nueva contraseña que utilizarás para acceder a tu cuenta.</p>

                <div className="input-groupST">
                    <label htmlFor="password">Nueva Contraseña</label>
                    <div className="password-input-containerST">
                        <InputText
                            id="password"
                            type={showPassword ? 'text' : 'password'} // Cambiar tipo según el estado
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Nueva contraseña"
                            className="input-fieldST"
                        />
                        <Button
                            type="button"
                            className="password-toggle-buttonST"
                            icon={showPassword ? "pi pi-eye" : "pi pi-eye-slash"}
                            onClick={() => setShowPassword(!showPassword)} // Cambiar estado al hacer clic
                        />
                    </div>
                </div>

                <div className="input-groupST">
                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                    <div className="password-input-containerST">
                        <InputText
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'} // Cambiar tipo según el estado
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            placeholder="Confirmar contraseña"
                            className="input-fieldST"
                        />
                        <Button
                            type="button"
                            className="password-toggle-buttonST"
                            icon={showConfirmPassword ? "pi pi-eye" : "pi pi-eye-slash"}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Cambiar estado al hacer clic
                        />
                    </div>
                </div>

                {error && <small className="error-messageST">{error}</small>}

                <Button label="Actualizar Contraseña" className="submit-buttonST" onClick={handleSubmit} />
            </div>
        </div>
    );
}
