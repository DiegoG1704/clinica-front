import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { useAuth } from '../../../../../context/AuthContext/AuthContext';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { apiAdapter } from '../../../../../../core/adapters/apiAdapter';
import '../Estilos/DialogCreate.css'
import CustomDialog from '../../../../../components/Dialog/CustomDialog';
import { Password } from 'primereact/password';
import InputInteger from '../../../../../components/Inputs/InputNumberInteger/InputInteger';
import { showToast, showToastWithErrors } from '../../../../../utils/showToast';


export default function CreateSubAdmin({ visible, close, actualizar, fnCreate, handleChange, dataLocales, subAdminData, findDoc }) {
  const [loading, setLoading] = useState(false);
  const toast = React.useRef(null);

  // Manejo de cambio en el dropdown de Local

  const validateDni = async () => {
    const response = await findDoc()
    if (!response?.success) {
      showToast("error", "Error en busqueda", "Número de documento no encontrado", toast)

    } else {
      showToast("success", "Busqueda correcta", "Datos encontrados correctamente", toast)
    }
   
  };

  const handleSubmit = async () => {
    const response=await fnCreate()
    console.log("res",response)
    if(!response?.success){
      showToastWithErrors("error","Error al crear usuario",response?.error,toast)
    }else{
      showToast("success","Usuario creado correctamente","Se ha creado el usuario correctamente",toast)
    }
  
  };

  const today = new Date();

  // Calcular la fecha máxima: hace 18 años
  const maxDateFechaNacimiento = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

  // Calcular la fecha mínima: hace 100 años
  const minDateFechaNacimiento = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());


  const footerTemplate = () => (
    <div className="dialog-footer flex justify-content-end" style={{ marginTop: '5px' }}>
      <Button
        style={{ margin: '5px', background: '#85C226', borderColor: '#85C226', }}
        label="Cerrar"
        onClick={close} />
      <Button
        label="Crear"
        onClick={handleSubmit}
        style={{ margin: '5px', background: '#85C226', borderColor: '#85C226' }}
        disabled={loading} />
    </div>
  )


  return (
    <CustomDialog visible={visible} onhide={close} title={"Crear Sub-Administrador"} iconClassName={"pi pi-building"} width='auto' footer={footerTemplate} >
      <Toast ref={toast} />
      <div className="flex  "> {/* Contenedor principal con `flex` y espacio entre las columnas */}
        <div className="flex-1"> {/* La columna de Datos Personales ocupa el 50% */}
          <div className='DatosPersonales'>
            <div className="input-group">
              <label htmlFor="dni">DNI</label>
              <div className="input-button-group">
                <InputInteger
                  id="dni"
                  name="dni"
                  value={subAdminData.dni}
                  onChange={(e) => { e.target.name = "dni"; handleChange(e) }}
                  placeholder="Ingresa el DNI ..."
                  maxLength={8}
                  className={"w-full"}
                  containerClass={"w-full"}
                />
                <Button
                  label={loading ? 'Validando...' : 'Validar'}
                  className="validate-button"
                  onClick={validateDni}
                  disabled={subAdminData?.dni?.length !== 8}
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="nombres">Nombres</label>
              <div className="input-button-group">
                <InputText
                  id="nombres"
                  name="nombres"
                  placeholder='Ingresa nombre...'
                  value={subAdminData.nombres}
                  onChange={handleChange}
                  required
                />

              </div>
            </div>

            {/* Apellidos */}
            <div className="input-group">
              <label htmlFor="apellidos">Apellidos</label>

              <div className="input-button-group">
                <InputText
                  id="apellidos"
                  name="apellidos"
                  placeholder='Ingresa apellido...'
                  value={subAdminData.apellidos}
                  onChange={handleChange}
                  required
                />

              </div>
            </div>

            {/* Teléfono */}
            <div className="input-group">
              <label htmlFor="telefono">Teléfono</label>

              <div className="input-button-group">
                <InputInteger
                  id="telefono"
                  name="telefono"
                  placeholder='Ingresa telefono...'
                  value={subAdminData.telefono}
                  onChange={(e) => { e.target.name = "telefono"; handleChange(e) }}
                  maxLength={11}
                  className={"w-full"}
                  containerClass={"w-full"}
                />

              </div>
            </div>
            {/* Fecha de Nacimiento */}
            <div className="input-group">
              <label htmlFor="fechNac">Fecha de Nacimiento</label>
              <div className="input-button-group">
                <Calendar
                  id="fechNac"
                  name="fechNac"
                  placeholder='00/00/0000'
                  value={subAdminData.fechNac ? new Date(subAdminData.fechNac) : null} // Convertir a Date si ya existe
                  onChange={handleChange}
                  showIcon
                  dateFormat="dd/mm/yy" // Mantener el formato visual, pero la fecha será guardada correctamente
                  maxDate={maxDateFechaNacimiento}
                  minDate={minDateFechaNacimiento}

                />
              </div>
            </div>


            {/* Dirección */}
            <div className="input-group">
              <label htmlFor="direccion">Dirección</label>
              <div className="input-button-group">
                <InputText
                  id="direccion"
                  name="direccion"
                  placeholder='Ingresa direccion...'
                  value={subAdminData.direccion}
                  onChange={handleChange}
                />
              </div>
            </div>

          </div>
        </div>
        <Divider layout="vertical" />
        <div className="flex-1">
          <div className="DatosUsuario">
            <h2>Datos de Usuario</h2>

            {/* Correo */}
            <div className="input-group">
              <label htmlFor="correo">Correo</label>

              <div className="input-button-group">
                <InputText
                  id="correo"
                  name="correo"
                  value={subAdminData.correo}
                  onChange={handleChange}
                  placeholder="Ingresa tu correo..."
                />
              </div>
            </div>


            {/* Contraseña */}
            <div className="input-group">
              <label htmlFor="contraseña">Contraseña</label>

              <div className="input-button-group">

                <Password id="contraseña"
                  name="contraseña"
                  toggleMask
                  className='w-full'
                  value={subAdminData.contraseña}
                  onChange={handleChange}
                  placeholder="Ingrese contraseña..." />
              </div>
            </div>


            {/* Confirmar contraseña */}
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>

              <div className="input-button-group">
                <Password id="confirmPassword"
                  name="confirmPassword"

                  value={subAdminData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirma tu contraseña..."
                  feedback={false}
                  toggleMask
                  className='w-full'

                />

              </div>
            </div>


            {/* Dropdown de Local */}
            <div className="input-group">
              <label htmlFor="Local_id">Local</label>

              <div className="input-button-group">
                <Dropdown
                  id="Local_id"
                  name="local_id"
                  value={subAdminData.local_id}
                  onChange={handleChange}
                  options={dataLocales.map((local) => ({
                    label: local.nombre,  // Muestra el nombre
                    value: local.id // Solo envía el ID
                  }))}
                  placeholder="Seleccionar Local..."
                  className='w-full'
                />
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* Botón para guardar */}

    </CustomDialog>
  );
}