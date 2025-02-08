import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/recuperacion.css';
import axios from 'axios';

export default function VerificarCodigo() {
    const [codigo, setCodigo] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    // Obtener el correo desde el state de React Router
    const location = useLocation();
    const correo = location.state?.correo; // Si el estado no existe, se asegura que no se rompa

    const handleCodigoChange = (e) => {
        setCodigo(e.target.value);
    };

    const handleSubmit = async () => {
        if (!codigo) {
            setError('Por favor ingresa el código que recibiste.');
            return;
        }

        try {
            // Enviar el correo y el código al backend para su verificación
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}verificar-codigo-recuperacion`, {
                correo,
                token: codigo
            });

            // Si el código es válido
            console.log(response.data.message); // Puedes mostrar el mensaje o hacer algo con la respuesta
            navigate('/NuevaContrasena', { state: { correo: correo, token:codigo } }); // Redirigir a la página para cambiar la contraseña
        } catch (error) {
            // Si hay un error (por ejemplo, código incorrecto o expirado)
            console.error(error);
            setError(error.response?.data?.error || 'Hubo un problema al verificar el código.');
        }
    };

    return (
        <div className="containerST">
            <div className="form-containerST">
                <h2 className='title1'>Verifica tu Código</h2>
                <p>Ingresa el código de recuperación que hemos enviado a tu correo electrónico.</p>

                <div className="input-groupST">
                    <label htmlFor="codigo">Código de Recuperación</label>
                    <InputText
                        id="codigo"
                        value={codigo}
                        onChange={handleCodigoChange}
                        placeholder="Ingresa el código"
                        className="input-fieldST"
                    />
                    {error && <small className="error-messageST">{error}</small>}
                </div>

                <Button label="Verificar Código" className="submit-buttonST" onClick={handleSubmit} />
            </div>
        </div>
    );
}
