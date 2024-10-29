import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/login/login";
import Register from "../pages/login/register";
import RegisterU from '../pages/login/RegisterU';
import Afiliados from "../pages/AdminUsuario/Afiliados/Afiliados";
export const GuestRoutes = ({ onLogin, handleDatos, user, setUser, Datos }) => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login onLogin={onLogin} />} />
                <Route path="/Register" element={<Register onNext={handleDatos} />} />
                <Route path="/DatosU" element={<RegisterU userData={Datos} />} />
                <Route path='/' element={<Afiliados idUsuario={user} setIdUsuario={setUser} />} />
                <Route path='*' element={<Navigate to="/" />} />

            </Routes>

        </>
    );
};