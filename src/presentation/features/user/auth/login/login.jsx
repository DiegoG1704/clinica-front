import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import styles from "./login.module.css"

import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Divider } from 'primereact/divider';
import Hands from "@/presentation/img/hands.webp"



const login = ({ onLogin }) => {
    return (
        <div className={`flex  align-items-center justify-content-center  h-screen ${styles?.["container-login"]} `}>

            <div className={`${styles?.["container-form"]}  `}>
                <div className={styles?.background}>
                    <img src={Hands} alt="" />
                </div>
                <div className={`${styles?.["login-info"]} flex-1`}>
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
                                <li class={styles?.["feature-item"]}>Red de Clínicas</li>
                                <li class={styles?.["feature-item"]}>Atención 24/7</li>
                                <li class={styles?.["feature-item"]}>Beneficios Exclusivos</li>
                                <li class={styles?.["feature-item"]}>Cobertura Nacional</li>
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
                                <InputText placeholder='Ingresa tu DNI' />
                            </IconField>

                        </div>
                        <div className="input-group">
                            <label htmlFor="">Contraseña</label>
                            <IconField iconPosition="left">
                                <InputIcon className="pi pi-lock"> </InputIcon>
                                <InputText placeholder='Ingresa tu contraseña' />
                            </IconField>

                        </div>
                        <div className={`${styles?.["container-actions-button"]}`}>
                            <Button className='w-full flex justify-content-center mt-4'><span >Iniciar sesión</span></Button>
                        </div>
                    </div>
                    <hr className={styles?.divider} />

                    <div className={`flex-1 mt-6 ${styles?.["form-footer"]}`}>
                        <p className={styles?.["form-footer-question"]}>¿Eres nuevo en MasSalud?</p>
                        <div className={`${styles?.["container-actions-button__submit"]}`}>
                            <Button className='w-full' icon="pi pi-user-plus" > <span className='ml-3'>Regístrate con código de promotor</span></Button>
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

export default login
