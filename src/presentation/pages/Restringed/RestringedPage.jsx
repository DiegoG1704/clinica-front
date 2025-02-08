import React, { useRef, useState } from 'react';
import styles from "./restringed-page.module.css";
import { useAuth } from '../../context/AuthContext/AuthContext';
import { history } from '../../utils/history';
import { apiAdapter } from '../../../core/adapters/apiAdapter';
import { Toast } from 'primereact/toast';


const RestringedPage = () => {



    const [loading, setLoading] = useState(false);
    const { logout, user } = useAuth();
    const toast = useRef(null);

    const handleLogout = async () => {
        const response = await logout();
        if (response) {
            history.navigate('/login', { replace: true });
        }
    };

    const handleStatusChange = async () => {
        try {
            console.log("Changing status for affiliate ID:", user?.id); // Verifica el ID
            const response = await apiAdapter.put(`/CambioEstado/${user?.id}`);
            setLoading(true);
            console.log('API Response:', response); // Verifica la respuesta de la API
            toast.current.show({
                severity: 'success',
                summary: 'Status Updated',
                detail: 'The affiliate status has been updated to Active',
                life: 3000,
            });
            await handleLogout();
            setLoading(false);
        } catch (error) {
            console.error('Error updating status:', error);
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Unable to update the affiliate status',
                life: 3000,
            });
            setLoading(false);
        }
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
                            {/* <button className={styles.actionButton} onClick={handleStatusChange} disabled={loading} > Cambiar Rol</button> */}
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}

export default RestringedPage;
