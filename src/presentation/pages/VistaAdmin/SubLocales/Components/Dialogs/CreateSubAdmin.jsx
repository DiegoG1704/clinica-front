import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { useAuth } from '../../../../../context/AuthContext/AuthContext';
import { Dialog } from 'primereact/dialog';

export default function CreateSubAdmin({ visible, close }) {
  const { user } = useAuth();
  const [formDataLocal, setFormDataLocal] = useState({
    nombres: '',
    apellidos: '',
    telefono: '',
    fechNac: '',
    direccion: '',
    dni: '',
    estado_civil: null,
    rol_id: 5, // El rol es 5 para subadministradores
    afiliador_id: null,
    clinica_id: user.clinica_id,
    fotoPerfil: null,
    Local_id: 2,
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
    setFormDataLocal({ ...formDataLocal, [name]: value });
  };

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

  // Validación del correo electrónico
  const validateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(formDataLocal.correo);
  };

  // Manejo del envío del formulario
  const handleSubmit = async () => {
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
      const response = await axios.post(
        'http://localhost:4000/CreateUsuario',
        formDataLocal
      );
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
        Local_id: 2,
        codigo: null,
        correo: '',
        contraseña: '',
        confirmPassword: ''
      });

      close(); // Cerrar el formulario
    } catch (error) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Hubo un problema al crear el usuario.',
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

  return (
    <Dialog visible={visible} onHide={close} header="Crear Subadministrador">
      <div className="flex flex-column gap-2">
        <Toast ref={toast} />

        {/* Campo DNI */}
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
          <InputText
            id="fechNac"
            name="fechNac"
            value={formDataLocal.fechNac}
            onChange={handleChange}
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
              top: '70%',
              transform: 'translateY(-50%)',
              padding: '0.5em',
              background: 'transparent',
              border: 'none',
              color: '#85C226'
            }}
          />
        </div>

        {/* Confirmar Contraseña */}
        <div className="flex flex-column gap-2" style={{ position: 'relative' }}>
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <InputText
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={formDataLocal.confirmPassword}
            onChange={handleChange}
            placeholder="Confirme la contraseña..."
          />
        </div>

        {/* Botón Crear */}
        <div className="flex justify-content-between pt-4">
          <Button label="Crear" icon="pi pi-arrow-right" iconPos="right" onClick={handleSubmit} />
        </div>
      </div>
    </Dialog>
  );
}
