import './App.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';  
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useAuth } from './presentation/context/AuthContext/AuthContext';
import PrivateRoutes from './presentation/router/PrivateRoutes';
import { GuestRoutes } from './presentation/router/GuestRoutes';
import { history } from './presentation/utils/history';
import configurePrimeReact from './presentation/config/local';
import Loader from './presentation/components/Loader/Loader';
import Tarifario from './presentation/components/Afiliados/Tarifario';


function App() {
    const { user, Datos, logout, setDatos, setUser,
        login, isAuthenticated, setIsAuthenticated, loading,
        setLoading, LoaderPrivate, setLoaderPrivate, LoaderGuest, setLoaderGuest
    } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    history.navigate = useNavigate();
    history.location = useLocation();
    history.backHome = () => {
        setIsAuthenticated(false)
        setUser(null)
        // history.navigate("/login")
    }
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };




    configurePrimeReact()


    // // Function to handle the login and update the user state
    // const handleLoginId = (userData) => {
    //     setUser(userData);
    // };
    const handleDatos = (userData) => {
        setDatos(userData);
    };


    return (
        <>
            {isAuthenticated ? (
                <PrivateRoutes
                    isSidebarOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                    logout={logout}
                    idUsuario={user}
                    router={user?.rutas}
                    isAuthenticated={isAuthenticated}
                    onLogin={login}
                    loading={loading}
                    setLoading={setLoading}
                    LoaderPrivate={LoaderPrivate}
                    setLoaderPrivate={setLoaderPrivate}
                />
            ) : (
                <GuestRoutes
                    onLogin={login}
                    handleDatos={handleDatos}
                    user={user}
                    setUser={setUser}
                    Datos={Datos}
                    loading={loading}
                    setLoading={setLoading}
                    LoaderGuest={LoaderGuest}
                    setLoaderGuest={setLoaderGuest}
                />
            )}

        </>
        // <Tarifario/>
    );


}

export default App;
