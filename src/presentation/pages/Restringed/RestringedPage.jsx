import React, { useRef, useState } from 'react';
import styles from "./restringed-page.module.css";
import { useAuth } from '../../context/AuthContext/AuthContext';
import { history } from '../../utils/history';
import { apiAdapter } from '../../../core/adapters/apiAdapter';
import { Toast } from 'primereact/toast';

import ConfirmSolicitudDialog from '@/presentation/features/admin/admin-usuario/components/ConfirmSolicitudDialog/ConfirmSolicitudDialog';


const RestringedPage = () => {



    const [loading, setLoading] = useState(false);
    const { logout, user, me } = useAuth();
    const toast = useRef(null);
    const [visibleConfirmDialog, setVisibleConfirmDialog] = useState(false)
    const toggleDialog = (value) => {
        setVisibleConfirmDialog(value)
    }
    const hideDialog = () => {
        toggleDialog(false)
    }
    const showDialog = () => {
        toggleDialog(true)
    }


    const handleLogout = async () => {
        const response = await logout();
        if (response) {
            history.navigate('/login', { replace: true });
        }
    };
    const submit = async () => {


        try {
            const response = await apiAdapter.post(`${process.env.REACT_APP_API_BASE_URL}SolicitudUsuario/${user?.id}`);
            console.log('Datos enviados:', response);
            // await logout();
            return response
        } catch (error) {
            console.log('Error en el envío:', error);
            return { success: false }
        }
    };

    const handleStatusChange = async () => {
        const response = await submit()

        if (response?.success) {
            await me()
            setLoading(true);

            console.log('API Response:', response); // Verifica la respuesta de la API
            toast.current.show({
                severity: 'success',
                summary: 'Solicitud enviada',
                detail: 'Tu solicitud se ha enviado exitosamente',
                life: 3000,
            });
            // await handleLogout();
            setLoading(false);
            
        } else {
            
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Unable to update the affiliate status',
                life: 3000,
            });
            setLoading(false);

        }
        return response

    };

    return (
        <div className={styles.dashboard}>
            <Toast ref={toast} />
            <main className={styles.mainContent}>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2>Cuenta Inactiva</h2>
                    </div>

                    <div className={styles.cardBody}>
                        <p className={styles.description}>
                            Tu cuenta está pendiente de activación. Para más detalles, contáctanos.
                        </p>

                        <section className={styles.instructions}>
                            <h3>
                                <span className={styles.icon}>📍</span>
                                INDICACIONES
                            </h3>
                            <ul>
                                <li>
                                    Depositar la cantidad de <span className={styles.highlight}>S/. 118</span>
                                </li>
                                <li>
                                    Enviar el comprobante a este numero <span className={styles.highlight}>920517220</span>
                                </li>
                            </ul>
                            <p className={styles.note}>
                                La cuenta se activará hasta 24h después de la transferencia o 48h de la transferencia interbancaria
                            </p>
                        </section>

                        <section className={styles.payment}>
                            <h3>PAGOS</h3>
                            <div className={styles.bankDetails}>
                                <h4>BCP: ADB CONSULTING SAC</h4>
                                <div className={styles.accountInfo}>
                                    <div className={styles.accountRow}>
                                        <span className={styles.label}>Cuenta Corriente SOLES:</span>
                                        <span className={styles.value}>194-2659964-0-21</span>
                                    </div>
                                    <div className={styles.accountRow}>
                                        <span className={styles.label}>CCI Moneda Nacional:</span>
                                        <span className={styles.value}>002-19400265996402191</span>
                                    </div>
                                    <div className={styles.accountRow}>
                                        <span className={styles.label}>Yape:</span>
                                        <span className={styles.value}>920517220</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className={styles["container-buttons-actions"]}>

                            <button className={styles.actionButton} onClick={handleLogout}>Cerrar Sesión</button>

                            {(user?.estado_solicitud !== 2 && user?.estado_solicitud == "1") && (
                                <button className={styles.actionButton} onClick={showDialog} disabled={loading} >Enviar solicitud </button>
                            )}
                            <ConfirmSolicitudDialog onConfirm={handleStatusChange} onCancel={hideDialog} visible={visibleConfirmDialog} setVisible={toggleDialog} />

                        </div>



                    </div>
                </div>
            </main>
        </div>
    );
}

export default RestringedPage;