
import React from 'react'

// import { Button, Input } from "antd"

import styles from "./FormSignIn.module.css"
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import InputInteger from '@/presentation/components/Inputs/InputNumberInteger/InputInteger'




const FormSignIn = ({ credentials, togglePassword, setTogglePassword, handleLogin, handleClickForget, handleChangeCredentials }) => {


    const handleTogglePassword = () => {
        setTogglePassword(!togglePassword)
    }



    const handleSubmit = async () => {

        // const response = await signIn()
        // if (response.success) {
        //     showCustomToast({
        //         message: '¡Inicio de sesión exitoso!',
        //         type: 'success',
        //         position: 'top-right',
        //         transition: 'bounceIn',
        //     });

        // } else {
        //     showCustomToast({
        //         message: 'Error al iniciar sesión. Por favor, verifica tus datos.',
        //         type: 'error',
        //         position: 'top-right',
        //         transition: 'bounceIn',
        //     });

        // }
    }

    return (
        <form className={styles.form}>
            <div className={styles.formGroup}>
                <label htmlFor="document" className={styles.label}>
                    Nro. de Documento
                </label>
                <InputInteger
                    id="document"
                    type="text"
                    placeholder="Ingresa tu número de documento"
                    className={styles["document-input"]}
                    required
                    name="documento"
                    maxLength={8}
                    value={credentials?.correo}
                    onChange={handleChangeCredentials}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                    Contraseña
                </label>
                <div className="relative">
                    <InputText
                        id="password"
                        type={togglePassword ? "text" : "password"}
                        placeholder="Ingresa tu contraseña"
                        className={styles["password-input"]}
                        required
                        name="contraseña"
                        value={credentials?.contraseña}
                        onChange={handleChangeCredentials}
                    />
                    <button type="button" className={styles["password-toggle"]} onClick={handleTogglePassword}>
                        <i className="pi pi-eye"></i>
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-end">
                <button type="button" className={styles.forgot} onClick={handleClickForget}>
                    ¿Olvidaste tu contraseña?
                </button>
            </div>

            <Button className={styles["button-secondary"]} onClick={handleLogin}>Ingresar</Button>
        </form>

    )
}

export default FormSignIn
