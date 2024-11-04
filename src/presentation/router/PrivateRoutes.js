import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/VistaAdmin/tabla';
import Admin from '../pages/VistaAdmin/Admin';
import SubAfiliados from '../pages/VistaAdmin/SubAfiliados';
import SubLocales from '../pages/VistaAdmin/SubLocales/SubLocales';
import Promociones from '../pages/VistaAdmin/Promociones';
import Configuraciones from '../pages/VistaAdmin/ConfigProfile/Configuraciones';
import ClinicaPage from '../pages/VistaAdmin/Clinicas/ClinicaPage';
import { ClinicaProvider } from '../context/ClinicaContext/ClinicaContext';
import Sidebar from '../pages/AdminUsuario/Navar';
import Navbar from '../pages/AdminUsuario/Navar/Navar';
import PromocionesLocalesPeage from '../pages/VistaAdmin/PromocionesLocales/PromocionesLocalesPage';
import PromocionesLocalesPage from '../pages/VistaAdmin/PromocionesLocales/PromocionesLocalesPage';
import { PromocionProvider } from '../context/PromocionesContext/PromocionContext';
import PromocionesLocales from '../components/AdministradorLocales/PromocionesLocales';
import { SubLocalProvider } from '../context/subLocalContext/subLocalContext';

const PrivateRoutes = ({ isSidebarOpen, toggleSidebar, logout, idUsuario }) => {
    console.log("id",idUsuario)
    return (<>
        <Navbar />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onLogout={logout} idUsuario={idUsuario} />
        <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <Routes>
                <Route path="/" element={<Navigate to="/Home" />} />
                
                <Route path='/Admin' element={<Admin />} />
                <Route path='/Promociones' element={<Promociones  />} />
                <Route path='/PromocionesLocales' element={<PromocionesLocales IdUsuario={idUsuario} />} />
                {/* <Route path='/Configuraciones' element={<Configuraciones />} /> */}
                
                <Route path='/Home' element={<Home />} />
                <Route path='/Afiliados' element={<Admin />} />
                <Route path='/SubAfiliados' element={<SubAfiliados UserId={idUsuario}/>} />
               
                <Route path='/SubLocal' element={<SubLocalProvider><SubLocales /></SubLocalProvider> } />
                
                {/* <Route path='/Admin' element={<Admin />} /> */}
                <Route path='/Promociones' element={<Promociones />} />
                <Route path='/Configuraciones' element={<Configuraciones />} />
                <Route path='/Clinicas' element={<ClinicaProvider><ClinicaPage /></ClinicaProvider>} />
                {/* <Route path='/PromocionesLocales' element={<PromocionProvider><PromocionesLocalesPage /></PromocionProvider>} /> */}





            </Routes>

        </div>

    </>

    );
};

export default PrivateRoutes
