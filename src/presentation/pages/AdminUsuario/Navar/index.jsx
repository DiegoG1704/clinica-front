import React, { useState, useEffect } from 'react';
import '../Navar/Sidebar.css';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import perfilDefault from "../../../img/photo-default.png"
import { useAuth } from '../../../context/AuthContext/AuthContext';

export default function Sidebar({ isOpen, toggleSidebar, onLogout, idUsuario }) {
  const navigate = useNavigate();
  const {user, setuser}= useAuth()
  const [rutas, setRutas] = useState([]);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };


  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <h1><span className='sidebar__logo-icon'>|</span>MAS SALUD</h1>
        
           <img src={perfilDefault} alt="" />
        <h2>{user?.nombres}</h2>
        <h3>{user?.rolId}</h3>
        <ul className="sidebar-menu">
          {user?.rutas.map((rut, index) => (
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
