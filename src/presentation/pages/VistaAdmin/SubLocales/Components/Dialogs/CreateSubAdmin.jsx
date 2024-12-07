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
        

export default function CreateSubAdmin({ visible, close, actualizar }) {
  const { user } = useAuth(); 
  const [subAdmin, setSubAdmin] = useState([]);
  const [formDataLocal, setFormDataLocal] = useState({
    nombres: '',
    apellidos: '',
    telefono: '',
    fechNac: null,
    direccion: '',
    dni: '',
    estado_civil: null,
    rol_id: 5, // El rol es 5 para subadministradores
    afiliador_id: null,
    clinica_id: user?.clinica_id,
    fotoPerfil: null,
    Local_id: '', // Aquí almacenaremos el ID del local seleccionado
    codigo: null,
    correo: '',
    contraseña: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [dniError, setDniError] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = React.useRef(null);

  // Manejo de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Si el campo es 'fechNac', formatear la fecha antes de guardarla
    if (name === 'fechNac' && value instanceof Date) {
      // Convierte la fecha a formato 'yyyy-mm-dd' que MySQL acepta
      const formattedDate = value.toISOString().split('T')[0]; // Solo la fecha
      setFormDataLocal({ ...formDataLocal, [name]: formattedDate });
    } else {
      setFormDataLocal({ ...formDataLocal, [name]: value });
    }
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
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'El DNI debe tener 8 dígitos',
        life: 3000
      });
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await axios.get(
        `https://dniruc.apisperu.com/api/v1/dni/${dni}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRnc3QxNzA0QGdtYWlsLmNvbSJ9.4MWOq0VPNPDODZpUXh3p2MoG55I6hSBLSMzEFvT7es0`
      );
  
      if (response.data && response.data.nombres) {
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
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Datos no encontrados para el DNI proporcionado.',
          life: 3000
        });
      }
    } catch (error) {
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
  

  const validatePasswords = () => {
    if (formDataLocal.contraseña !== formDataLocal.confirmPassword) {
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
  
  const validateRequiredFields = () => {
    const requiredFields = [
      'nombres', 'apellidos', 'telefono', 'fechNac', 'direccion',
      'dni', 'correo', 'contraseña', 'confirmPassword', 'Local_id'
    ];
  
    for (let field of requiredFields) {
      if (!formDataLocal[field]) {
        toast.current.show({
          severity: 'warn',
          summary: 'Advertencia',
          detail: `El campo ${field} es obligatorio.`,
          life: 3000
        });
        return false;
      }
    }
  
    return true;
  };
  

  const validateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(formDataLocal.correo);
  };
  

  const handleSubmit = async () => {
    if (!validateRequiredFields()) {
      return; // Detener el envío si algún campo requerido está vacío
    }
  
    if (!validatePasswords()) {
      return; // No continuar si las contraseñas no coinciden
    }
  
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
  
      // Enviamos la solicitud para crear el subadministrador
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}CreateUsuario`,
        formDataLocal
      );
  console.log(response)
      // Si la creación fue exitosa
      toast.current.show({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Usuario creado exitosamente',
        life: 3000
      });
  
      // Limpiar el formulario
      setFormDataLocal({
        nombres: '',
        apellidos: '',
        telefono: '',
        fechNac: '',
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
      close(); // Cerrar el formulario
    } catch (error) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'El correo ya está en uso.',
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
            <span style={{fontSize:"24px",fontWeight:"700"}}>Crear Sub-Administrador</span>
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
                  placeholder="Ingresa el DNI ..."
                  maxLength={8}
                />
                <Button
                  label={loading ? 'Validando...' : 'Validar'}
                  className="validate-button"
                  onClick={validateDni}
                  disabled={loading}
                />
              </div>
            </div>
            <div className="flex flex-column gap-2">
              <label htmlFor="nombres">Nombres</label>
              <InputText
                id="nombres"
                name="nombres"
                placeholder='Ingresa nombre...'
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
                placeholder='Ingresa apellido...'
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
                placeholder='Ingresa telefono...'
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
                placeholder='Selecciona fecha de nacimiento...'
                value={formDataLocal.fechNac ? new Date(formDataLocal.fechNac) : null} // Convertir a Date si ya existe
                onChange={handleChange}
                showIcon
                dateFormat="dd/mm/yy" // Mantener el formato visual, pero la fecha será guardada correctamente
              />
            </div>

            {/* Dirección */}
            <div className="flex flex-column gap-2">
              <label htmlFor="direccion">Dirección</label>
              <InputText
                id="direccion"
                name="direccion"
                placeholder='Ingresa direccion...'
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
                placeholder="Ingresa tu correo..."
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
                className="p-button-secondary-Login transparent-button"
                onClick={togglePassword}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '48px'
                }}
              />
            </div>

            {/* Confirmar contraseña */}
            <div className="flex flex-column gap-2" style={{ position: 'relative' }}>
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <InputText
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={formDataLocal.confirmPassword}
                onChange={handleChange}
                placeholder="Confirma tu contraseña..."
              />
              <Button
                icon={showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'}
                className="p-button-secondary-Login transparent-button"
                onClick={togglePassword}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '48px'
                }}
              />
            </div>

            {/* Dropdown de Local */}
            <div className="flex flex-column gap-2">
              <label htmlFor="Local_id">Local</label>
              <Dropdown
                id="Local_id"
                name="Local_id"
                value={formDataLocal.Local_id}
                onChange={handleLocalChange}
                options={subAdmin.map((local) => ({
                  label: local.nombre,  // Muestra el nombre
                  value: local.id // Solo envía el ID
                }))}
                placeholder="Seleccionar Local..."
              />
            </div>
            <div className="dialog-footer flex justify-content-end" style={{marginTop:'5px'}}>
              <Button
                style={{margin:'5px',background:'#85C226',borderColor:'#85C226',margin:'5px'}}
                label="Cerrar" 
                onClick={close} />
              <Button 
                label="Crear" 
                onClick={handleSubmit} 
                style={{margin:'5px',background:'#85C226',borderColor:'#85C226',margin:'5px'}}
                disabled={loading} />
            </div>
          </div>
        </div>
      </div>

      {/* Botón para guardar */}
      
    </Dialog>
  );
}