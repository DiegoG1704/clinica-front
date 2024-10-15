import './App.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import "/node_modules/primeflex/primeflex.css";
import Login from './page/login/login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './page/login/register';
import Afiliados from './page/AdminUsuario/Afiliados/Afiliados';
import RegisterU from './page/login/RegisterU';
import { useState } from 'react';
import Navbar from './page/AdminUsuario/Navar/Navar';
import Sidebar from './page/AdminUsuario/Navar';
import Home from './page/VistaAdmin/tabla';
import UserAfiliados from './page/VistaAdmin/Afiliados';
import Admin from './page/VistaAdmin/Admin';
import Promociones from './page/VistaAdmin/Promociones';
import Configuraciones from './page/VistaAdmin/Configuraciones';
import SubAfiliados from './page/VistaAdmin/SubAfiliados';
import SubLocales from './page/VistaAdmin/SubLocales';

function App() {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
  };
  const [Datos, setDatos] = useState(null);

  // Function to handle the login and update the user state
  const handleLoginId = (userData) => {
      setUser(userData);
  };

  const handleDatos = (userData) => {
      setDatos(userData);
  };
  const logout = () => {
    setUser(null);
  };

  return (
      <Router>
          <div className="App">
              {user ? (
                  <>
                      <Navbar />
                      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onLogout={logout} idUsuario={user} />
                      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                          <Routes>
                            <Route path="/" element={<Navigate to="/Home" />} />
                              <Route path='/Home' element={<Home/>} />  
                              <Route path='/Afiliados' element={<UserAfiliados/>} /> 
                              <Route path='/SubAfiliados' element={<SubAfiliados/>} /> 
                              <Route path='/SubLocal' element={<SubLocales/>} /> 
                              <Route path='/Admin' element={<Admin/>} /> 
                              <Route path='/Promociones' element={<Promociones/>} />   
                              <Route path='/Configuraciones' element={<Configuraciones/>} /> 
                          </Routes>
                      </div>
                  </>
              ) : (
                  <Routes>
                      <Route path="/login" element={<Login onLogin={handleLoginId} />} />
                      <Route path="/home" element={<Register onNext={handleDatos} />} />
                      <Route path="/DatosU" element={<RegisterU userData={Datos} />} />
                      <Route path='/' element={<Afiliados idUsuario={user} setIdUsuario={setUser} />} />
                  </Routes>
              )}
          </div>
      </Router>
  );
}

export default App;
