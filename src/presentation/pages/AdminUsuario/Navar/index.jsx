import '../Navar/Sidebar.css';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useNavigate } from 'react-router-dom';
import fotoperfil from "../../../img/photo-default.png";
import { useAuth } from '../../../context/AuthContext/AuthContext';
import LogoImage from "@/presentation/img/logo-inicio.png";
import { Divider } from 'primereact/divider';
import { history } from '@/presentation/utils/history';

export default function Sidebar({ isOpen, toggleSidebar, onLogout }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log("his",history.location.pathname)


  const handleLogout = async () => {
    const response = await onLogout();
    if (response) {
      navigate('/login', { replace: true });
    }
  };

  if (!user) {
    return null; // Or return a loading state or a message
  }

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        {/* <h1><span className='sidebar__logo-icon'>|</span>MAS SALUD</h1> */}
        <div className="container-logo">
          <img src={LogoImage} alt="" className='logo-massalud' />
        </div>

        <div className="flex  justify-content-center perfil relative   ">
          <div className='divider '></div>
          <div className='profile-avatar-container absolute  '>
            <img src={user.fotoPerfil ? `${process.env.REACT_APP_API_BASE_URL}uploads/${user.fotoPerfil}` : fotoperfil} alt='' className='image-perfil ' />
          </div>

        </div>

        <div className='container-user-info'>
          <div className="flex justify-content-center"><h2 className="user-name ">{user?.nombres}</h2></div>

          <div className='role'><div><h3>{user?.rol}</h3></div></div>
          <div className='link-perfil'>
            <div>
              <i className="pi pi-cog" style={{ fontSize: '13px' }} />
              <span style={{ fontSize: '14px' }}>Mi Perfil</span>
            </div>

          </div>
        </div>
        <div className='divider divider-links'></div>
        <ul className="sidebar-menu">
          <p className='section-title-links'>MENÚ PRINCIPAL</p>
          {user.rutas.map((rut, index) =>
            rut.ruta !== '/RestrictedAccess' ? ( // Excluye solo la ruta deseada
              <li key={index} onClick={() => navigate(rut.ruta)} className={ history.location.pathname === rut.ruta ? 'active' : ''}>
                <i className={rut.logo} style={{ fontSize: '13.7px' }} />
                {isOpen && <span style={{ fontSize: '14px' }}>{rut?.nombre}</span>}
              </li>
            ) : <li key={index} onClick={() => navigate('/RestrictedAccess')}  className={ history.location.pathname === rut.ruta ? 'active' : ''}>
              <i className={"pi pi-home"} style={{ fontSize: '13px' }} />
              {isOpen && <span style={{ fontSize: '14px' }}>Home</span>}
            </li>
          )}
          <div className="divider"></div>
          <p className='section-title-links'>CONFIGURACIÓN</p>
          <li onClick={() => navigate('/Configuraciones')}  className={ history.location.pathname === "/RestrictedAccess" ? 'active' : ''}>
            <i className="pi pi-cog" style={{ fontSize: '13.7px' }} />
            {isOpen && <span style={{ fontSize: '14px' }}>Configuración</span>}
          </li>
          <div className="divider"></div>
          <li onClick={handleLogout} className='close-session'>
            <i className="pi pi-sign-out" style={{ fontSize: '13.7px' }} />
            {isOpen && <span style={{ fontSize: '14px' }}>Cerrar Sesión</span>}
          </li>

        </ul>
        
       


      </div>
      <Button
        rounded
        icon={isOpen ? 'pi pi-arrow-left' : 'pi pi-arrow-right'}        
        onClick={toggleSidebar}
        className="toggle-button"
        style={{
          left: isOpen ? '250px' : '60px',
          zIndex: 200,
        }}
      />
    </>
  );
}
