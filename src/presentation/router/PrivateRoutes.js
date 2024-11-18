import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/VistaAdmin/tabla';
import Admin from '../pages/VistaAdmin/Admin';
import SubAfiliados from '../pages/VistaAdmin/SubAfiliados';
import SubLocales from '../pages/VistaAdmin/SubLocales/SubLocales';
import Promociones from '../pages/VistaAdmin/Promociones';
import Configuraciones from '../pages/VistaAdmin/ConfigProfile/Configuraciones';
import ClinicaPage from '../pages/VistaAdmin/Clinicas/ClinicaPage';
import { ClinicaProvider, useClinica } from '../context/ClinicaContext/ClinicaContext';
import Sidebar from '../pages/AdminUsuario/Navar';
import Navbar from '../pages/AdminUsuario/Navar/Navar';
import PromocionesLocalesPeage from '../pages/VistaAdmin/PromocionesLocales/PromocionesLocalesPage';
import PromocionesLocalesPage from '../pages/VistaAdmin/PromocionesLocales/PromocionesLocalesPage';
import { PromocionProvider } from '../context/PromocionesContext/PromocionContext';
import PromocionesLocales from '../components/AdministradorLocales/PromocionesLocales';
import { SubLocalProvider } from '../context/subLocalContext/subLocalContext';
import SubAdmin from '../pages/VistaAdmin/SubLocales/SubAdmin';
import Login from '../pages/login/login';

const PrivateRoutes = ({ isSidebarOpen, toggleSidebar, logout, idUsuario, router }) => {
    console.log('problem', router)

    const componentMap = {
        "Home": <Home />,
        "Admin": <Admin />,
        "Afiliados": <Admin />,
        "SubAdministradores": <SubAdmin />,
        "SubAfiliados": <SubAfiliados UserId={idUsuario} />,
        "Sub-Locales": <SubLocalProvider><SubLocales /></SubLocalProvider>,
        "Promos": <PromocionesLocales />,
        "PromocionesLocales": <Promociones />,
        "Configuraciones": <Configuraciones />,
        "Clinicas": <ClinicaProvider><ClinicaPage /></ClinicaProvider>,
    };
    useEffect(() => {
        console.log('Rutas cargadas:', router);
    }, [router]);
    return (
        <>
            <Navbar />
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onLogout={logout} idUsuario={idUsuario} />
            <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <Routes>
                    
                    {/* Itera las rutas pasadas como props para generar los componentes dinámicamente */}
                    {router?.map((route) => (
                        <Route
                            key={route.id}
                            path={route.ruta}
                            element={componentMap[route.nombre] || null}
                        />
                    ))}
                    <Route path='/Configuraciones' element={<Configuraciones/>} />
                    <Route path="*" element={<Navigate to={`${idUsuario?.rutas?.[0]?.ruta}`} />} />
                   
                </Routes>

            </div>

        </>

    );
};

export default PrivateRoutes
