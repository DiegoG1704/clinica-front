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



const Login = ({ onLogin }) => {
    const [credentials,setCredentials]=useState({correo:"",contraseña:""})
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toastRef = useRef(null);
 
    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await onLogin(credentials?.correo, credentials?.contraseña);
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
    const handleChangeCredentials=(e)=>{
        let name=e.target.name
        setCredentials({...credentials,[name]:e?.target?.value})
    }
    const handleClickRegister=(ruta)=>{
        navigate("/register")
    }


    return (
        <div className={`flex    align-items-center justify-content-center lg:h-screen sm:h-full sm:py-3 ${styles?.["container-login"]} `}>
           <Toast ref={toastRef}/> 
            <div className={`${styles?.["container-form"]} flex sm:flex-column lg:flex-row  `}>
                <div className={styles?.background}>
                    <img src={Hands} alt="" />
                </div>
                <div className={`${styles?.["login-info"]} flex-1 sm:hidden lg:flex`}>
                    <div>
                        <header class={styles?.header}>
                            {/* <div className={styles?.logo}>
                                <img src={logo} alt="" />

                            </div> */}
                            <p className={styles?.["name-empresa"]}>MAS<span>SALUD</span> </p>
                            <p class={styles?.subtitle}>Tu bienestar es <br />   <span>nuestra prioridad</span></p>
                        </header>
                        <section class={styles?.benefits}>
                            <p class={styles?.description}>
                                Accede a beneficios exclusivos y una red de clínicas de <span>primer nivel</span>  para ti y tu familia.
                            </p>
                            <ul class={styles?.features}>
                                <li class={styles?.["feature-item"]}>Descuentos en Clínicas</li>
                                <li class={styles?.["feature-item"]}>Asesoría Personalizada</li>
                                <li class={styles?.["feature-item"]}>Beneficios Exclusivos</li>
                                <li class={styles?.["feature-item"]}>Ingresos por Afiliación</li>
                            </ul>
                        </section>

                    </div>




                </div>
                <div className={` ${styles?.["login-form"]} flex-1`}>
                    <div className={styles?.["header-form"]}>
                        <span><i className="pi pi-shield"></i></span>
                        <h2>Bienvenido</h2>
                        <p>Inicia sesión para acceder a tu cuenta</p>

                    </div>
                    <div className={`${styles?.["form"]}`}>
                        <div className="input-group">
                            <label htmlFor="">DNI</label>
                            <IconField iconPosition="left">
                                <InputIcon className="pi pi-user"> </InputIcon>
                                <InputText placeholder='Ingresa tu DNI' name='correo' value={credentials?.correo} onChange={handleChangeCredentials} />
                            </IconField>

                        </div>
                        <div className="input-group">
                            <label htmlFor="">Contraseña</label>
                            <IconField iconPosition="left">
                                <InputIcon className="pi pi-lock"> </InputIcon>
                                <InputText placeholder='Ingresa tu contraseña' type='password' name='contraseña' className='pl-5' value={credentials?.contraseña} onChange={handleChangeCredentials}/>
                            </IconField>

                        </div>
                        <div className={`${styles?.["container-actions-button"]}`}>
                            <Button type='button' className='w-full flex justify-content-center mt-4' onClick={handleLogin}><span >Iniciar sesión</span></Button>
                        </div>
                    </div>
                    <hr className={styles?.divider} />

                    <div className={`flex-1 mt-6 ${styles?.["form-footer"]}`}>
                        <p className={styles?.["form-footer-question"]}>¿Eres nuevo en MasSalud?</p>
                        <div className={`${styles?.["container-actions-button__submit"]}`}>
                            <Button className='w-full' icon="pi pi-user-plus" onClick={handleClickRegister}> <span className='ml-3'>Regístrate con código de promotor</span></Button>
                        </div>

                        <div className={`${styles?.["form-contact"]}`}>
                            <p>Si no cuentas con un código, contáctanos:</p>
                            <p><i className='pi pi-envelope mr-2'></i>administracion@massalud.org.pe</p>
                        </div>

                    </div>
                </div>
            </div>


        </div>
    )
}

export default Login
