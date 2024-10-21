import { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import FulLuz from '../../img/img02.png';
import { useNavigate } from 'react-router-dom';
import './css/Login.css'; 
import { Toast } from 'primereact/toast';

export default function Login({ onLogin }) {
    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toastRef = useRef(null);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleLogin = async () => {
        setLoading(true);
        if (!correo || !contraseña) {
            toastRef.current.show({ severity: 'error', summary: 'Error', detail: 'Por favor, complete todos los campos.', life: 3000 });
            setLoading(false);
            return;
        }
        try {
            const response = await onLogin(correo,contraseña);
            console.log("da",response)
            if (response) {
                console.log("ruts",response?.rutas?.[0]?.ruta)
                navigate(response?.rutas?.[0]?.ruta);
            } else {
                toastRef.current.show({ severity: 'error', summary: 'Error', detail: response.data.message, life: 3000 });
            }
        } catch (error) {
            if (error.response) {
                toastRef.current.show({ severity: 'error', summary: 'Error', detail: error.response.data.message || "Error al iniciar sesión.", life: 3000 });
            } else if (error.request) {
                toastRef.current.show({ severity: 'error', summary: 'Error', detail: "No se pudo conectar con el servidor.", life: 3000 });
            } else {
                toastRef.current.show({ severity: 'error', summary: 'Error', detail: "Ocurrió un error inesperado.", life: 3000 });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <Toast ref={toastRef} />

            <div className="login-left">
                <Button
                    icon="pi pi-chevron-left"
                    className="back-button"
                    onClick={() => navigate('/')}
                    aria-label="Retroceder"
                />
                {/* Columna izquierda con el formulario */}
                <h1 className="tituloLogin">Inicia Sesión</h1>
                {/* Input de correo */}
                <div className="input-group">
                    <label htmlFor="id">ID o DNI</label>
                    <InputText
                        id="id"
                        placeholder="Ingrese su ID o DNI..."
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        disabled={loading}
                        className='input'
                    />
                </div>
                {/* Input de contraseña */}
                <div className="input-group">
                    <label htmlFor="password">Contraseña</label>
                    <div className="p-inputgroup">
                        <InputText
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Ingrese su contraseña..."
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                            disabled={loading}
                        />
                        <Button
                            icon={showPassword ? "pi pi-eye-slash" : "pi pi-eye"}
                            onClick={toggleShowPassword}
                            className="p-button-secondary"
                            disabled={loading}
                        />
                    </div>
                </div>

                <Button
                    label="Iniciar sesión"
                    onClick={handleLogin}
                    disabled={loading}
                    loading={loading}
                    className="login-button"
                />
                <div className="register-link">
                    <label>¿Aún no tienes una cuenta?</label>
                    <a href="/home"> Regístrate</a>
                </div>
            </div>

            {/* Columna derecha con la ilustración */}
            <div className="login-right">
                <img
                    src={FulLuz}
                    alt="Ilustración"
                    className="login-image"
                />
            </div>
        </div>
    );
}
