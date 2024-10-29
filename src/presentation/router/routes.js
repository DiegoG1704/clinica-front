import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/login/login'
import Register from '../pages/login/register';
import Afiliados from '../pages/AdminUsuario/Afiliados/Afiliados';
import RegisterU from '../pages/login/RegisterU';
import Home from '../pages/VistaAdmin/tabla';
import Admin from '../pages/VistaAdmin/Admin';
import Promociones from '../pages/VistaAdmin/Promociones';
import Configuraciones from '../pages/VistaAdmin/ConfigProfile/Configuraciones';
import SubAfiliados from '../pages/VistaAdmin/SubAfiliados';
import SubLocales from '../pages/VistaAdmin/SubLocales';
import { useEffect, useState } from 'react';
import Clinicas from '../pages/VistaAdmin/Clinicas';
import axios from 'axios';
import PromocionesLocales from '../components/AdministradorLocales/PromocionesLocales';

const RoutesConfig = ({ isAuthenticated, onLogin ,user,setUser,idUsuario}) => {
  const [Datos, setDatos] = useState(null);
  const handleDatos = (userData) => {
    setDatos(userData);
};

const [rolId, setRolId] = useState([]); // Estado para almacenar promociones
console.log('user',idUsuario)
// Función para obtener las promociones
useEffect(() => {
  const fetchPromociones = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/RolUsuario/${idUsuario}`);
      setRolId(response.data);
    } catch (error) {
      console.error('Error al obtener las promociones:', error);
    }
  };

  fetchPromociones();
}, []);

  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/" element={<Navigate to="/Home" />} />
          <Route path='/Home' element={<Home />} />  
          <Route path='/Afiliados' element={<Admin />} />
          <Route path='/SubAfiliados' element={<SubAfiliados UserId={idUsuario}/>} />
          <Route path='/SubLocal' element={<SubLocales />} />
          <Route path='/Clinicas' element={<Clinicas/>} /> 
          <Route path='/Admin' element={<Admin />} />
          <Route path='/Promociones' element={<Promociones RolID={rolId.rol_id}/>} />
          <Route path='/PromocionesLocales' element={<PromocionesLocales IdUsuario={idUsuario}/>} />
          <Route path='/Configuraciones' element={<Configuraciones />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route path="/home" element={<Register onNext={handleDatos} />} />
          <Route path="/DatosU" element={<RegisterU userData={Datos}/>} />
          <Route path='/' element={<Afiliados idUsuario={user} setIdUsuario={setUser} />} />
        </>
      )}
    </Routes>
  );
};

export default RoutesConfig;
