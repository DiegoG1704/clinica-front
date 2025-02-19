import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import styles from "../PromotorUpgradeDialog/styles/PromocionesUpgrateDialog.module.css"
import CustomDialog from '@/presentation/components/Dialog/CustomDialog'

const PromotorUpgradeDialog = ({ visible, setVisible, submit, checked, setChecked, setOpenTC }) => {

    const onSubmit = async () => {
        await submit()
        hideDialog()


    }


    const footerTemplate = (<div className={styles['actions']}>
        <Button
            label="Enviar solicitud"
            onClick={onSubmit}
            className="p-button-primary"
            disabled={!checked}

        />
        <Button label="Cancelar" onClick={() => setVisible(false)} className="p-button-secondary" />
    </div>)


    const headerTemplate = (<><h2 className={styles['promotor-title']}>Cambio de rol a Promotor</h2>
        <p className={styles['promotor-subtitle']}>Para cambiar de rol a Promotor debe seguir los pasos</p></>)

    const hideDialog = () => {
        setChecked(false)
        setVisible(false)
    }




    return (
        <CustomDialog
            visible={visible} onhide={() => setVisible(false)}
            style={{ width: '500px' }}
            footer={footerTemplate}
            header={headerTemplate}
        >
            <div className={styles['promotor-content']}>


                <div className={styles['steps-section']}>
                    <div className={styles['steps-header']}>PASOS</div>
                    <div className={styles['step-item']}>
                        Depositar la cantidad de <span className={styles['amount']}>S/. 59</span>
                    </div>
                    <div className={styles['step-item']}>
                        Enviar el comprobante a este número <span className={styles['amount']}>920517220</span>
                    </div>
                    <div className={styles['step-item']}>
                        La cuenta se activará hasta 24h después de la transferencia o 48h de la transferencia interbancaria
                    </div>
                </div>

                <div className={styles['payment-section']}>
                    <div className={styles['payment-title']}>PAGOS</div>
                    <div className={styles['account-info']}>
                        <div className={styles['account-row']}>
                            <span className={styles['account-label']}>BCP:</span>
                            <span className={styles['account-value']}>ADB CONSULTING SAC</span>
                        </div>
                        <div className={styles['account-row']}>
                            <span className={styles['account-label']}>Cuenta Corriente SOLES:</span>
                            <span className={styles['account-value']}>194-2659964-0-21</span>
                        </div>
                        <div className={styles['account-row']}>
                            <span className={styles['account-label']}>CCI Moneda Nacional:</span>
                            <span className={styles['account-value']}>002-19400265996402191</span>
                        </div>
                        <div className={styles['account-row']}>
                            <span className={styles['account-label']}>Yape:</span>
                            <span className={styles['account-value']}>920517220</span>
                        </div>
                    </div>
                </div>

                <div className={styles['notice']}>
                    Si ya seguiste los seguiste los pasos, acepta los terminos y condiciones y presiona "Enviar solicitud".
                </div>

                <div className={styles['terms']}>
                    <Checkbox
                        onChange={e => { setChecked(e.checked) }}
                        checked={checked}
                        className="mr-2"
                    />
                    <p className="text-sm">
                        Al registrarte aceptas haber leído y estar de acuerdo con la
                        <span onClick={() => setOpenTC(true)} className="text-blue-600 font-bold cursor-pointer"> Política de Privacidad y los Términos y Condiciones</span>
                    </p>
                </div>


            </div>
        </CustomDialog>
    )
}

export default PromotorUpgradeDialog