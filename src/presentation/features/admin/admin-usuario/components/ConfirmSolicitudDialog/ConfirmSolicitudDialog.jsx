
import { ConfirmDialog } from "primereact/confirmdialog"
import { useState } from "react"
import styles from "../ConfirmSolicitudDialog/styles/ConfirmSolicitudDialog.module.css"
import { Button } from "primereact/button"
import { classNames } from "primereact/utils"

const ConfirmSolicitudDialog = ({ onConfirm, onCancel, visible, setVisible }) => {

    const accept = () => {
        onConfirm()
        setVisible(false)
    }

    const reject = () => {
        onCancel()
        setVisible(false)
    }

    return (
        <ConfirmDialog
            visible={visible}
            onHide={() => setVisible(false)}
            message={
                <div className={styles.dialogContent}>
                    <div className={styles.iconContainer}>
                        <i className={classNames("pi pi-envelope", styles.envelopeIcon)}></i>
                    </div>
                    <h2 className={styles.dialogTitle}>¿Listo para enviar tu solicitud?</h2>
                    <p className={styles.dialogText}>Antes de proceder, asegúrate de haber completado los siguientes pasos:</p>
                    <ul className={styles.checkList}>
                        {/* <li>
                        <i className="pi pi-check-circle"></i>
                        Completado todos los campos requeridos
                    </li> */}
                        <li>
                            <i className="pi pi-check-circle"></i>
                            Enviado el voucher con el monto al WhatsApp
                        </li>
                        <li>
                            <i className="pi pi-check-circle"></i>
                            Revisado que toda la información sea correcta
                        </li>
                    </ul>
                    <p className={styles.dialogNote}>Una vez enviada, la solicitud será respondida en un plazo máximo de 24 horas.</p>
                </div>
            }
            header="Confirmación de Solicitud"
            // icon="pi pi-exclamation-triangle"
            accept={accept}
            reject={reject}
            acceptClassName={`p-button-primary ${styles.confirmButton}`}
            rejectClassName="p-button-secondary"
            acceptLabel="Sí, enviar"
            rejectLabel="Cancelar"
        />
    )
}

export default ConfirmSolicitudDialog
