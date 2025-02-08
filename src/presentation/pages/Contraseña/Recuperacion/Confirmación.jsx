import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import './css/recuperacion.css';

export default function Exito() {
    const navigate = useNavigate();

    return (
        <div className="containerST">
            <div className="form-containerST">
                <h2 className='title1'>¡Éxito!</h2>
                <p>Tu contraseña ha sido actualizada correctamente. Ahora puedes iniciar sesión con tu nueva contraseña.</p>

                <Button label="Iniciar Sesión" className="submit-buttonST" onClick={() => navigate('/login')} />
            </div>
        </div>
    );
}
