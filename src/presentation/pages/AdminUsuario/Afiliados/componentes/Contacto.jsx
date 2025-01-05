import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

import { useNavigate } from 'react-router-dom';
import Header from './home/header';
import Footer from './home/footer';

export default function Contacto() {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <div className="container">
                <div className='Section2 mt-6'>
                    <span className='title5'>¿Tienes dudas?</span>
                    <span className="RedClin">Contactanos</span>
                    {/* <span className='title5'>¿Deseas saber mas?</span> */}
                </div>

                <div className="flex flex-wrap justify-content-center align-items-center mt-6">
                    {/* Sección de contacto */}
                    <div className="flex flex-column w-full md:w-6 text-center mb-4 md:mb-0">
                        <span style={{ fontSize: '25px', color: '#176ABC' }}>Sigamos en contacto</span>
                        <span style={{ fontSize: '25px', color: '#176ABC' }}>¡Siguenos en todas nuestras redes sociales!</span>
                    </div>

                    {/* Sección de redes sociales y contacto */}
                    <div className="flex flex-column w-full md:w-6 h-15rem">
                        <Card className="w-full md:w-10 lg:w-8 mx-auto">
                            <div className="flex flex-column text-center">
                                <span className="text-blue-800">
                                    <i className="pi pi-phone" style={{ color: "#708090" }}></i> +51 920 517 220
                                </span>
                                <span className="text-blue-800">
                                    <i className="pi pi-envelope" style={{ color: "#708090" }}></i> administracion@massalud.org.pe
                                </span>
                                <span className="text-blue-800">
                                    <i className="pi pi-envelope" style={{ color: "#708090" }}></i> enriquedonohue@massalud.org.pe
                                </span>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>


            <Footer />
        </>
    )
}
