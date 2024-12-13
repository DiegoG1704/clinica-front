import './App.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';  // Cambia el tema si prefieres otro
import 'primereact/resources/primereact.min.css';                  // CSS principal de PrimeReact
import 'primeicons/primeicons.css';                                // Iconos de PrimeReact
import 'primeflex/primeflex.css';                                  // Utilidades de Flexbox
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useAuth } from './presentation/context/AuthContext/AuthContext';
import PrivateRoutes from './presentation/router/PrivateRoutes';
import { GuestRoutes } from './presentation/router/GuestRoutes';
import { history } from './presentation/utils/history';
import configurePrimeReact from './presentation/config/local';


function App() {
    const { user, Datos, logout, setDatos, setUser, login, isAuthenticated, setIsAuthenticated } = useAuth();
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



    useEffect(() => {
        console.log("isAuthenticated in App.jsx:", isAuthenticated); // Para depurar el estado
    }, [isAuthenticated]);
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
            {/* <Route path="/logout" element={<LogoutPage />} /> */}
            {isAuthenticated ? (
                <PrivateRoutes
                    isSidebarOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                    logout={logout}
                    idUsuario={user}
                    router={user?.rutas}
                    isAuthenticated={isAuthenticated}
                    onLogin={login}
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
