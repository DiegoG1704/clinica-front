import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Importa Axios
import { Card } from 'primereact/card';
import { Rating } from 'primereact/rating';
import '../Afiliados/css/ClinicaCards.css';
import user from '../../../img/sinLogo.png';
import img from '../../../img/sinImg.png';

export default function CardTop({valores}) {

    return (
        <div className="cards-container">
            {valores.map((clinica) => (
                <Card
                    key={clinica.id}  // Usamos clinica.id como clave
                    title={clinica.nombre}  // Muestra el nombre de la promoción o clínica
                    subTitle={
                        <Rating 
                            value={clinica.calificacion} 
                            readOnly 
                            stars={5} 
                            cancel={false} 
                        />
                    }
                    style={{ width: '400px', height: '550px', marginRight: '2rem' }}
                    header={
                        <img
                            src={clinica.imagen ? `${process.env.REACT_APP_API_BASE_URL}uploads/${clinica.imagen}` : img}
                            alt="Imagen de promoción"
                            style={{ width: '100%', height: '402px', objectFit: 'cover' }}
                        />
                    }
                    footer={
                        <div className="card-footer">
                            <div className="precio">{clinica.descuento}% Descuento</div>
                            <img
                                src={clinica.IsoTipo ? `${process.env.REACT_APP_API_BASE_URL}uploads/${clinica.IsoTipo}` : user}
                                alt="logo de la clínica"
                                className="clinica-logo"
                            />
                        </div>
                    }
                >
                </Card>
            ))}
        </div>
    );
}
