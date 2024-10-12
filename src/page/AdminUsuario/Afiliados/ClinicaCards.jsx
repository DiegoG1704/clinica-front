import React from 'react';
import { Card } from 'primereact/card';
import { Rating } from 'primereact/rating';
import '../Afiliados/css/ClinicaCards.css';

export default function ClinicaCards() {
    // Datos de ejemplo para las clínicas
    const clinicas = [
        {
            id: 1,
            nombre: 'En laboratorio',
            imagen: 'https://img.freepik.com/fotos-premium/clases-quimica-cientifica-joven-estudiante-laboratorio_530697-57312.jpg', // Cambia esta ruta por la ruta correcta
            calificacion: 4.5,
            precio: 70,
            logo: 'https://queplan.pe/assets/images/logos/clinica-ricardo-palma.png', // Icono o logo
        },
        {
            id: 2,
            nombre: 'Clínica Delgado',
            imagen: 'https://walkertexaslawyer.com/wp-content/uploads/2023/01/medical-doctor.jpg',
            calificacion: 3.5,
            precio: 50,
            logo: 'https://consultoriovirtual.clinicainternacional.com.pe/images/logo.png',
        },
        {
            id: 3,
            nombre: 'Consulta médica',
            imagen: 'https://ghc.com.mx/wp-content/uploads/2020/10/close-up-of-female-doctors-during-medical-treatment-of-patient-in-hospital-scaled-e1603929428488-625x417.jpg',
            calificacion: 4.8,
            precio: 20,
            logo: 'https://asdf.amerins.com/uploads/logo_sanna_a3f0989f25.png',
        },
    ];

    return (
        <div className="cards-container">
            {clinicas.map((clinica) => (
                <Card
                    key={clinica.id}
                    title={clinica.nombre}
                    subTitle={<Rating value={clinica.calificacion} readOnly stars={5} cancel={false} />}
                    style={{ width: '400px',height:'550px', marginRight: '2rem' }}
                    header={<img alt={clinica.nombre} src={clinica.imagen}  style={{width:'100%',height:'402px'}}/>}
                    footer={
                        <div className="card-footer">
                            <div className="precio">${clinica.precio} Descuento</div>
                            <img src={clinica.logo} alt="logo" className="clinica-logo" />
                        </div>
                    }
                >
                </Card>
            ))}
        </div>
    );
}
