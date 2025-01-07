import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import '../Navar/navar.css';
import { apiAdapter } from '../../../../core/adapters/apiAdapter';
import { useAuth } from '../../../context/AuthContext/AuthContext';

function Navbar({ usuarioId }) {
  const [notifications, setNotifications] = useState([]); // Estado para las notificaciones
  const menu = useRef(null);
  const { user } = useAuth()

  // Función para obtener las notificaciones del servidor
  const fetchNotifications = async () => {
    try {
      const response = await apiAdapter.get(`notificaciones/${user?.id}`);
      const data = response;

      // Si hay notificaciones, las actualizamos en el estado
      if (data) {
        setNotifications(data);
      }
    } catch (error) {
      console.error('Error al obtener las notificaciones:', error);
    }
  };

  // Llamar a la API al montar el componente
  useEffect(() => {
    fetchNotifications();
  }, [user?.id]);

  // Crear los elementos del menú basados en las notificaciones
  const notificationItems = notifications.map((notification) => ({
    label: `${notification.mensaje}`, // Mostrar solo el mensaje
    icon: 'pi pi-info-circle',       // Icono de notificación
  }));

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* Aquí puedes colocar el logo o título */}
      </div>

      <ul className="navbar-links">
        <li>
          {/* Menú de notificaciones */}
          <Menu
            model={notificationItems.length > 0 ? notificationItems : [{ label: 'No hay notificaciones', icon: 'pi pi-exclamation-circle' }]}
            popup
            ref={menu}
            id="popup_menu_notifications"
          />
          
          {/* Botón de campana que abre el menú de notificaciones */}
          <Button
            icon="pi pi-bell"
            className="button-notifications"
            onClick={(event) => menu.current.toggle(event)} // Mostrar/ocultar el menú
            aria-controls="popup_menu_notifications"
            aria-haspopup
          />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
