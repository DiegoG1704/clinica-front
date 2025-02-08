import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import './css/recuperacion.css';
import axios from 'axios';

export default function SolicitudRecuperacion() {
    const [correo, setcorreo] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handlecorreoChange = (e) => {
        setcorreo(e.target.value);
    };

    const handleSubmit = async (e) => {
        console.log('correo',correo);
        
        e.preventDefault(); // Prevenir recarga de página

        if (!correo) {
            setError('Por favor ingresa tu correo electrónico.');
            return;
        }

        // Validación de formato de correo
        const correoPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!correoPattern.test(correo)) {
            setError('Por favor ingresa un correo electrónico válido.');
            return;
        }

        setError(''); // Limpiar el error si es válido

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}solicitar-recuperacion`, { correo });
            console.log(response.data);
            // Aquí puedes redirigir o mostrar un mensaje adicional
            navigate('/Recuperacion', { state: { correo: correo } });
        } catch (error) {
            console.error(error);
            setError('Hubo un error al procesar la solicitud. Intenta de nuevo más tarde.');
        }
    };

    return (
        <div className="containerST">
            <Button
                icon="pi pi-chevron-left"
                className="back-button"
                onClick={() => navigate('/login')}
                aria-label="Retroceder"
            />
            <div className="form-containerST">
                <h2 className='title1'>Recuperación de Cuenta</h2>
                <p>Por favor ingresa tu correo electrónico para recibir un código de recuperación.</p>
                
                <div className="input-groupST">
                    <label htmlFor="correo">Correo Electrónico</label>
                    <InputText
                        id="correo"
                        value={correo}
                        onChange={handlecorreoChange}
                        placeholder="Ejemplo@dominio.com"
                        className="input-fieldST"
                    />
                    {error && <small className="error-messageST">{error}</small>}
                </div>

                <Button label="Enviar Código" className="submit-buttonST" onClick={handleSubmit} />
            </div>
        </div>
    );
}
