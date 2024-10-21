import './App.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import "/node_modules/primeflex/primeflex.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './presentation/pages/AdminUsuario/Navar/Navar';
import Sidebar from './presentation/pages/AdminUsuario/Navar';
import RoutesConfig from './presentation/router/routes';
import { useAuth } from './presentation/context/AuthContext/AuthContext';

function App() {
    const { user, Datos, logout,setDatos,setUser,login } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
   
    // // Function to handle the login and update the user state
    // const handleLoginId = (userData) => {
    //     setUser(userData);
    // };
    const handleDatos = (userData) => {
        setDatos(userData);
    };
   
    return (
        <Router>
            <div className="App">
                {user ? (
                    <>
                        <Navbar />
                        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onLogout={logout} idUsuario={user} />
                        <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                            <RoutesConfig isAuthenticated={!!user} Datos={Datos}  />
                        </div>
                    </>
                ) : (
                    <RoutesConfig isAuthenticated={false} onLogin={login} idUsuario={user} setIdUsuario={setUser} handleDatos={handleDatos} Datos={Datos}/>
                )}
            </div>
        </Router>
    );
}

export default App;
