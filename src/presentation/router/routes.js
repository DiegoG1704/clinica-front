import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/login/login'
import Register from '../pages/login/register';
import Afiliados from '../pages/AdminUsuario/Afiliados/Afiliados';
import RegisterU from '../pages/login/RegisterU';
const RoutesConfig = ({ isAuthenticated, onLogin, user, setUser, Datos, handleDatos }) => {

  return (
    <Routes>
      {isAuthenticated ? (
        <>
      
        </>
      ) : (
        <>
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route path="/Register" element={<Register onNext={handleDatos} />} />
          <Route path="/DatosU" element={<RegisterU userData={Datos} />} />
          <Route path='/' element={<Afiliados idUsuario={user} setIdUsuario={setUser} />} />
          <Route path='*' element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};

export default RoutesConfig;
