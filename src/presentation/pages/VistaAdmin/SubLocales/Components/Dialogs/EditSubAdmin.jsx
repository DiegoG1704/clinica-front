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
        

export default function EditSubAdmin({ visible, close, actualizar,editData }) {
  const { user } = useAuth();  
  const [subAdmin, setSubAdmin] = useState([]);
  const [formDataLocal, setFormDataLocal] = useState({
    nombres: '',
    apellidos: '',
    telefono: '',
    fechNac: null,  // Asegúrate de que esto sea null y no undefined
    direccion: '',
    dni: '',
    estado_civil: '',  // Asignar una cadena vacía en vez de null
    rol_id: 5,
    afiliador_id: null,
    clinica_id: user?.clinica_id,
    fotoPerfil: null,
    Local_id: '',
    codigo: null,
    correo: '',
    contraseña: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [dniError, setDniError] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = React.useRef(null);

  useEffect(() => {
    if (editData) {
      setFormDataLocal({
        ...formDataLocal,
        ...editData, // Asegúrate de que editData no tenga valores undefined
      });
    }
  }, [editData]);
  
  // Manejo de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataLocal({ ...formDataLocal, [name]: value });
  };

  // Manejo de cambio en el dropdown de Local
  const handleLocalChange = (e) => {
    setFormDataLocal({ ...formDataLocal, Local_id: e.value }); // Guardar solo el id del local
  };

  useEffect(() => {
    const fetchSubAdmin = async () => {
      try {
        const response = await apiAdapter.get(`locales/clinica/${user?.clinica_id}`);
        setSubAdmin(response);
      } catch (error) {
        console.error('Error fetching clinic data:', error);
      }
    };
    fetchSubAdmin();
  }, [user?.clinica_id]);

  // Validación del DNI
  const validateDni = async () => {
    const { dni } = formDataLocal;
    if (!dni || dni.length !== 8) {
      setDniError('El DNI debe tener 8 dígitos');
      return;
    }

    setLoading(true);
    setDniError('');

    try {
      const response = await axios.get(
        `https://dniruc.apisperu.com/api/v1/dni/${dni}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRnc3QxNzA0QGdtYWlsLmNvbSJ9.4MWOq0VPNPDODZpUXh3p2MoG55I6hSBLSMzEFvT7es0`
      );
      if (response.data) {
        const { nombres, apellidoPaterno, apellidoMaterno } = response.data;
        setFormDataLocal({
          ...formDataLocal,
          nombres: nombres || '',
          apellidos: `${apellidoPaterno} ${apellidoMaterno}` || ''
        });
        toast.current.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'DNI válido, campos llenados',
          life: 3000
        });
      } else {
        setDniError('DNI no válido');
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: 'DNI no encontrado',
          life: 3000
        });
      }
    } catch (error) {
      setDniError('Hubo un error al validar el DNI');
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Error en la validación del DNI',
        life: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  // Validación de contraseñas
  const validatePasswords = () => {
    if (formDataLocal.contraseña && formDataLocal.contraseña !== formDataLocal.confirmPassword) {
      toast.current.show({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Las contraseñas no coinciden.',
        life: 3000
      });
      return false;
    }
    return true;
  };
  
  // Validación del correo electrónico
  const validateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(formDataLocal.correo);
  };

  const handleSubmit = async () => {
    if (!validatePasswords()) return;
    if (!validateEmail()) {
      toast.current.show({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'El correo electrónico no es válido.',
        life: 3000
      });
      return;
    }
  
    try {
      setLoading(true);
      const response = await apiAdapter.put(
        `user/edit/${editData.id}`,
        formDataLocal
      );
  
      toast.current.show({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Usuario actualizado exitosamente',
        life: 3000
      });
  
      setFormDataLocal({
        nombres: '',
        apellidos: '',
        telefono: '',
        fechNac: null,
        direccion: '',
        dni: '',
        estado_civil: null,
        rol_id: 5,
        afiliador_id: null,
        clinica_id: user.clinica_id,
        fotoPerfil: null,
        Local_id: '',
        codigo: null,
        correo: '',
        contraseña: '',
        confirmPassword: ''
      });
  
      actualizar();
      close(); // Cerrar modal
    } catch (error) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Hubo un problema al actualizar el usuario.',
        life: 3000
      });
    } finally {
      setLoading(false);
    }
  };
  
  
  // Mostrar u ocultar la contraseña
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const headerTemplate = () => {
    return (
        <div className='flex flex-row gap-2'>
            <span className="pi pi-building" style={{fontSize:"40px",fontWeight:"500",color:"#85C226"}}></span>
            <span style={{fontSize:"24px",fontWeight:"700"}}>Editar Subadministrador</span>
        </div>
    )
}

  return (
    <Dialog visible={visible} onHide={close} header={headerTemplate} style={{width:'800px'}}>
      <Toast ref={toast} />
      <div className="flex gap-4"> {/* Contenedor principal con `flex` y espacio entre las columnas */}
  <div className="flex-1"> {/* La columna de Datos Personales ocupa el 50% */}
    <div className='DatosPersonales'>
      <div className="input-group">
        <label htmlFor="dni">DNI</label>
        <div className="input-button-group">
          <InputText
            id="dni"
            name="dni"
            value={formDataLocal.dni}
            onChange={handleChange}
            placeholder="Ingresa el DNI"
            maxLength={8}
          />
          <Button
            label={loading ? 'Validando...' : 'Validar'}
            className="validate-button"
            onClick={validateDni}
            disabled={loading}
          />
        </div>
        {dniError && <small style={{ color: 'red' }}>{dniError}</small>}
      </div>

      {/* Nombres */}
      <div className="flex flex-column gap-2">
        <label htmlFor="nombres">Nombres</label>
        <InputText
          id="nombres"
          name="nombres"
          value={formDataLocal.nombres}
          onChange={handleChange}
          required
        />
      </div>

      {/* Apellidos */}
      <div className="flex flex-column gap-2">
        <label htmlFor="apellidos">Apellidos</label>
        <InputText
          id="apellidos"
          name="apellidos"
          value={formDataLocal.apellidos}
          onChange={handleChange}
          required
        />
      </div>

      {/* Teléfono */}
      <div className="flex flex-column gap-2">
        <label htmlFor="telefono">Teléfono</label>
        <InputText
          id="telefono"
          name="telefono"
          value={formDataLocal.telefono}
          onChange={handleChange}
          required
        />
      </div>

      {/* Fecha de Nacimiento */}
      <div className="flex flex-column gap-2">
        <label htmlFor="fechNac">Fecha de Nacimiento</label>
        <Calendar
          id="fechNac"
          name="fechNac"
          value={formDataLocal.fechNac || null}
          onChange={handleChange}
          showIcon
          dateFormat="dd/mm/yy" // O puedes poner el formato que desees
        />
      </div>

      {/* Dirección */}
      <div className="flex flex-column gap-2">
        <label htmlFor="direccion">Dirección</label>
        <InputText
          id="direccion"
          name="direccion"
          value={formDataLocal.direccion}
          onChange={handleChange}
        />
      </div>
    </div>
  </div>
  <Divider layout="vertical" />
  <div className="flex-1">
          <div className="DatosUsuario">
            <h2>Datos de Usuario</h2>

            {/* Correo */}
            <div className="flex flex-column gap-2">
              <label htmlFor="correo">Correo</label>
              <InputText
                id="correo"
                name="correo"
                value={formDataLocal.correo}
                onChange={handleChange}
                placeholder="Ingresa tu correo"
              />
            </div>

            {/* Contraseña */}
            <div className="flex flex-column gap-2" style={{ position: 'relative' }}>
              <label htmlFor="contraseña">Contraseña</label>
              <InputText
                id="contraseña"
                name="contraseña"
                type={showPassword ? 'text' : 'password'}
                value={formDataLocal.contraseña}
                onChange={handleChange}
                placeholder="Ingrese contraseña..."
              />
              <Button
                icon={showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'}
                className="p-button-secondary transparent-button"
                onClick={togglePassword}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '28px'
                }}
              />
            </div>

            {/* Confirmar contraseña */}
            <div className="flex flex-column gap-2">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <InputText
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formDataLocal.confirmPassword}
                onChange={handleChange}
                placeholder="Confirma tu contraseña"
              />
            </div>

            {/* Dropdown de Local */}
            <div className="flex flex-column gap-2">
              <label htmlFor="Local_id">Local</label>
              <Dropdown
                id="Local_id"
                name="Local_id"
                value={formDataLocal.Local_id || ''}
                onChange={handleLocalChange}
                options={subAdmin.map((local) => ({
                    label: local.nombre,  // Nombre del local
                    value: local.id // ID del local
                }))}
                placeholder="Seleccionar Local"
                />
            </div>
            <div className="dialog-footer flex justify-content-end" style={{marginTop:'5px'}}>
              <Button 
              style={{margin:'5px',background:'#85C226',borderColor:'#85C226',margin:'5px'}}
              label="Guardar" 
              icon="pi pi-save" 
              onClick={handleSubmit} 
              disabled={loading} />
              <Button
                style={{margin:'5px',background:'#85C226',borderColor:'#85C226',margin:'5px'}}
                label="Cerrar" 
                onClick={close} />
            </div>
          </div>
        </div>
      </div>

      {/* Botón para guardar */}
      
    </Dialog>
  );
}