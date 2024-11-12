import React, { useState } from 'react'; // Asegúrate de importar useState
import { Card } from 'primereact/card';
import { Rating } from 'primereact/rating';
import '../Afiliados/css/ClinicaCards.css';
import user from '../../../img/sinLogo.png';
import img from '../../../img/sinImg.png';
import { Button } from 'primereact/button';

export default function ClinicaCards({ Ancho, Alto, Margen, Display, Promociones,Admin }) {
    const [admin, setAdmin] = useState(Admin); // Estado para admin

    return (
        <div className="cards-container">
            {Promociones.length > 0 ? (
                Promociones.map((clinica) => (
                    <Card
                        key={clinica.id}
                        title={clinica.area}
                        subTitle={<Rating value={clinica.calificacion} readOnly stars={5} cancel={false} />}
                        style={{ width: Ancho, height: Alto, marginRight: Margen }}
                        header={<img src={clinica.imagen ? `${process.env.REACT_APP_API_BASE_URL}uploads/${clinica.imagen}` : img} style={{ width: '100%', height: '402px', display: Display }} />}
                        footer={
                            <div >
                                <div className="card-footer">
                                    <div className="precio">{clinica.descuento}% Descuento</div>
                                    <img src={clinica.IsoTipo ? `${process.env.REACT_APP_API_BASE_URL}uploads/${clinica.IsoTipo}` : user} alt="logo" className="clinica-logo" />
                                </div>
                                {admin && ( // Mostrar botón solo si admin es true
                                    <div className='flex justify-content-center mt-3'>
                                        <Button label='Más Información' className='bg-teal-400 border-teal-400' />
                                    </div>
                                )}
                            </div>
                        }
                    >
                    </Card>
                ))
            ) : (
                <p>No se encontraron promociones.</p> // Mensaje si no hay resultados
            )}
        </div>
    );
}
