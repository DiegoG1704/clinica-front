import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button'; 
import fotoperfil from "../../../../img/photo-default.png";  // Imagen predeterminada
import React, { useEffect, useState } from 'react';
import { apiAdapter } from '../../../../../core/adapters/apiAdapter';

export default function DialogUser({ visible, close, idClinica }) {
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

  const headerTemplate = () => {
    return (
        <div className='flex flex-row gap-2'>
            <span className="pi pi-building" style={{fontSize:"40px",fontWeight:"500",color:"#85C226"}}></span>
            <span style={{fontSize:"24px",fontWeight:"700"}}>Detalles del Usuario</span>
        </div>
    )
}

  return (
    <div>
      <Dialog visible={visible} onHide={close} header={headerTemplate} style={{ width: '800px' }}>
        <div className="flex">
          {/* Contenedor para los campos a la izquierda */}
          <div className="flex-1 m-3">
            {/* Mostrar la foto de perfil */}
            <div className="mb-3" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={clinica && clinica.fotoPerfil ? `${process.env.REACT_APP_API_BASE_URL}uploads/${clinica.fotoPerfil}` : fotoperfil}
              alt="Foto de perfil"
              style={{
                width: '187px',
                height: '187px',
                borderRadius: '50%',  
                border: '5px solid #85c226', 
                objectFit: 'cover', 
              }}
            />
            </div>
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
        <div className='flex justify-content-end'>
            <Button 
            label='Cerrar' 
            onClick={close}
            style={{ backgroundColor: "#85C226", borderColor: "#85C226", height: "40px", borderRadius: "6px" }}
            />
          </div>
      </Dialog>
    </div>
  );
}
