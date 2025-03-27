import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { apiAdapter } from '../../../../core/adapters/apiAdapter';
import { useAuth } from '../../../context/AuthContext/AuthContext';
import '../Navar/navar.css';
import { Badge } from 'primereact/badge';
import { Toast } from 'primereact/toast';

function Navbar() {
  const [notifications, setNotifications] = useState([]); // Estado para las notificaciones
  const [unreadCount, setUnreadCount] = useState(0); // Estado para la cantidad de notificaciones no vistas
  const [visibleMessageModal, setVisibleMessageModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [message, setMessage] = useState('');  // Estado para almacenar el mensaje escrito
  const [loading, setLoading] = useState(false); // Estado para manejar el proceso de carga al enviar
  const menu = useRef(null);
  const { user } = useAuth()
  const [link, setLink] = useState([]);
  const toast = useRef(null);

  // Función para obtener las notificaciones del servidor
  const fetchNotifications = async () => {
    try {
      const response = await apiAdapter.get(`notificaciones/${user?.id}`);
      const data = response;

      // Filtrar las notificaciones no vistas
      const unreadNotifications = data.filter(notification => !notification.visto);
      setNotifications(data);
      setUnreadCount(unreadNotifications.length); // Actualizar el contador de notificaciones no vistas
    } catch (error) {
      console.error('Error al obtener las notificaciones:', error);
    }
  };

  // Llamar a la API al montar el componente
  useEffect(() => {
    fetchNotifications();
    if (user?.rol === "Promotor") {
      fetchLink()
    }
  }, [user?.id]);
  const fetchLink = async () => {
    try {
      const response = await apiAdapter.get(`${process.env.REACT_APP_API_BASE_URL}LinkCodigo/${user?.id}`);
      setLink(response?.link);
    } catch (error) {
      // console.error('Error al obtener el link:', error);
    }
  };

  // Crear los elementos del menú basados en las notificaciones
  const notificationItems = notifications.map((notification) => ({
    label: `${notification.mensaje}`, // Mostrar solo el mensaje
    icon: 'pi pi-info-circle',       // Icono de notificación
  }));

  // Función para abrir el modal de mensaje
  const openMessageModal = () => {
    setVisibleMessageModal(true);
  };

  // Función para cerrar el modal de mensaje
  const closeMessageModal = () => {
    setVisibleMessageModal(false);
    setMessage('');  // Limpiar el mensaje
  };

  const handleSubmit = async () => {
    if (!message.trim()) {
      // Si el mensaje está vacío, mostramos un mensaje de advertencia o notificación
      alert('Por favor, escribe un mensaje antes de enviarlo.');
      return;
    }

    setLoading(true); // Hacer el cambio de estado para mostrar el indicador de carga
    try {
      const response = await apiAdapter.post('CreateNotificaciones', { mensaje: message });
      console.log('Mensaje enviado:', response);

      // Actualizar las notificaciones sin necesidad de cerrar sesión
      fetchNotifications(); // Llamar nuevamente para obtener las notificaciones actualizadas

      closeMessageModal(); // Cerrar el modal después de guardar
    } catch (error) {
      console.error('Problemas al crear la notificación', error);
    } finally {
      setLoading(false); // Restablecer el estado de carga
    }
  };
  const copiarCodigo = async () => {
    try {
      await navigator.clipboard.writeText(user?.codigo);
      toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Código copiado exitosamente', life: 3000 });
    } catch (err) {
      console.error('Error al copiar el código:', err);
    }
  };

  const copiarLink = async () => {
    try {
      if (link) {
        await navigator.clipboard.writeText(link);
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Link copiado exitosamente', life: 3000 });
      } else {
        toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'No hay un link para copiar', life: 3000 });
      }
    } catch (err) {
      console.error('Error al copiar el link:', err);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo copiar el link', life: 3000 });
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          {/* Aquí puedes colocar el logo o título */}

        </div>
        <Toast ref={toast} />

        <ul className="navbar-links">
          {(user?.rol === "Promotor") && (
            <div className="flex justify-content-end align-items-center">
              <Button
                // label={user?.codigo}
              
                onClick={copiarCodigo}
                className='codigo-promotor'

              >{user?.codigo}</Button>
              <Button
                // label='Link'
                icon='pi pi-link'
                
                onClick={copiarLink}
                className='promotor-link'

              >Link</Button>
            </div>
          )}

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
            {/* Mostrar el Badge con el número de notificaciones no vistas */}
            {unreadCount > 0 && <Badge value={unreadCount} severity="danger" />}
          </li>

        </ul>
      </nav>

      {(user?.rol === 'Administrador Roles' || user?.rol === 'Administrador General') && (
        <div className='ButtonMensagge'>
          <Button
            icon='pi pi-comment'
            className='ButtonMsg'
            onClick={openMessageModal}  // Abre el modal de mensaje
          />
        </div>
      )}

      <Dialog
        header="Enviar Mensaje"
        visible={visibleMessageModal}
        onHide={closeMessageModal}
        modal
        className="responsive-dialog"  // Nueva clase para hacer que sea responsivo
      >
        <div className="p-fluid">
          <div className="p-field">
            <InputText
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}  // Actualiza el estado del mensaje
              placeholder="Escribe tu mensaje aquí..."
              autoFocus
              rows={5}
              cols={30}
            />
          </div>
          <div className="flex mt-2">
            <Button
              label="Enviar"
              icon="pi pi-send"
              className="p-button-success"
              onClick={handleSubmit}  // Enviar mensaje
              disabled={loading}  // Deshabilitar mientras se envía
            />
            <Button
              label="Cancelar"
              icon="pi pi-times"
              className="p-button-secondary p-ml-2"
              onClick={closeMessageModal}  // Cerrar el modal sin enviar
            />
          </div>
        </div>
      </Dialog>

    </>
  );
}

export default Navbar;
