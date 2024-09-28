import React, { useState, useEffect, useRef } from 'react'; // Importa useState y useEffect
import '../Navar/navar.css'; 
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const menuRight = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); // Redirige al usuario al componente de inicio de sesión
  };


  const items = [
    {
      label: 'Hello', // Muestra el nombre del usuario si está disponible
      items: [
        {
          label: 'Gestionar cuenta', // Agrega la opción "Gestionar cuenta"
          icon: 'pi pi-user',
          //command: () => navigate('/usuario'),  Redirige a "/usuario"
        },
        {
          label: 'Cerrar Sesion',
          icon: 'pi pi-power-off',
          command: handleLogout
        }
      ]
    }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* Puedes colocar aquí un logo o título */}
      </div>
      
      <ul className="navbar-links">
        <li>
          <a href="#"><i className="pi pi-bell" style={{ color: 'var(--primary-color)' }}></i></a>
        </li>
        <li>
          <Button 
            className="user-button" 
            onClick={(event) => menuRight.current.toggle(event)} 
            aria-controls="popup_menu_right" 
            aria-haspopup 
          >
            {/* <img 
              src={fotoPerfil ? `http://localhost:8081/uploads/${fotoPerfil}` : '../img/user.png'} 
              alt="User" 
              className="user-icon" 
            /> */}
          </Button>
          <Menu 
            model={items} 
            popup 
            ref={menuRight} 
            id="popup_menu_right" 
          />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
