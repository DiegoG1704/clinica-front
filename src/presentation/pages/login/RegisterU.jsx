import React, { useState, useRef, useEffect } from 'react';
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 
import { Checkbox } from "primereact/checkbox";
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import "./registerU.css";

export default function Registro({ userData }) {
    console.log('data',userData)
    const toast = useRef(null);
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [confirmarContraseña, setConfirmarContraseña] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [civilStatus, setCivilStatus] = useState(null);
    const [checked, setChecked] = useState(false);
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Clear the form when the component mounts
        setCorreo("");
        setContraseña("");
        setConfirmarContraseña("");
        setTelefono("");
        setChecked(false);
    }, []);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleTermsAccept = () => {
        setChecked(true);
        setVisible(false);
    };

    const handleRegister = async () => {
        // Validate passwords
        if (contraseña !== confirmarContraseña) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Las contraseñas no coinciden' });
            return;
        }

        if (contraseña.length < 8) {
            toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'La contraseña debe tener al menos 8 caracteres' });
            return;
        }
        

        if (!userData || !userData.dni || !userData.nombres || !userData.apellidos) {
            console.log("data",userData)
            toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Información de usuario incompleta' });
            return;
        }        

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Correo no válido' });
            return;
        }

        // Prepare user data for the API
        const newUser = {
            ...userData,
            correo,
            contraseña,
            telefono,
            rol_id: 4,       
            fotoPerfil: null, 
            clinica_id:1
        };
        console.log('Datos enviados a la API', newUser);
        try {
            const response = await axios.post('http://localhost:4000/CreateUsuario', newUser);
            if (response.data.success) {
                toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Usuario creado correctamente' });
                navigate('/login'); // Navigate to the next page
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Usuario no creado' });
            }
        } catch (error) {
            if (error.response) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: error.response.data.message || 'Hubo un error al crear el usuario' });
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Hubo un error en la solicitud' });
            }
        }
    };

    return (
        <div className="login-container">
            <Toast ref={toast} />
            <div className="login-link">
                <div>
                <label>¿Ya tienes una cuenta?</label>
                <a className='Iniciar' onClick={() => navigate('/login')}>Inicia sesión</a>
                </div>
                <a>¿Olvidaste tu ID o contraseña?</a>
            </div>

            <div className="login-left">
                <div className="header">
                    <Button 
                        label='' 
                        onClick={() => navigate('/home')} 
                        className="circular-button"
                    >
                        <i className="pi pi-angle-left"></i>
                    </Button>
                </div>

                <h1 className="tituloLogin">Crear Cuenta</h1>
                <p>Crea tu cuenta en MasSalud y accede a las mejores ofertas en tratamientos, consultas y mucho más</p>
                {/* Correo */}
                <div className="input-group">
                    <label htmlFor="correo">Correo</label>
                    <InputText
                        id="correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        placeholder="Ingresa tu correo"
                    />
                </div>

                {/* Teléfono */}
                <div className="input-group">
                    <label htmlFor="telefono">Teléfono</label>
                    <InputText
                        id="telefono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        placeholder="Ingresa tu teléfono"
                    />
                    {/* <span>Recomendamos incluír un número telefónico, esto permitira verificar tu cuenta y
                    mantenerte a salvo.</span> */}
                </div>

                {/* Contraseña */}
                <div className="input-group">
                    <label htmlFor="password">Contraseña</label>
                    <div className="p-inputgroup">
                        <InputText
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Ingrese contraseña..."
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                        />
                        <Button
                            icon={showPassword ? "pi pi-eye-slash" : "pi pi-eye"}
                            onClick={toggleShowPassword}
                            className="p-button-secondary"
                        />
                    </div>
                </div>

                {/* Confirmación de contraseña */}
                <div className="input-group">
                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                    <div className="p-inputgroup">
                        <InputText
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirme contraseña..."
                            value={confirmarContraseña}
                            onChange={(e) => setConfirmarContraseña(e.target.value)}
                        />
                        <Button
                            icon={showPassword ? "pi pi-eye-slash" : "pi pi-eye"}
                            onClick={toggleShowPassword}
                            className="p-button-secondary"
                        />
                    </div>
                </div>
                {/* <div>
                    <div>
                        <span>Usa 8 caracteres o más</span>
                        <span>Usa números (e.g. 1234)</span>
                    </div>
                    <div>
                        <span>Usa caracteres especiales (e.g. Aa)</span>
                        <span>Usa símbolos (e.g. !@#$)</span>
                    </div>
                </div> */}

                {/* Checkbox para aceptar términos */}
                <div className="checkbox-custom">
                    <Checkbox
                        onChange={e => setChecked(e.checked)}
                        checked={checked}
                        className="custom-checkbox"
                    />
                    <p>
                        Al registrarte aceptas haber leído y estar de acuerdo con la 
                        <span onClick={() => setVisible(true)} className="terminosLink"> Política
                        de Privacidad y los Términos y condiciones</span>
                    </p>
                </div>

                {/* Botón para crear cuenta */}
                <Button
                    label="Crear Cuenta"
                    onClick={handleRegister}
                    className="login-button"
                />
                
                {/* Diálogo de términos y condiciones */}
                <Dialog header="Términos y Condiciones" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                    <p>Contenido de los términos y condiciones...</p>
                    <Button label="Aceptar" onClick={handleTermsAccept} />
                </Dialog>
            </div>
        </div>
    );
}
