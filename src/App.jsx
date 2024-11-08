import './App.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';  // Cambia el tema si prefieres otro
import 'primereact/resources/primereact.min.css';                  // CSS principal de PrimeReact
import 'primeicons/primeicons.css';                                // Iconos de PrimeReact
import 'primeflex/primeflex.css';                                  // Utilidades de Flexbox
import { Navigate, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useAuth } from './presentation/context/AuthContext/AuthContext';
import PrivateRoutes from './presentation/router/PrivateRoutes';
import { GuestRoutes } from './presentation/router/GuestRoutes';

function App() {
    const { user, Datos, logout, setDatos, setUser, login, isAuthenticated, autenticate } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    console.log("is", isAuthenticated)
    const location = useLocation();

    useEffect(() => {
        console.log("Ruta actual:", location.pathname);
    }, [location]);

    // // Function to handle the login and update the user state
    // const handleLoginId = (userData) => {
    //     setUser(userData);
    // };
    const handleDatos = (userData) => {
        setDatos(userData);
    };
    return (

        <>
            {autenticate() ? (
                <PrivateRoutes
                    isSidebarOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                    logout={logout}
                    idUsuario={user}
                />
            ) : (
                <GuestRoutes
                    onLogin={login}
                    handleDatos={handleDatos}
                    user={user}
                    setUser={setUser}
                    Datos={Datos}
                />
            )}
        </>
    )

}

export default App;
