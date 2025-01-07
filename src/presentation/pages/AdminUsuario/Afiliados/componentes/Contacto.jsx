import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import Header from './home/header';
import Footer from './home/footer';
import imagen from '../../../../img/CCC.png'
import './../css/Contacto.css'

export default function Contacto() {
    const navigate = useNavigate();
    
    return (
        <>
            <Header />
            <div className='Section2 mt-6'>
                    <span className='title5'>¿Tienes dudas?</span>
                    <span className="RedClin">Contactanos</span>
                    {/* <span className='title5'>¿Deseas saber mas?</span> */}
                </div>
            <div className="contact-container">
                

                <div className="contact-section">
                    {/* Sección de detalles de contacto */}
                    <div className="contactSection">
                        <span className="contact-section-title">Sigamos en contacto</span>
                        <Card className="contact-card">
                            <div className="contact-details">
                                <span className="text-blue-800 text-lg">
                                    <i className="pi pi-phone font-bold" style={{ color: "#1B4B73" }}></i> +51 920 517 220
                                </span>
                                <span className="text-blue-800 text-lg">
                                    <i className="pi pi-envelope font-bold" style={{ color: "#1B4B73" }}></i> administracion@massalud.org.pe
                                </span>
                                <span className="text-blue-800 text-lg">
                                    <i className="pi pi-envelope font-bold" style={{ color: "#1B4B73" }}></i> enriquedonohue@massalud.org.pe
                                </span>
                            </div>
                        </Card>
                        <span className="contact-section-title">¡Síguenos en todas nuestras redes sociales!</span>

                        <div className="social-buttons">
                            <Button
                                icon="pi pi-instagram"
                                className="EnlacesClin"
                                onClick={() => window.open("https://www.instagram.com/massalud_adb/", "_blank")}
                            />
                            <Button
                                icon="pi pi-youtube"
                                className="EnlacesClin"
                                onClick={() => window.open("https://www.youtube.com/@info_M%C3%A1sSalud", "_blank")}
                            />
                        </div>
                    </div>

                    {/* Sección de imagen */}
                    <div className="imageSection">
                        <img src={imagen} alt="Imagen de contacto" />
                    </div>
                </div>
            </div>


            <Footer />
        </>
    )
}
