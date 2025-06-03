import { InputText } from "primereact/inputtext";
import styles from "./ResetPasswordPage.module.css"; // Importa el módulo CSS
import { Button } from "primereact/button";
import LogoImage from "@/presentation/img/logo-inicio.png"
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/presentation/context/AuthContext/AuthContext";
import { Toast } from "primereact/toast";
import { showToast, showToastWithErrors } from "@/presentation/utils/showToast";
import { Navigate, useSearchParams } from 'react-router-dom';
import PasswordValidation from "./components/PasswordValidation/PasswordValidation";
import { set } from "zod";
import { history } from "@/presentation/utils/history";

const ResetPasswordPage = ({ LoaderGuest, setLoaderGuest }) => {
    const [dataRecovery, setDataRecovery] = useState({
        contraseña: "",
        nuevaContrasena: "",
        token: ""
    });
    const toast = useRef(null)
    const { handleResetPassword, HandleValidateCodeToResetPassword } = useAuth()
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');


    const handleEmailChange = (e) => {

        setDataRecovery({
            ...dataRecovery,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async () => {

        const response = await handleResetPassword(dataRecovery)
        console.log("response",response)
        if (!response?.success) {
            showToastWithErrors("error", "Error al actualizar", response?.error, toast)
        } else {
            showToast("success", "Contraseña actualizada", "Tu contraseña ha sido actualizada con éxito", toast)
            setTimeout(() => {
                history.navigate("/login")
            }, 2500)
            

        }
    }

    const validateCodeToResetPassword = async () => {
        setLoaderGuest(true)
        const result = await HandleValidateCodeToResetPassword({ token: token })

        if (result?.success) {
            setDataRecovery({ ...dataRecovery, token: token })
        } else {
            history.navigate("/login")

        }
        setLoaderGuest(false)
    }
    const handleClickReturn = () => {
        history.navigate("/login")
    }
    useEffect(() => {
        validateCodeToResetPassword()

    }, [token])


    return (

        <div className={`flex align-items-center justify-content-center h-screen h-full py-3 ${styles["container-recovery"]}`}>
            <Toast ref={toast} />
            <div className={styles["container-recovery-form"]}>
                <header>
                    <div className={styles["container-logo"]}><img src={LogoImage} alt="" /></div>
                    <div className={styles["container-title"]}>
                        <p>Recuperar contraseña</p>
                    </div>
                    <div className={styles["container-subtitle"]}>
                        <p>Ingresa y confirma tu nueva contraseña</p>
                    </div>
                </header>
                <main className="mt-4">
                    <div className={styles["container-form"]}>
                        <div className={styles["field-inputs"]}>
                            <div className="input-group">
                                <label htmlFor="">Nueva contraseña</label>
                                <IconField iconPosition="left">
                                    <InputIcon className="pi pi-lock"> </InputIcon>
                                    <PasswordValidation placeholder="Ingresa tu nueva contraseña" className="pr-3" value={dataRecovery?.contraseña} onChange={handleEmailChange} name="contraseña" />
                                </IconField>

                            </div>
                            <div className="input-group ">
                                <label htmlFor="">Confirmar contraseña</label>
                                <IconField iconPosition="left">
                                    <InputIcon className="pi pi-lock"> </InputIcon>
                                    <PasswordValidation placeholder="Ingresa confirmación de contraseña" className="pr-3" value={dataRecovery?.nuevaContrasena} onChange={handleEmailChange} name="nuevaContrasena" />
                                </IconField>


                            </div>
                        </div>
                        <div className={styles["container-buttons"]}>
                            <div className={styles["field-inputs field-inputs-button"]}>
                                <Button className={styles["btn-send-mail"]} onClick={handleSubmit}>Guardar cambios</Button>
                            </div>
                            <div className={styles["field-inputs"]}>
                                <Button className={styles["btn-return-home"]} onClick={handleClickReturn}><i className="pi pi-arrow-left mx-2"></i> Volver al inicio de sesión</Button>
                            </div>
                        </div>
                        <div className={`${styles?.["form-contact"]}`}>
                            <p>Si tienes problemas para recuperar tu cuenta, contáctanos:</p>
                            <p><i className='pi pi-envelope mr-2'></i>administracion@massalud.org.pe</p>
                        </div>


                    </div>
                </main>
            </div>
        </div>
    );
}

export default ResetPasswordPage
