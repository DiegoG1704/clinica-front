import React, { useState } from 'react'; // Asegúrate de importar useState
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import '../Afiliados/css/ClinicaCards.css';
import user from '../../../img/sinLogo.png';
import img from '../../../img/sinImg.png';
import Tarifas from './Dialog/Tarifas';

export default function ClinicaCards({ Ancho, Alto, Margen, Display, Promociones, Admin }) {
    const [admin, setAdmin] = useState(Admin); // Estado para admin
    const [open, setOpen] = useState(false);
    const [selectedClinica, setSelectedClinica] = useState(null); // Estado para almacenar la clínica seleccionada

    const handleButtonClick = (clinica) => {
        setSelectedClinica(clinica); // Guardar la clínica seleccionada
        setOpen(true); // Abrir el diálogo
    };

    return (
        <div className="cards-container">
            {Promociones.length > 0 ? (
                Promociones.map((clinica) => (
                    <Card
                        key={clinica.id}
                        title={clinica.area}
                        style={{ width: Ancho, height: Alto, marginRight: Margen }}
                        header={
                            <div className='flex'>
                                <img 
                                    src={clinica.IsoTipo ? `${process.env.REACT_APP_API_BASE_URL}uploads/${clinica.IsoTipo}` : img} 
                                    alt="Logo de la clínica"
                                    style={{
                                        width: '40%', 
                                        height: '300px', 
                                        objectFit: 'cover',  // Mantiene la imagen dentro del contenedor sin distorsionarse
                                        objectPosition: 'center', // Asegura que la imagen esté centrada si se recorta
                                    }} 
                                />
                                <div style={{display: 'flex', flexDirection: 'column', margin:'20px'}}>
                                    <span style={{color:'#C4DD26', fontSize:'23px', fontWeight:'bold'}}>{clinica.nombre}</span>
                                    <p>Somos la red de salud más grande del país y te ofrecemos productos de salud según tu estilo de vida y necesidades.</p>
                                    <div style={{margin:'10px',display:'flex',flexDirection:'column'}}>
                                        <span style={{fontWeight:'bold', fontSize:'15px'}}>Telefono:</span>
                                        <span>{clinica.telefonos}</span>
                                        <span style={{fontWeight:'bold', fontSize:'15px'}}>Direccion:</span>
                                        <span>{clinica.direccion}</span>
                                    </div>
                                </div>
                            </div>
                        }
                    >
                        <div className="button-container">
                            <Button 
                                label='Tarifas' 
                                style={{
                                    width: '200px', 
                                    background: '#176ABC', 
                                    borderColor: '#176ABC', 
                                    color: 'white'
                                }} 
                                onClick={() => handleButtonClick(clinica)} // Actualizar clínica seleccionada
                            />
                        </div>
                    </Card>
                ))
            ) : (
                <p>No se encontraron promociones.</p> // Mensaje si no hay resultados
            )}
            <Tarifas 
                Visible={open} 
                Close={() => setOpen(false)} 
                clinica={selectedClinica} // Pasar la clínica seleccionada al componente Tarifas
            />
        </div>
    );
}
