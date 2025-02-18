import CustomDialog from "@/presentation/components/Dialog/CustomDialog"
import { Button } from "primereact/button"
import styles from "../SolicitudEnviadaDialog/styles/SolicitudEviadaDialog.module.css"

   

const SolicitudEnviadaDialog = ({ visible, onHide }) => {
    const dialogFooter = (
        <div className={styles.dialogFooter}>
            <Button label="Cerrar" icon="pi pi-check" onClick={onHide} className={styles.closeButton} />
        </div>
    )
    return (
        <CustomDialog
            visible={visible}
            onhide={onHide} 
            footer={dialogFooter}
            header={<h2 className={styles.dialogTitle}>¡Solicitud Enviada con Éxito!</h2>}
            modal
            className={styles.customDialog}
        >
            <div className={styles.dialogContent}>
                <div className={styles.iconContainer}>
                    <i className={"pi pi-check"}></i>
                </div>
               
                <p className={styles.dialogText}>
                    Su solicitud ha sido enviada correctamente. Por favor, espere la confirmación en un plazo de 24 horas.
                </p>
                <p className={styles.dialogNote}>Gracias por su paciencia.</p>
            </div>
        </CustomDialog>
    )
}

export default SolicitudEnviadaDialog
