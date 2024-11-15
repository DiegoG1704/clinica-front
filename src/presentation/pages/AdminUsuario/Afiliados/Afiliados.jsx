import React, { useState, useEffect } from 'react';
import '../Afiliados/css/Afiliados.css';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import Carrousel from './Carousel ';
import { InputText } from 'primereact/inputtext';
import { Carousel } from 'primereact/carousel';
import ClinicaCards from './ClinicaCards';
import axios from 'axios';
import CardTop from './CardTop';
import { ProgressSpinner } from 'primereact/progressspinner'; // Importar ProgressSpinner
import logo from '../../../img/logo-inicio.png';

export default function Afiliados() {
    const navigate = useNavigate();

    const [IsoTipo, setIsoTipo] = useState([]); // Estado para almacenar los isotipos
    const [promociones, setPromociones] = useState([]);
    const [top, setTop] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para controlar la carga de los datos

    useEffect(() => {
        // Retrasar la carga de los datos para simular un loading de 10 segundos
        const timeout = setTimeout(() => {
            setLoading(false); // Cambiar el estado de loading después de 10 segundos
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

    const responsiveOptions = [
        {
            breakpoint: '1524px',
            numVisible: 3,
            numScroll: 3,
        },
        {
            breakpoint: '600px',
            numVisible: 1,
            numScroll: 1,
        },
    ];

    const clinicaslogo = (clinica) => (
        <div className="clinica-logo-container">
            <img
                src={`${process.env.REACT_APP_API_BASE_URL}uploads/${clinica.IsoTipo}`} // Cambia según tu ruta de imagen
                alt="Clinica Logo"
                className="clinica-logo"
            />
        </div>
    );

    const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar promociones

    // Filtrar promociones según el término de búsqueda
    const filteredPromociones = promociones.filter(promocion =>
        promocion.area.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="afiliados-wrapper">
            {loading ? ( // Mostrar el spinner mientras se cargan los datos
                <div className="loading-spinner">
                    <div className="spinner-logo-container">
                        <ProgressSpinner className="custom-spinner" style={{width: '200px', height: '200px',}}  strokeWidth="2" fill="var(--surface-ground)" />
                        <img src={logo} alt="Logo" className="logo-center" />
                    </div>
                </div>
            ) : (
                <>
                    <div className="afiliados-container">
                        <img
                            src='https://www.massalud.com.pe/img/logo-inicio3.png'
                            alt="Logo"
                            className="logo"
                        />
                        <div className="header-actions">
                            <div className="links-container">
                                <h1><a className="link">Inicio</a></h1>
                                <h1><a className="link">Promociones</a></h1>
                                <Button label="Sign up" onClick={() => navigate('/login')} className='loguear' />
                            </div>
                        </div>
                    </div>

            
                    <Carrousel />
                    <div className='buscador'>
                        <p className='text'>Encuentra los mejores descuentos y promociones médicas en un solo lugar</p>
                        <InputText
                            placeholder="Buscar..."
                            className='buscer'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <h1 className='mejoras'>Nuestras mejores ofertas</h1>
                        <CardTop valores={top} />
                    </div>
                    <div>
                        <Carousel
                            className='carruselclinica'
                            value={IsoTipo}
                            numVisible={4}
                            responsiveOptions={responsiveOptions}
                            numScroll={3}
                            circular
                            autoplayInterval={5000}
                            itemTemplate={clinicaslogo}
                        />
                    </div>
                    <ClinicaCards Ancho={'400px'} Alto={'550px'} Margen={'2rem'} Promociones={filteredPromociones} Admin={false} />
                    <div className='Barra'>
                        <div className='Informacion'>
                            <h2>Sobre Nosotros</h2>
                            <p>Conoce el porqué de nuestra inciativa y quién la crea. Conoce nuestras redes sociales. Mantente conectado.</p>
                            <div className='iconos'>
                                <p><i className="pi pi-facebook" style={{ color: 'white'}}></i></p>
                                <p><i className="pi pi-instagram" style={{ color: 'white'}}></i></p>
                                <p><i className="pi pi-youtube" style={{ color: 'white'}}></i></p>
                                <p><i className="pi pi-linkedin" style={{ color: 'white'}}></i></p>
                            </div>
                        </div>
                        <div className='Link'>
                            <h2>links de Acceso Rapido</h2>
                            <p><i className="pi pi-play" style={{ color: 'white' }}></i>inicio</p>
                            <p><i className="pi pi-play" style={{ color: 'white' }}></i>Nosotros</p>
                            <p><i className="pi pi-play" style={{ color: 'white' }}></i>Contacto</p>
                            <p><i className="pi pi-play" style={{ color: 'white' }}></i>Conocenos</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
