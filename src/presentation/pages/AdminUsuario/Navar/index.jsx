import '../Navar/Sidebar.css';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useNavigate } from 'react-router-dom';
import fotoperfil from "../../../img/photo-default.png";
import { useAuth } from '../../../context/AuthContext/AuthContext';

export default function Sidebar({ isOpen, toggleSidebar, onLogout }) {
  const navigate = useNavigate();
  const { user } = useAuth();


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
        <h1><span className='sidebar__logo-icon'>|</span>MAS SALUD</h1>
        <img src={user.fotoPerfil ? `${process.env.REACT_APP_API_BASE_URL}uploads/${user.fotoPerfil}` : fotoperfil} alt='' />
        <h2>{user.nombres}</h2>
        <h3>{user.rolId}</h3>
        <ul className="sidebar-menu">
          {user.rutas.map((rut, index) => (
            <li key={index} onClick={() => navigate(rut.ruta)}>
              <i className={rut.logo} style={{ fontSize: '20px' }} />
              {isOpen && <span style={{ fontSize: '14px' }}>{rut.nombre}</span>}
            </li>
          ))}
          <li onClick={() => navigate('/Configuraciones')}>
            <i className="pi pi-cog" style={{ fontSize: '20px' }} />
            {isOpen && <span style={{ fontSize: '14px' }}>Configuración</span>}
          </li>
          <li onClick={handleLogout}>
            <i className="pi pi-sign-out" style={{ fontSize: '20px' }} />
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
