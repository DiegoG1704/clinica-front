import React, { useRef, useState, useEffect } from 'react';
import '../Afiliados/css/Afiliados.css';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom';
import Carrousel from './Carousel ';
import { InputText } from 'primereact/inputtext';
import { Carousel } from 'primereact/carousel';
import ClinicaCards from './ClinicaCards';
import axios from 'axios';
import CardTop from './CardTop';

export default function Afiliados({ idUsuario, setIdUsuario }) {
    const menuRight = useRef(null);
    const navigate = useNavigate();
    
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [clinicasLog, setClinicasLog] = useState([
        { url: 'https://queplan.pe/assets/images/logos/clinica-ricardo-palma.png' },
        { url: 'https://consultoriovirtual.clinicainternacional.com.pe/images/logo.png' },
        { url: 'https://asdf.amerins.com/uploads/logo_sanna_a3f0989f25.png' },
        { url: 'https://mivida.sanpablo.com.pe/PortalPaciente/img/tssp/logotssp.PNG' },
        { url: 'https://www.clinicasantamaria.cl/Sitefinity/WebsiteTemplates/ClinicaSantaMaria/App_Themes/ClinicaSantaMaria/Images/clinica-santa-maria-logo.png' }
    ]);

    const [IsoTipo, setIsoTipo] = useState([]); // Estado para almacenar los isotipos

    useEffect(() => {
        const fetchIsoTipo = async () => {
            try {
                const response = await axios.get('http://localhost:4000/clinicas/isotipos'); // URL para obtener isotipos
                setIsoTipo(response.data); // Almacena los isotipos en el estado
            } catch (error) {
                console.error('Error al obtener los isotipos:', error);
            }
        };

        fetchIsoTipo();
    }, []);

    useEffect(() => {
        const fetchUsuario = async () => {
            if (idUsuario) {
                try {
                    const response = await axios.get(`https://clinica-production-baa9.up.railway.app/user/${idUsuario}`);
                    setNombreUsuario(response.data.nombres); // Ajusta según la estructura de tu API
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            } else {
                setNombreUsuario(''); // Reiniciar el nombre si no hay idUsuario
            }
        };

        fetchUsuario();
    }, [idUsuario]);

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

    const handleLogout = () => {
        setIdUsuario(null);
        navigate('/login');
    };

    const items = [
        {
            label: 'Hola, ' + (nombreUsuario || 'Usuario'),
            items: [
                {
                    label: 'Gestionar cuenta',
                    icon: 'pi pi-user',
                },
                {
                    label: 'Cerrar Sesión',
                    icon: 'pi pi-power-off',
                    command: handleLogout
                }
            ]
        }
    ];

    const clinicaslogo = (clinica) => (
        <div className="clinica-logo-container">
            <img
                src={`http://localhost:4000/uploads/${clinica.IsoTipo}`} // Cambia según tu ruta de imagen
                alt="Clinica Logo"
                className="clinica-logo"
            />
        </div>
    );

    return (
        <div className="afiliados-wrapper">
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
                        {idUsuario ? (
                            <h1><a className="link">{nombreUsuario}</a></h1>
                        ) : (
                            <Button label="Sign up" onClick={() => navigate('/login')} className='loguear' />
                        )}
                    </div>
                    {idUsuario && (
                        <>
                            <Button
                                className="user-button"
                                onClick={(event) => menuRight.current.toggle(event)}
                                aria-controls="popup_menu_right"
                                aria-haspopup
                            >
                                Usuario
                            </Button>
                            <Menu
                                model={items}
                                popup
                                ref={menuRight}
                                id="popup_menu_right"
                            />
                        </>
                    )}
                </div>
            </div>
            <Carrousel />
            <div className='buscador'>
                <p className='text'>Encuentra los mejores descuentos y promociones médicas en un solo lugar</p>
                <InputText
                    placeholder="Buscar..."
                    className='buscer'
                />
                <h1 className='mejoras'>Nuestras mejores ofertas</h1>
                <CardTop />
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
            <ClinicaCards />
        </div>
    );
}
