import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button'; 
import fotoperfil from "../../../../img/user.png";  // Imagen predeterminada
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiAdapter } from '../../../../../core/adapters/apiAdapter';

export default function DialogUser({ visible, close, idClinica }) {
  // Estado para manejar los datos del usuario (sub-admin)
  console.log('id',idClinica)
  const [foto, setFoto] = useState(null);  
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechNac, setFechNac] = useState('');
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [clinica, setClinica] = useState(null);
  
  useEffect(() => {
    const fetchClinicas = async () => {
      try {
        const response = await apiAdapter.get(`GetSubAdmin/${idClinica}`);
        console.log("Datos recibidos:", response);  // Log para verificar los datos
        if (response.length > 0) {
          const subAdmin = response[0];  // Accedemos al primer sub-admin de la respuesta
          setClinica(subAdmin);  // Guardamos los datos del sub-admin en el estado
          setNombres(subAdmin.nombres || '');  
          setApellidos(subAdmin.apellidos || '');
          setTelefono(subAdmin.telefono || '');
          setFechNac(subAdmin.fechNac || '');
          setDireccion(subAdmin.direccion || '');
          setCorreo(subAdmin.correo || '');
          setContraseña(subAdmin.contraseña || '');
        } else {
          console.error('No se encontró ningún usuario para este idClinica');
          setClinica(null);  // Asegúrate de resetear el estado si no hay datos
        }
      } catch (error) {
        console.error('Error fetching clinic data:', error);
        // Aquí podrías manejar un mensaje de error o mostrar algún tipo de feedback visual
        setClinica(null);  // Reseteamos el estado en caso de error
      }
    };
  
      fetchClinicas();

  }, [idClinica]);  

  // Manejar la selección de una nueva foto
  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
    }
  };

  // Abrir el selector de archivos cuando se hace clic en el botón de lápiz
  const openFileInput = () => {
    document.getElementById('fotoInput').click();
  };

  return (
    <div>
      <Dialog visible={visible} onHide={close} header={'Detalles del Usuario'} style={{ width: '800px' }}>
        <div className="flex">
          {/* Contenedor para los campos a la izquierda */}
          <div className="flex-1 m-3">
            {/* Mostrar la foto de perfil */}
            <div className="mb-3" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={clinica && clinica.fotoPerfil ? `http://localhost:4000/uploads/${clinica.fotoPerfil}` : fotoperfil}
              alt="Foto de perfil"
              style={{
                width: '187px',
                height: '187px',
                borderRadius: '50%',  
                border: '5px solid #85c226', 
                objectFit: 'cover', 
              }}
            />

              {/* Botón para cambiar la foto (lápiz) */}
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-text p-button-sm"
                style={{
                  position: 'absolute',
                  top: '150px',
                  right: '90px',
                  backgroundColor: '#ffffff',
                  border: '3px solid #85c226',
                }}
                onClick={openFileInput} 
              />
            </div>

            {/* Input para cargar una nueva foto (oculto) */}
            <input
              type="file"
              id="fotoInput"
              name="foto"
              accept="image/*"
              style={{ display: 'none' }} 
              onChange={handleFotoChange}
            />

            {/* Correo */}
            <div className="flex flex-column gap-2">
              <label htmlFor="Correo">Correo</label>
              <InputText
                id="Correo"
                name="Correo"
                value={correo || ''}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>

            {/* Contraseña */}
            <div className="flex flex-column gap-2">
              <label htmlFor="Contraseña">Contraseña</label>
              <InputText
                id="Contraseña"
                name="Contraseña"
                value={contraseña || ''}
                onChange={(e) => setContraseña(e.target.value)}
              />
            </div>
          </div>

          {/* Contenedor para los campos a la derecha */}
          <div className="flex-1 m-3">
            {/* Nombres */}
            <div className="flex flex-column gap-2">
              <label htmlFor="nombres">Nombres</label>
              <InputText
                id="nombres"
                name="nombres"
                value={nombres || ''}
                onChange={(e) => setNombres(e.target.value)}
              />
            </div>

            {/* Apellidos */}
            <div className="flex flex-column gap-2">
              <label htmlFor="apellidos">Apellidos</label>
              <InputText
                id="apellidos"
                name="apellidos"
                value={apellidos || ''}
                onChange={(e) => setApellidos(e.target.value)}
              />
            </div>

            {/* Teléfono */}
            <div className="flex flex-column gap-2">
              <label htmlFor="telefono">Teléfono</label>
              <InputText
                id="telefono"
                name="telefono"
                value={telefono || ''}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>

            {/* Fecha de Nacimiento */}
            <div className="flex flex-column gap-2">
              <label htmlFor="fechNac">Fecha de Nacimiento</label>
              <InputText
                id="fechNac"
                name="fechNac"
                value={fechNac ? fechNac.split('T')[0] : ''}
                onChange={(e) => setFechNac(e.target.value)}
              />
            </div>

            {/* Dirección */}
            <div className="flex flex-column gap-2">
              <label htmlFor="direccion">Dirección</label>
              <InputText
                id="direccion"
                name="direccion"
                value={direccion || ''}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
