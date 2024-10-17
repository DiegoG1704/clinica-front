import React, { useState, useEffect } from 'react';
import '../Navar/Sidebar.css';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Sidebar({ isOpen, toggleSidebar, onLogout, idUsuario }) {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({});
  const [rutas, setRutas] = useState([]);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const roles = {
    1: "Administrador_general",
    2: "Administrador_local",
    3: "Afiliador",
    4: "Afiliado",
    5: "Sub-Administrador",
  };

  const getNombreRol = (rolId) => {
    return roles[rolId] || "Rol desconocido";
  };

  useEffect(() => {
    const fetchUsuario = async () => {
      if (idUsuario) {
        try {
          const response = await axios.get(`http://localhost:4000/user/${idUsuario}`);
          setUsuario(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUsuario({});
      }
    };

    const fetchRutasUsuario = async () => {
      if (idUsuario) {
        try {
          const response = await axios.get(`http://localhost:4000/Rutas/${idUsuario}`);
          setRutas(response.data);
        } catch (error) {
          console.error('Error fetching user routes:', error);
        }
      } else {
        setRutas([]);
      }
    };

    fetchUsuario();
    fetchRutasUsuario();
  }, [idUsuario]);

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <h1><span className='sidebar__logo-icon'>|</span>MAS SALUD</h1>
        <img src='https://s3-alpha-sig.figma.com/img/11db/cb98/2f9ba115c7d5cc790cc48a457815fb67?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FZ4KhdPL8nKP7G5HcZN4qrbPbCUzHx7jbnrKR6~ykQjnEsYbdKukovguNKj8n7hvJbuMRv5WxKsPLQNQf3erYOIqPdFTSf~v2SN3i3tldPgu4F~f5ubIrwr3dzCAlYjloqww4x5URAnIBxPU7U-Uys9PDuoX7XyegRiapbrXI8stnmL44Z-SESrfWYCV3UXvyBNg7mKEZe58Vt3NfdrSJ2roFrJ4VVVjRv8LloQJnfjDni-4BEb0EACRY5GIsRfjNjJQ-T7rfjGWykeyeu~Za8N9ewg1lugNtmyQVQ3LgokxrTZwb8sg1mIIuC6mI-lr5XIeyD4sWWMuAhthcT-Ffg__'
           />
        <h2>{usuario.nombres}</h2>
        <h3>{getNombreRol(usuario.rol_id)}</h3>
        <ul className="sidebar-menu">
          {rutas.map((rut, index) => (
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
