import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/VistaAdmin/tabla';
import Admin from '../pages/VistaAdmin/Admin';
import SubAfiliados from '../pages/VistaAdmin/SubAfiliados';
import SubLocales from '../pages/VistaAdmin/SubLocales/SubLocales';
import Promociones from '../pages/VistaAdmin/Promociones';
import Configuraciones from '../pages/VistaAdmin/ConfigProfile/Configuraciones';
import ClinicaPage from '../pages/VistaAdmin/Clinicas/ClinicaPage';
import { ClinicaProvider} from '../context/ClinicaContext/ClinicaContext';
import Sidebar from '../pages/AdminUsuario/Navar';
import Navbar from '../pages/AdminUsuario/Navar/Navar';

import PromocionesLocales from '../components/AdministradorLocales/PromocionesLocales';
import { SubLocalProvider } from '../context/subLocalContext/subLocalContext';
import SubAdmin from '../pages/VistaAdmin/SubLocales/SubAdmin';
import Login from '../pages/login/login';
import PromocionesAdmin from '../pages/VistaAdmin/Promociones/PromocionesAdmin';
import { PromocionProvider } from '../context/PromocionesContext/PromocionContext';
import { ConfiguracionProvider } from '../context/ConfiguracionContext/ConfiguracionContext';
import RestringedPage from '../pages/Restringed/RestringedPage';
import Tarifario from '../components/Afiliados/Tarifario';

const PrivateRoutes = ({ isSidebarOpen, toggleSidebar, logout, idUsuario, router, isAuthenticated, onLogin }) => {
    console.log('problem', router)

    const componentMap = {
        "Home": <Home />,
        "Admin": <Admin />,
        "Usuarios": <Admin />,
        "Afiliados": <SubAfiliados/>,
        "SubAdmin": <SubAdmin />,
        "SubAfiliados": <SubAfiliados UserId={idUsuario} />,
        "SubLocal": <SubLocalProvider><SubLocales /></SubLocalProvider>,
        "Tarifarios": <PromocionProvider><PromocionesAdmin /></PromocionProvider>,
        "Tarifas": <PromocionesLocales />,
        "RestrictedAccess":<RestringedPage/>,
        "TarifasClinicas": <Tarifario/>,
        "Configuraciones": <Configuraciones />,
        "Clinicas": <ClinicaProvider><ClinicaPage /></ClinicaProvider>,
    };
  

    if (!router || router.length === 0) {
        return <Navigate to="/login" replace />;
    }
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
                    <Route path='/Configuraciones' element={ <ConfiguracionProvider><Configuraciones /></ConfiguracionProvider>} />
                    {!isAuthenticated ? (
                        <Route path="/login" element={<Login onLogin={onLogin} />} />
                    ) : <Route
                        path="*"
                        element={<Navigate to={idUsuario?.rutas?.[0]?.ruta} />}
                    />}




                </Routes>

            </div>

        </>

    );
};

export default PrivateRoutes
