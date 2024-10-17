import React from 'react'; 
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Navbar from './Navar/Navar';
import './Index.css'; // Asegúrate de importar el archivo CSS
import { useNavigate } from 'react-router-dom';

export default function Index() {
    const navigate = useNavigate();
    const informacion = [
        {
            "logo": "https://scontent.flim41-1.fna.fbcdn.net/v/t39.30808-6/277586895_4804576739591454_101722567967770323_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGyRU6Tj9jM3rvYCyeTSUAzhO5Q7yBg_92E7lDvIGD_3YAxWnj65gLZzNjGde46She_oPoeqVyEm8oQ0EoE0CQH&_nc_ohc=Ua_Ob_0hFhwQ7kNvgF4L09M&_nc_ht=scontent.flim41-1.fna&_nc_gid=ABir4xEzKxCbwcrGzW-YhKe&oh=00_AYDBO65H0BYHGB-HPKi-zB41WyKCrUOg8S0rH9LTxdrbTA&oe=66FD1ADC",
            "nombre": "Clínica San Miguel",
            "direccion": "Las Gardenias 754-760",
            "descripcion": "Somos la primera Clinica en salud del distrito San Juan de Lurigancho categorizado como nivel II – 2, altamente especializado. Contamos con un distinguido staff médico y un selecto grupo de profesionales y técnicos en salud, los cuales ofrecen servicios de la más alta calidad, confiabilidad y con la mayor calidez, utilizando la tecnología médica más avanzada y una moderna infraestructura."
        },
        {
            "logo": "https://scontent.flim41-1.fna.fbcdn.net/v/t39.30808-6/277586895_4804576739591454_101722567967770323_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGyRU6Tj9jM3rvYCyeTSUAzhO5Q7yBg_92E7lDvIGD_3YAxWnj65gLZzNjGde46She_oPoeqVyEm8oQ0EoE0CQH&_nc_ohc=Ua_Ob_0hFhwQ7kNvgF4L09M&_nc_ht=scontent.flim41-1.fna&_nc_gid=ABir4xEzKxCbwcrGzW-YhKe&oh=00_AYDBO65H0BYHGB-HPKi-zB41WyKCrUOg8S0rH9LTxdrbTA&oe=66FD1ADC",
            "nombre": "Clínica San Miguel",
            "direccion": "Las Gardenias 754-760",
            "descripcion": "Somos la primera Clinica en salud del distrito San Juan de Lurigancho categorizado como nivel II – 2, altamente especializado. Contamos con un distinguido staff médico y un selecto grupo de profesionales y técnicos en salud, los cuales ofrecen servicios de la más alta calidad, confiabilidad y con la mayor calidez, utilizando la tecnología médica más avanzada y una moderna infraestructura."
        }
        // Agrega más clínicas aquí si es necesario
    ];
    
    return (
        <div>
            <Navbar />
            <div class="flex justify-content-end flex-wrap">
                <div class="flex align-items-center justify-content-center bg-primary font-bold border-round m-2">
                    <Button label='Crear Clinica'/>
                </div>
            </div>
            {informacion.map((clinica, index) => {
                return (
                    <div key={index} className="card-container">
                        <Card 
                            className="card-content"
                        >
                            <div className="card-header">
                                <img 
                                    alt="Card" 
                                    src="https://www.e-dentalsys.com/_next/static/media/bg-card.1b4023fd.jpg" 
                                    className='fondo'
                                />
                                <img 
                                    alt="Avatar" 
                                    src={clinica.logo} 
                                    className="avatar" 
                                />
                            </div>
                            <h2 className="card-title">{clinica.nombre}</h2>
                            <div className="card-body">
                                <div className="card-info">
                                    <h4>{clinica.direccion}</h4>
                                    <p className="m-0">
                                        {clinica.descripcion}
                                    </p>
                                </div>
                                <div className="card-actions flex flex-column justify-content-end flex-wrap">
                                    <Button style={{margin:'2px'}} label="Ver Afiliados" icon="pi pi-forward" onClick={()=>navigate('/Afiliados')}/>
                                    <Button style={{margin:'2px'}} label="Editar" icon="pi pi-forward" />
                                    <Button style={{margin:'2px'}} label="Eliminar" icon="pi pi-forward" />
                                    <Button style={{margin:'2px'}} label="Ver Promociones" icon="pi pi-forward" />
                                </div>
                            </div>
                        </Card>
                    </div>
                );
            })}
        </div>  
    );
}
