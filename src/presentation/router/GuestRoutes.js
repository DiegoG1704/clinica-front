import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/login/login";
import Register from "../pages/login/register";
import RegisterU from '../pages/login/RegisterU';
import Afiliados from "../pages/AdminUsuario/Afiliados/Afiliados";
import Informacion from "../pages/AdminUsuario/Afiliados/Informacion";
import Contacto from "../pages/AdminUsuario/Afiliados/componentes/Contacto"
import Index from "../pages/Contraseña/Recuperacion/Index";
import SolicitudRecuperacion from "../pages/Contraseña/Recuperacion/Solicitud";
import NuevaContrasena from "../pages/Contraseña/Recuperacion/NuevaContraseña";
import Exito from "../pages/Contraseña/Recuperacion/Confirmación";
import HomePage from "../features/user/home/pages/main/HomePage";
import Loader from "../components/Loader/Loader";

export const GuestRoutes = ({ onLogin, handleDatos, user, setUser, Datos, loading, setLoading, LoaderGuest, setLoaderGuest }) => {
    return (
        <>
            {LoaderGuest && <div className={`container-page ${LoaderGuest ? 'loading' : ''}`}>
                {LoaderGuest && <Loader isLoading={LoaderGuest} />}
            </div>}
            <Routes>
                <Route path="/login" element={<Login onLogin={onLogin} />} />
                <Route path="/Register" element={<Register onNext={handleDatos} loading={loading} setLoading={setLoading} LoaderGuest={LoaderGuest} setLoaderGuest={setLoaderGuest} />} />
                <Route path='/' element={<HomePage idUsuario={user} setIdUsuario={setUser} />} />
                <Route path="/ConoceMas" element={<Informacion />} />
                <Route path="/Contacto" element={<Contacto />} />
                <Route path='*' element={<Navigate to="/" />} />
                <Route path="/Recuperacion" element={<Index />} />
                <Route path="/Solicitud" element={<SolicitudRecuperacion />} />
                <Route path="/NuevaContrasena" element={<NuevaContrasena />} />
                <Route path="/Confirmacion" element={<Exito />} />
            </Routes>


        </>
    );
};