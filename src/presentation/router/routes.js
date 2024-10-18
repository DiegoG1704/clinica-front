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

const RoutesConfig = ({ isAuthenticated, onLogin ,user,setUser}) => {
  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/" element={<Navigate to="/Home" />} />
          <Route path='/Home' element={<Home />} />  
          <Route path='/Afiliados' element={<Admin />} />
          <Route path='/SubAfiliados' element={<SubAfiliados />} />
          <Route path='/SubLocal' element={<SubLocales />} />
          {/* <Route path='/Admin' element={<Admin />} /> */}
          <Route path='/Promociones' element={<Promociones />} />
          <Route path='/Configuraciones' element={<Configuraciones />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route path="/home" element={<Register onNext={onLogin} />} />
          <Route path="/DatosU" element={<RegisterU />} />
          <Route path='/' element={<Afiliados idUsuario={user} setIdUsuario={setUser} />} />
        </>
      )}
    </Routes>
  );
};

export default RoutesConfig;
