import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Importa Axios
import { Card } from 'primereact/card';
import { Rating } from 'primereact/rating';
import '../Afiliados/css/ClinicaCards.css';
import user from '../../../img/sinLogo.png'
import img from '../../../img/sinImg.png'

export default function CardTop() {
    const [clinicas, setClinicas] = useState([]); // Estado para almacenar las clínicas

    useEffect(() => {
        const fetchClinicas = async () => {
            try {
                const response = await axios.get('http://localhost:4000/getPromocionesTop'); // Cambia esta URL según tu configuración
                setClinicas(response.data); // Almacena las clínicas en el estado
            } catch (error) {
                console.error('Error al obtener las promociones:', error);
            }
        };
        fetchClinicas();
    }, []);

    return (
        <div className="cards-container">
            {clinicas.map((clinica) => (
                <Card
                    key={clinica.id}
                    title={clinica.area}
                    subTitle={<Rating value={clinica.calificacion} readOnly stars={5} cancel={false} />}
                    style={{ width: '400px', height: '550px', marginRight: '2rem' }}
                    header={<img src={clinica.imagen ? `http://localhost:4000/uploads/${clinica.imagen}` : img} style={{ width: '100%', height: '402px' }} />}
                    footer={
                        <div className="card-footer">
                            <div className="precio">{clinica.descuento}% Descuento</div>
                            <img src={clinica.IsoTipo ? `http://localhost:4000/uploads/${clinica.IsoTipo}` : user} alt="logo" className="clinica-logo" />
                        </div>
                    }
                >
                </Card>
            ))}
        </div>
    );
}
