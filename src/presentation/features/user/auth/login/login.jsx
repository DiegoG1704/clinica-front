import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import styles from "./login.module.css"

import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Divider } from 'primereact/divider';
import Hands from "@/presentation/img/hands.webp"
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showToastWithErrors } from '@/presentation/utils/showToast';
import { Toast } from 'primereact/toast';
import CustomGlowSVG from './components/CustomGlowSecodary';
import CustomGlowSVG2 from './components/CustomGlowPrimary';
import mainImage from "../../../../img/home/logo_inicio.webp"
import phoneImage from "../../../../img/home/platform.png"
import FormSignIn from './components/FormSignIn/FormSignIn';



const Login = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({ correo: "", contraseña: "" })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toastRef = useRef(null);
    const [togglePassword, setTogglePassword] = useState(false)


    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true);
        try {
            const response = await onLogin(credentials?.documento, credentials?.contraseña);
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
    const handleChangeCredentials = (e) => {
        let name = e.target.name
        setCredentials({ ...credentials, [name]: e?.target?.value })
    }
    const handleClickRegister = (ruta) => {
        navigate("/register")
    }
    const handleClickForget = () => {
        navigate("/Recuperacion")
    }


    return (
        <div className={styles.page}>
            <Toast ref={toastRef} />
            {/* Header */}
            <div className={styles.header}>
                <div>
                    <img src={mainImage} alt="logo" width={120} />
                </div>
                <div className="flex align-items-center space-x-4">
                    <span className={styles.headerText}>¿No tienes cuenta?</span>
                    <Button className={styles["button-register"]} onClick={handleClickRegister}>Regístrate</Button>
                </div>
            </div>

            {/* Left Side */}
            <div className={styles.left}>
                <div className={styles.leftContent}>
                    <div className={styles.leftTextContainer}>
                        <h3 className={styles.leftTitle}>
                            Tu salud más cerca con <span>MAS SALUD</span>
                        </h3>
                        <p className={styles.leftText}>
                            Afíliate y accede a clínicas, descuentos y atención rápida.
                        </p>
                    </div>

                    {/* Phone Mockup */}
                    <div className={styles.phoneContainer}>
                        <div className={styles["container-image"]}>
                            <img src={phoneImage} alt="image-platform" className={styles.phoneImage} />
                        </div>
                    </div>
                </div>

                <div className={styles["container-circle-right"]}>
                    <CustomGlowSVG />
                </div>
                <div className={styles["container-circle-left"]}>
                    <CustomGlowSVG2 />
                </div>
            </div>

            {/* Right Side */}
            <div className={styles.right}>
                <div className={styles.rightContent}>
                    <div className="mb-10">
                        <h2 className={styles.rightTitle}>Hola,</h2>
                        <p className={styles.rightText}>por favor, ingresa tus credenciales.</p>
                    </div>
                    <FormSignIn data={credentials} togglePassword={togglePassword}
                        setTogglePassword={setTogglePassword} handleLogin={handleLogin}
                        handleClickForget={handleClickForget} handleChangeCredentials={handleChangeCredentials} />
                </div>
            </div>
        </div>
    )
}
 
export default Login
