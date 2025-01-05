import { Button } from 'primereact/button';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Carrousel from './Carousel ';
import './css/informacion.css'
import CCC from '../../../img/CCC.png'
import icono from '../../../img/export.png'
import { Card } from 'primereact/card';
import Header from './componentes/home/header';
import Footer from './componentes/home/footer';

export default function Informacion() {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            {/* <Carrousel/> */}
            <div className='container'>
                <div className='Section2 mt-6'>
                <span className='title1'>Conoce</span>
                <span className='title2'>Más Sobre MásSalud</span>
                </div>
              
                <div className='Section1'>
                    <div className='Image'>
                        <img src={CCC} className='SaludCost' />
                    </div>
                    <div className='Presentacion'>
                        <span className='title3'>Servicio MásSalud</span><br></br>
                        <span className='oracion'>MásSalud ofrece acceso a precios exclusivos del sector de salud privada. Conectándote con una red de clínicas especializadas y de alta calidad a precios competitivos.
                            <br></br><br></br>Únete a MásSalud y cuida de tú salud y la de tu familia.</span>
                        <br></br>
                        <Button label='¡Únete a MásSalud!' className='Invitacion' />
                    </div>
                </div>
                <div className='Section2'>
                    <div className='titles'>
                        <span className='title5'>Pero...</span>
                        <span className='title4'>¿Que es MasSalud?</span>
                    </div>
                    <span style={{ margin: '20px' }}>Descubre quienes somos, qué hacemos y cómo estamos seguros que podemos ayudarte a ti y a tu familia</span>
                    <Button label='Descubrir' className='Invitacion' />
                </div>
                <div className='Section3'>
                    <div className='Presentacion1'>
                        <span className='title3'>¿Qué es MásSalud?</span><br></br>
                        <span className='oracion'>MásSalud es una plataforma web cuya única finalidad es acercarte a un sistema de salud de calidad a precios accesibles y exclusivos. Pensamos en tu cuidado y el de tu familia y, también, buscamos hacerte crecer mediante un programa de afiliación que te sumará muchos más beneficios</span>
                    </div>
                    <div className='Image'>
                        <img src={icono} className='Logo' />
                    </div>
                </div>
                <div className='Section5'>
                    <div className='Section4'>
                        <div className='Presentacion2'>
                            <span className='title3'>¿Quienes somos?</span><br></br><br></br>
                            <span className='oracion'>Somos un equipo comprometido con la mejora del acceso a servicios de salud en Perú. AppSalud nace de la necesidad de conectar a las personas con clínicas y centros médicos que ofrezcan tratamientos de calidad a precios accesibles. A través de nuestra plataforma, no solo te ayudamos a cuidar tu salud, sino que también te ofrecemos una manera de contribuir a la comunidad y generar ingresos adicionales como parte de nuestra red de Afiliadores.</span>
                        </div>
                        <div className='Presentacion2'>
                            <span className='title3'>¿Que hacemos?</span><br></br><br></br>
                            <span className='oracion'>En MásSalud, nos dedicamos a ofrecerte una plataforma integral donde puedes suscribirte para acceder a descuentos exclusivos en una amplia red de clínicas y centros médicos en todo el país. Además, brindamos la oportunidad a nuestros usuarios de convertirse en Promotores, un rol que les permite ganar comisiones al invitar a otros a unirse a la plataforma. Nos encargamos de todo el proceso, desde la afiliación hasta la gestión de comisiones, asegurando que nuestros usuarios puedan disfrutar de una experiencia sin complicaciones.</span>
                        </div>
                    </div>
                    <Button label='¡Únete ahora!' className='Invitacion' />
                </div>
                <div className='Section6'>
                    <div className='titles'>
                        <span className='title5'>Tenemos</span>
                        <span className='title4'>Beneficios exclusivos</span>
                        <span className='title5'>Para todos</span>
                    </div>
                    <div className='Section7'>

                        <Card className='card-afiliados'>
                            <div className='titles1'>
                                <div style={{ textAlign: 'center' }}>
                                    <span style={{ fontSize: '25px', color: 'Black' }}>Beneficios para</span><br></br>
                                    <span style={{ fontSize: '25px', color: '#85C226' }}>AFILIADOS</span>
                                </div>
                                <br></br>
                                <span className='oracion'>Busca en un solo lugar entre muchas clínicas el servicio que necesitas</span>
                                <span className='oracion'>Elige entre cientos de servicios de calidad a precios exclusivos.</span>
                                <span className='oracion'>Selecciona con facilidad la cita y asiste a tu consulta sin ningún problema.</span>
                            </div>
                            <Button className='Invitacion' label='Únete Ya' />
                        </Card>

                        <Card className='card-clinicas'>
                            <div className='titles1'>
                                <div style={{ textAlign: 'center' }}>
                                    <span style={{ fontSize: '25px', color: 'Black' }}>Beneficios para</span><br></br>
                                    <span style={{ fontSize: '25px', color: '#176ABC' }}>CLÍNICAS</span>
                                </div><br></br>
                                <span className='oracion'>Promoción y difusión de servicios en nuestra red de miembros actuales.</span>
                                <span className='oracion'>Mayor flujo de usuarios interesados en sus servicios.</span>
                                <span className='oracion'>Reducción de costos de promoción para captar usuarios de los servicios de la Clínica.</span>
                            </div>
                            <Button className='Invitacion2' label='Únete Ya' />
                        </Card>

                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}
