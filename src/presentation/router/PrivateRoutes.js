import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/VistaAdmin/tabla';
import Admin from '../pages/VistaAdmin/Admin';
import SubAfiliados from '../pages/VistaAdmin/SubAfiliados';
import SubLocales from '../pages/VistaAdmin/SubLocales';
import Promociones from '../pages/VistaAdmin/Promociones';
import Configuraciones from '../pages/VistaAdmin/ConfigProfile/Configuraciones';
import ClinicaPage from '../pages/VistaAdmin/Clinicas/ClinicaPage';
import { ClinicaProvider } from '../context/ClinicaContext/ClinicaContext';
import Sidebar from '../pages/AdminUsuario/Navar';
import Navbar from '../pages/AdminUsuario/Navar/Navar';

const PrivateRoutes = ({isSidebarOpen,toggleSidebar,logout,idUsuario}) => {
    return (<>
        <Navbar />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onLogout={logout} idUsuario={idUsuario}/>
        <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <Routes>

                <Route path='/Home' element={<Home />} />
                <Route path='/Afiliados' element={<Admin />} />
                <Route path='/SubAfiliados' element={<SubAfiliados />} />
                <Route path='/SubLocal' element={<SubLocales />} />
                {/* <Route path='/Admin' element={<Admin />} /> */}
                <Route path='/Promociones' element={<Promociones />} />
                <Route path='/Configuraciones' element={<Configuraciones />} />
                <Route path='/Clinicas' element={<ClinicaProvider><ClinicaPage /></ClinicaProvider>} />
               


            </Routes>

        </div>

    </>

    );
};

export default PrivateRoutes
