import { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import FulLuz from '../../img/img02.png';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';
import { Toast } from 'primereact/toast';
import { showToast, showToastWithErrors } from '../../utils/showToast';

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
        try {
            const response = await onLogin(correo, contraseña);
            if (response?.success) {
                navigate(response?.data?.rutas?.[0]?.ruta);
            } else {
                showToastWithErrors("error", "Error al iniciar Sesión", response?.error, toastRef)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="login-container">
            <Toast ref={toastRef} />
            <Button
                icon="pi pi-chevron-left"
                className="back-button"
                onClick={() => navigate('/')}
                aria-label="Retroceder"
            />
            <div className="login-left">

                {/* Columna izquierda con el formulario */}
                <h1 className="tituloLogin">Inicia Sesión</h1>
                {/* Input de correo */}
                <div className="input-group">
                    <label htmlFor="id">DNI</label>
                    <InputText
                        id="id"
                        placeholder="Ingresar dni ..."
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
                            className="p-button-secondary-Login"
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
                    <a href="/Register"> Regístrate</a>
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
