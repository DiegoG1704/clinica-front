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
import { useAuth } from '../../context/AuthContext/AuthContext';
import { showToast, showToastWithErrors } from '../../utils/showToast';

export default function Registro({ userData }) {
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
    const [showPromoterCode, setShowPromoterCode] = useState(false);
    const navigate = useNavigate();
    const { RegisterUser } = useAuth()

    useEffect(() => {
        // Clear the form when the component mounts
        setCorreo("");
        setContraseña("");
        setConfirmarContraseña("");
        setTelefono("");
        setChecked(false);

    }, []);
    useEffect(() => {
        if (Object.keys(userData).length === 0) {
            navigate("/home")
        }
    })

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleTermsAccept = () => {
        setChecked(true);
        setVisible(false);
    };

    const handleRegister = async () => {
        const newUser = {
            ...userData,
            correo,
            contraseña,
            telefono,
            rol_id: 4,
            fotoPerfil: null,
            clinica_id: 1,
            aceptarPoliticas: checked,
            confirmarContraseña: confirmarContraseña
        };
        try {
            const response = await RegisterUser(newUser)
            console.log("respon", response)
            if (response?.success) {
                showToast("success","Éxito",'Usuario creado correctamente',toast)
                navigate('/login'); // Navigate to the next page
            }else{
                showToastWithErrors("error","Error al registrar usuario",response?.error,toast)

            }

        } catch (error) {

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
                <span onClick={() => setShowPromoterCode(!showPromoterCode)}>
                    ¿Tiene Codigo de algún Promotor?
                </span>
                {showPromoterCode && (
                    <div className="input-group">
                        <label htmlFor="codigoPromotor">Código de Promotor</label>
                        <InputText
                            id="codigoPromotor"
                            value={telefono} // Puedes cambiar esto por el estado adecuado
                            onChange={(e) => setTelefono(e.target.value)} // Puedes usar otro estado para el código del promotor si lo prefieres
                            placeholder="Ingresa Codigo de Promotor..."
                        />
                    </div>
                )}


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
