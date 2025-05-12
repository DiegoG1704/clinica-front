import { InputText } from "primereact/inputtext";
import styles from "./RecoveryPage.module.css"; // Importa el módulo CSS
import { Button } from "primereact/button";
import LogoImage from "@/presentation/img/logo-inicio.png"
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { useRef, useState } from "react";
import { useAuth } from "@/presentation/context/AuthContext/AuthContext";
import Illustration from "@/presentation/img/IllustrationSendEmail.png"
import { Toast } from "primereact/toast";
import { showToast, showToastWithErrors } from "@/presentation/utils/showToast";



const RecoveryPage = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar el ícono de carga
    const [timeLeft, setTimeLeft] = useState(0); // Estado para el tiempo restante
    const { sendEmailToRecovery, handlevalidateEmail } = useAuth();
    const [emailError, setEmailError] = useState("");
    const toast = useRef(null);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);

        const result = handlevalidateEmail({ email: e.target.value })
        console.log("resut",result)

        if (!result?.success) {
            const errorMessage = result?.error|| "";
            setEmailError(errorMessage);
        } else {
            setEmailError("");
        }
    };
    const handleTimeInterval = () => {

        // Iniciar el temporizador para contar los 10 segundos
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval); // Detener el temporizador cuando llegue a 0
                    setIsLoading(false); // Habilitar el botón nuevamente
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }

    const handleSubmit = async () => {
        setIsLoading(true); // Activar el estado de carga
        setTimeLeft(10); // Inicializar el contador en 10 segundos

        const response = await sendEmailToRecovery(email);
        if (response?.success) {
            console.log("Correo enviado");
            showToast("success", "Correo enviado", "Se ha enviado un correo con instrucciones a tu bandeja de entrada para recuperar tu contraseña", toast);
        } else {
            console.log("Error", response?.error);
            showToastWithErrors("error", "Error al enviar el correo", response?.error, toast);
        }
        handleTimeInterval()
        setEmailError("")


    };

    return (
        <div className={`flex align-items-center justify-content-center h-screen h-full  ${styles["container-recovery"]}`}>
            <Toast ref={toast} />
            <div className="flex flex-1 justify-content-center align-items-center">
                <div className={styles["container-recovery-form"]}>
                    <header>
                        <div className={styles["container-logo"]}>
                            <img src={LogoImage} alt="" />
                        </div>
                        <div className={styles["container-title"]}>
                            <p>Recuperar contraseña</p>
                        </div>
                        <div className={styles["container-subtitle"]}>
                            <p>Ingrese su dirección de correo electrónico registrada y las instrucciones para recuperar su contraseña serán enviadas a su correo electrónico.</p>
                        </div>
                    </header>
                    <main className="mt-4">
                        <div className={styles["container-form"]}>
                            <div className={styles["field-inputs"]}>
                                <div className="input-group">
                                    <label htmlFor="">Correo electrónico</label>
                                    <IconField iconPosition="left">
                                        <InputIcon className="pi pi-envelope"> </InputIcon>
                                        <InputText
                                            placeholder="Ingresa tu correo electronico"
                                            className="pr-3"
                                            value={email}
                                            onChange={handleEmailChange}
                                        />
                                    </IconField>
                                </div>
                            </div>
                            <div className={styles["container-buttons"]}>
                                <div className={styles["field-inputs field-inputs-button"]}>
                                    <Button
                                        onClick={handleSubmit}
                                        className={styles["btn-send-mail"]}
                                        disabled={isLoading || !!emailError || !email.trim()} // 👈 aquí
                                    >
                                        {isLoading ? (
                                            <>
                                                <i className="pi pi-spin pi-spinner"></i> {/* Ícono de carga */}
                                                <span className="ml-2">{timeLeft}s</span> {/* Mostrar tiempo restante */}
                                            </>
                                        ) : (
                                            "Enviar enlace de recuperación"
                                        )}
                                    </Button>
                                </div>
                                <div className={styles["field-inputs"]}>
                                    <Button className={styles["btn-return-home"]}
                                   
                                    >
                                        <i className="pi pi-arrow-left mx-2"></i> Volver al inicio de sesión
                                    </Button>
                                </div>
                            </div>
                            <div className={`${styles?.["form-contact"]}`}>
                                <p>Si tienes problemas para recuperar tu cuenta, contáctanos:</p>
                                <p>
                                    <i className="pi pi-envelope mr-2"></i>administracion@massalud.org.pe
                                </p>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            <div className={`flex flex-1 align-items-center justify-content-center   ${styles["container-illustration"]}`}>
                <div className={styles["illustration"]}>
                    <header>
                        <h4>UNA CONSTRASEÑA SEGURA NOS AYUDA A:</h4>
                    </header>
                    <div className={styles["image-ilustration"]}>
                        <img src={Illustration} alt="" />
                    </div>
                    <footer>
                        <h4>PROTEGERNOS CONTRA ATAQUES</h4>
                        <p>Evita que hackers accedan a tus cuentas mediante ataques de fuerza bruta o diccionario.</p>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default RecoveryPage;