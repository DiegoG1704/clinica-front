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



  
  const footerTemplate = () => (
    <div className="dialog-footer flex justify-content-end" style={{ marginTop: '5px' }}>
      <Button
        style={{ margin: '5px', background: '#85C226', borderColor: '#85C226', margin: '5px' }}
        label="Cerrar"
        onClick={close} />
      <Button
        label="Crear"
        onClick={handleSubmit}
        style={{ margin: '5px', background: '#85C226', borderColor: '#85C226', margin: '5px' }}
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
            <div className="input-group">
              <label htmlFor="nombres">Nombres</label>
              <div className="input-button-group">
                <InputText
                  id="nombres"
                  name="nombres"
                  placeholder='Ingresa nombre...'
                  value={formDataLocal.nombres}
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
                  value={formDataLocal.apellidos}
                  onChange={handleChange}
                  required
                />

              </div>
            </div>

            {/* Teléfono */}
            <div className="input-group">
              <label htmlFor="telefono">Teléfono</label>

              <div className="input-button-group">
                <InputText
                  id="telefono"
                  name="telefono"
                  placeholder='Ingresa telefono...'
                  value={formDataLocal.telefono}
                  onChange={handleChange}
                  required
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
                  placeholder='Selecciona fecha de nacimiento...'
                  value={formDataLocal.fechNac ? new Date(formDataLocal.fechNac) : null} // Convertir a Date si ya existe
                  onChange={handleChange}
                  showIcon
                  dateFormat="dd/mm/yy" // Mantener el formato visual, pero la fecha será guardada correctamente
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
                  value={formDataLocal.direccion}
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
                  value={formDataLocal.correo}
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
                  value={formDataLocal.contraseña}
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

                  value={formDataLocal.confirmPassword}
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
                  name="Local_id"
                  value={formDataLocal.Local_id}
                  onChange={handleLocalChange}
                  options={subAdmin.map((local) => ({
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