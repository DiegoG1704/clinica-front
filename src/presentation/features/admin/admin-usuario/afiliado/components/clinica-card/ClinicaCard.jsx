import { Button } from "primereact/button"
import { Card } from "primereact/card"
import styles from '@/presentation/features/admin/admin-usuario/afiliado/components/clinica-card/styles/ClinicaCard.module.css'; // Importa el archivo CSS

const ClinicaCard = ({ clinica, fnTarifas, defImage }) => {

    const headerTemplate = (
        <div className={styles['card-header']}>
            <div className={styles['logotipo-container']} >
                <div >
                    <img
                        src={clinica.IsoTipo ? `${process.env.REACT_APP_API_BASE_URL}uploads/${clinica.IsoTipo}` : defImage}
                        alt="Logo de la clínica"
                        className={styles['logotipo']}
                    />
                </div>
            </div>


            <div className={styles['card-info']}>
                <span className={styles['clinica-nombre']}>{clinica.nombre}</span>
                <div className={styles['clinica-detalles']}>
                    <p> <span className={styles['clinica-detalle-titulo-icon']}><i className="pi pi-phone"></i></span>
                        <span className={styles['clinica-detalle-titulo']}>{clinica.telefonos}</span></p>
                    <p>
                        <span className={styles['clinica-detalle-titulo-icon']}><i className="pi pi-map-marker"></i></span>
                        <span className={styles['clinica-detalle-titulo']}>{clinica.direccion}</span>
                    </p>

                </div>
                <div className={styles['button-container']}>
                    <Button
                        label='Tarifas'
                        style={{
                            width: '100%',
                            marginTop: '1rem',
                        }}
                        onClick={fnTarifas} // Actualizar clínica seleccionada
                    ></Button>
                </div>
            </div>
        </div>)

    return (
        <div>
            <Card
                key={clinica.id}
                title={clinica.area}
                className={styles['CardTarifario']}
                header={headerTemplate}

            >

            </Card>
        </div>
    )
}

export default ClinicaCard
