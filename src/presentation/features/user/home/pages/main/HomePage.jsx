import Carrousel from '@/presentation/pages/AdminUsuario/Afiliados/Carousel ';
import ClinicasCarousel from '@/presentation/pages/AdminUsuario/Afiliados/componentes/ClinicasCarousel';
import Footer from '@/presentation/pages/AdminUsuario/Afiliados/componentes/home/footer';
import Header from '@/presentation/pages/AdminUsuario/Afiliados/componentes/home/header';
import { Button } from 'primereact/button';
import React from 'react'
import { Helmet } from 'react-helmet';
import { Navigate } from 'react-router-dom';
import "./styles/home.module.css";
import clinica from '@/presentation/img/clinica.png';
import arrows from '@/presentation/img/arrows.png';

const HomePage = () => {
    return (
        <>
            <Helmet>
                <title>Afiliados - MásSalud | Programa de Afiliación de Clínicas y Usuarios</title>
                <meta name="description" content="Únete al programa de afiliación de MásSalud. Obtén descuentos exclusivos como usuario afiliado y disfruta de precios promocionales en clínicas asociadas. Conoce cómo las clínicas pueden actualizar sus tarifas y ofrecer mejores precios a los usuarios." />
                <meta name="keywords" content="afiliación de usuarios, descuentos en clínicas, tarifas promocionales, clínicas asociadas, promociones médicas, usuarios afiliados, precios exclusivos, tarifas de clínicas, programa de afiliación, promociones de salud, tarifas promocionales, descuentos médicos, clínicas de salud, precios en salud, beneficios para usuarios, programas de salud, precios especiales para afiliados, ahorro en clínicas, tarifas de médicos, precios con descuento, clínicas en línea, salud accesible, promociones de bienestar" />
                <meta property="og:title" content="Afiliados - MásSalud | Programa de Afiliación de Clínicas y Usuarios" />
                <meta property="og:description" content="Con MásSalud, los usuarios afiliados obtienen precios promocionales y descuentos exclusivos en clínicas asociadas. Descubre cómo unirte a nuestro programa y acceder a tarifas más bajas para tus tratamientos médicos." />
                <meta property="og:image" content="https://www.massalud.com.pe/img/logo-inicio3.png" />
                <meta property="og:url" content="hhttps://massalud.org.pe" />
            </Helmet>

            <div className="">
                <Header />
                <Carrousel />
               
                <ClinicasCarousel />
                <div className={["mas-salud-container"]}>
                    {/* Sección superior - slides*/}
                    <section className={"hero-section"}>
                        <div className="hero-content">
                            <span className='RedClin'>MásSalud,<br></br> al alcance de todos...</span><br></br>
                            <Button label='¡Únete ahora!' className='Invitacion' onClick={() => Navigate('/Register')} /><br></br>
                            <span className='oracion'>Conoce cómo se forma la iniciativa MásSalud y nuestra meta con la comunidad</span>
                        </div>
                        <div className="hero-video">
                            <iframe
                                src="https://www.youtube.com/embed/pKOWVHCfVUk" // Reemplaza [VIDEO_ID] con el ID del video
                                title="MásSalud Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </section>

                    {/* Sección de opciones de usuario */}
                    <section className="options-section">
                        <span className='title4'>¿Quieres unirte a MásSalud?</span>
                        <span className="title1">conviértete en...</span>
                        <div className="options-container">
                            <div className="option">
                                <h2>Usuarios</h2>
                                <p>
                                    Como Usuario tendrás acceso exclusivo a los <span className="highlight1">precios más competitivos</span> del
                                    mercado de salud privada. Contarás con una red de clínicas a tu respaldo para cualquier emergencia y/o consulta.
                                </p>
                            </div>
                            <div className="option arrows">
                                {/* <img src={arrows} alt="Flechas" /> */}
                            </div>
                            <div className="option">
                                <h2>Promotor</h2>
                                <p>
                                    Si eres Promotor de MásSalud podrás acceder al <span className="highlight1">modelo de negocio</span> que está
                                    revolucionando el mercado, no solo precios y servicios exclusivos, además, podrás afiliar a todos tus amigos y
                                    cuidar de su salud.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Sección de clínicas */}
                    <section className="clinics-section">
                        <div className="clinics-content">
                            <div>
                                <img src={clinica} alt="Clínica" />
                            </div>
                            <div className="clinics-info">
                                <h4>¿Eres una clínica?</h4>
                                <p>
                                    En MásSalud tenemos espacio para todos y, como parte de nuestra iniciativa estamos siempre en busca de ampliar
                                    nuestra <span className="highlight1">red de clínicas</span>.
                                </p>
                                <Button label='¡Únete aqui!' className='Invitacion' onClick={() => Navigate('/Contacto')} /><br></br>
                            </div>
                        </div>
                    </section>
                </div>


                <Footer />
            </div>
        </>
    );
}

export default HomePage
