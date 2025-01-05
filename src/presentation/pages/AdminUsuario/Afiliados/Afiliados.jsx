import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet'; // Importar react-helmet
import { Button } from 'primereact/button';
import { Link, useNavigate } from 'react-router-dom';
import Carrousel from './Carousel ';
import { InputText } from 'primereact/inputtext';
import ClinicaCards from './ClinicaCards';
import axios from 'axios';
import '../Afiliados/css/Afiliados.css';
import logo from '../../../img/logo-inicio.png';
import clinica from '../../../img/clinica.png';
import arrows from '../../../img/arrows.png';
import ClinicasCarousel from './componentes/ClinicasCarousel';
import Footer from './componentes/home/footer';
import Header from './componentes/home/header';


export default function Afiliados() {
    const navigate = useNavigate();

    const [IsoTipo, setIsoTipo] = useState([]); // Estado para almacenar los isotipos
    const [promociones, setPromociones] = useState([]);
    const [top, setTop] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para controlar la carga de los datos

    useEffect(() => {
        // Retrasar la carga de los datos para simular un loading de 10 segundos
        const timeout = setTimeout(() => {
            setLoading(false); // Cambiar el estado de loading después de 5 segundos
        }, 5000); // 5 segundos

        const fetchIsoTipo = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}GetPagHome`);
                const { Img } = response.data; // URL para obtener isotipos
                setIsoTipo(Img); // Almacena los isotipos en el estado
                const { Promociones } = response.data;
                setPromociones(Promociones);
                const { Listatop } = response.data;
                setTop(Listatop);
            } catch (error) {
                console.error('Error al obtener los isotipos:', error);
            }
        };

        fetchIsoTipo(); // Ejecuta la función de obtención de datos

        // Limpiar el timeout al desmontar el componente
        return () => clearTimeout(timeout);
    }, []);

    const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar promociones

    // Filtrar promociones según el término de búsqueda
    const filteredPromociones = promociones.filter(promocion =>
        promocion.area.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

                {/* <section className='buscador'>
                    <p className='text'>Encuentra los mejores descuentos y promociones médicas en un solo lugar</p>
                    <InputText
                        placeholder="Buscar..."
                        className='buscer'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </section>

                <section>
                    <ClinicaCards Ancho={'80%'} Alto={'320px'} Margen={'0px'} Promociones={IsoTipo} Admin={false} />
                </section> */}
                <ClinicasCarousel datos={IsoTipo} />
                <div className="mas-salud-container">
                    {/* Sección superior - slides*/}
                    <section className="hero-section">
                        <div className="hero-content">
                            <span className='RedClin'>MásSalud,<br></br> al alcance de todos...</span><br></br>
                            <Button label='¡Únete ahora!' className='Invitacion' /><br></br>
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
                                <h2>Afiliado</h2>
                                <p>
                                    Como Afiliado tendrás acceso exclusivo a los <span className="highlight1">precios más competitivos</span> del
                                    mercado de salud privada. Contarás con una red de clínicas a tu respaldo para cualquier emergencia y/o consulta.
                                </p>
                            </div>
                            <div className="option arrows">
                                <img src={arrows} alt="Flechas" />
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
                                <Button label='¡Únete aqui!' className='Invitacion' /><br></br>
                            </div>
                        </div>
                    </section>
                </div>

                {/* <footer className='Barra'>
                    <div className='Informacion'>
                        <h2>Sobre Nosotros</h2>
                        <p>Conoce el porqué de nuestra iniciativa y quién la crea. Conoce nuestras redes sociales. Mantente conectado.</p>
                        <div className='iconos'>
                            <p><i className="pi pi-facebook" style={{ color: 'white' }}></i></p>
                            <p><i className="pi pi-instagram" style={{ color: 'white' }}></i></p>
                            <p><i className="pi pi-youtube" style={{ color: 'white' }}></i></p>
                            <p><i className="pi pi-linkedin" style={{ color: 'white' }}></i></p>
                        </div>
                    </div>
                    <div className='Link'>
                        <h2>Links de Acceso Rápido</h2>
                        <p><i className="pi pi-play" style={{ color: 'white' }}></i>inicio</p>
                        <p><i className="pi pi-play" style={{ color: 'white' }}></i>Nosotros</p>
                        <p><i className="pi pi-play" style={{ color: 'white' }}></i>Contacto</p>
                        <p><i className="pi pi-play" style={{ color: 'white' }}></i>Conócenos</p>
                    </div>
                </footer> */}
                <Footer />
            </div>
        </>
    );
}
