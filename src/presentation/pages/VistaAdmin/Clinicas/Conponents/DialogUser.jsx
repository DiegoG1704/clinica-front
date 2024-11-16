import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import fotoperfil from "../../../../img/photo-default.png";  // Imagen predeterminada
import React, { useEffect, useState } from 'react';
import { apiAdapter } from '../../../../../core/adapters/apiAdapter';
import { useClinica } from '../../../../context/ClinicaContext/ClinicaContext';
import CustomDialog from '../../../../components/Dialog/CustomDialog';

export default function DialogUser({ visible, close, idClinica }) {
 
  const [clinica, setClinica] = useState(null);
  const { currentUser } = useClinica()
  


  //   const fetchClinicas = async () => {
  //     try {
  //       const response = await apiAdapter.get(`GetSubAdmin/${idClinica}`);
  //       console.log("Datos recibidos:", response);  // Log para verificar los datos
  //       if (response.length > 0) {
  //         const subAdmin = response[0];  // Accedemos al primer sub-admin de la respuesta
  //         setClinica(subAdmin);  // Guardamos los datos del sub-admin en el estado
  //         setNombres(subAdmin.nombres || '');  
  //         setApellidos(subAdmin.apellidos || '');
  //         setTelefono(subAdmin.telefono || '');
  //         setFechNac(subAdmin.fechNac || '');
  //         setDireccion(subAdmin.direccion || '');
  //         setCorreo(subAdmin.correo || '');
  //         setContraseña(subAdmin.contraseña || '');
  //       } else {
  //         console.error('No se encontró ningún usuario para este idClinica');
  //         setClinica(null);  // Asegúrate de resetear el estado si no hay datos
  //       }
  //     } catch (error) {
  //       console.error('Error fetching clinic data:', error);
  //       // Aquí podrías manejar un mensaje de error o mostrar algún tipo de feedback visual
  //       setClinica(null);  // Reseteamos el estado en caso de error
  //     }
  //   };

  //     fetchClinicas();

  // }, [idClinica]);  

  const headerTemplate = () => {
    return (
      <div className='flex flex-row gap-2'>
        <span className="pi pi-building" style={{ fontSize: "40px", fontWeight: "500", color: "#85C226" }}></span>
        <span style={{ fontSize: "24px", fontWeight: "700" }}>Detalles del Usuario</span>
      </div>
    )
  }
  const footerTemplate = () => {
    return (
      <div className='flex justify-content-end'>
        <Button
          label='Cerrar'
          onClick={close}
          style={{ backgroundColor: "#85C226", borderColor: "#85C226", height: "40px", borderRadius: "6px" }}
        />
      </div>
    )
  }

  return (
    <div>
      <CustomDialog visible={visible} onhide={close} header={headerTemplate} footer={footerTemplate} width='700px' iconClassName={"pi pi-user"} title={"Usuario administrador"}>
        <div className="flex">
          {/* Contenedor para los campos a la izquierda */}
          <div className="flex-1 m-3">
            {/* Mostrar la foto de perfil */}
            <div className="mb-3" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {/* <img
                src={clinica && clinica.fotoPerfil ? `${process.env.REACT_APP_API_BASE_URL}uploads/${clinica.fotoPerfil}` : fotoperfil}
                alt="Foto de perfil"
                style={{
                  width: '187px',
                  height: '187px',
                  borderRadius: '50%',
                  border: '5px solid #85c226',
                  objectFit: 'cover',
                }}
              /> */}
            </div>
            {/* Correo */}
            <div className="input-group">
              <label htmlFor="Correo">Correo</label>
              <div className="input-button-group">
                <InputText
                  id="Correo"
                  name="Correo"
                  value={currentUser?.correo || ''}

                />


              </div>

            </div>


          </div>

          {/* Contenedor para los campos a la derecha */}
          <div className="flex-1 m-3">
            {/* Nombres */}
            <div className="input-group">
              <label htmlFor="nombres">Nombres</label>
              <div className="input-button-group">
                <InputText
                  id="nombres"
                  name="nombres"
                  value={currentUser?.nombres || ''}

                />
              </div>

            </div>


            {/* Apellidos */}
            <div className="flex flex-column gap-2">
              <div className="input-group">
                <label htmlFor="apellidos">Apellidos</label>
                <div className="input-button-group">
                  <InputText
                    id="apellidos"
                    name="apellidos"
                    value={currentUser?.apellidos || ''}

                  />
                </div>

              </div>


            </div>

            {/* Teléfono */}
            <div className="flex flex-column gap-2">
              <div className="input-group">
                <label htmlFor="telefono">Teléfono</label>
                <div className="input-button-group">
                  <InputText
                    id="telefono"
                    name="telefono"
                    value={currentUser?.telefono || ''}
                    
                  />
                </div>

              </div>

            </div>

            {/* Fecha de Nacimiento */}
            <div className="flex flex-column gap-2">
              <div className="input-group">
                <label htmlFor="fechNac">Fecha de Nacimiento</label>
                <div className="input-button-group">
                  <InputText
                    id="fechNac"
                    name="fechNac"
                    value={currentUser?.fechNac ? currentUser?.fechNac.split('T')[0] : ''}

                  />
                </div>

              </div>

            </div>



            {/* Dirección */}
            <div className="flex flex-column gap-2">
              <div className="input-group">
                <label htmlFor="direccion">Dirección</label>
                <div className="input-button-group">
                  <InputText
                    id="direccion"
                    name="direccion"
                    value={currentUser?.direccion || ''}
                  />
                </div>

              </div>

            </div>

           
          </div>

        </div>

      </CustomDialog>
    </div>
  );
}
