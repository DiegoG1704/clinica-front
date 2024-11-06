import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Toast } from 'primereact/toast';

export default function CreateUsuario({ Prev, DatosPer, Close }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    ...DatosPer,
    correo: '',
    contraseña: '',
    confirmPassword: ''
  });
  const toast = React.useRef(null);

  // Maneja el cambio en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Alterna el estado de mostrar/ocultar la contraseña
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Validación de contraseñas
  const validatePasswords = () => {
    if (formData.contraseña !== formData.confirmPassword) {
      toast.current.show({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Las contraseñas no coinciden.',
        life: 3000,
      });
      return false;
    }
    return true;
  };

  // Validación del correo electrónico
  const validateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(formData.correo);
  };

  const handleSubmit = async () => {
    // Verificar si las contraseñas coinciden
    if (!validatePasswords()) {
      return; // No continuar si las contraseñas no coinciden
    }

    // Verificar si el correo electrónico es válido
    if (!validateEmail()) {
      toast.current.show({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'El correo electrónico no es válido.',
        life: 3000,
      });
      return;
    }

    try {
      // Envía la solicitud POST al backend
      const response = await axios.post('http://localhost:4000/CreateUsuario', formData);
      
      // Mostrar un mensaje en el Toast con el éxito
      toast.current.show({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Usuario creado exitosamente',
        life: 3000,
      });

      // Limpiar el formulario (opcional)
      setFormData({
        ...DatosPer,
        correo: '',
        contraseña: '',
        confirmPassword: ''
      });
      console.log(response);
      // Cerrar el diálogo o realizar la acción que corresponda
      Close();
    } catch (error) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Hubo un problema al crear el usuario.',
        life: 3000,
      });
    }
  };

  return (
    <div className="flex flex-column gap-2">
      <Toast ref={toast} />
      {/* Campo de Correo */}
      <div className="input-group">
        <label htmlFor="correo">Correo</label>
        <InputText
          id="correo"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          placeholder="Ingresa tu correo"
        />
      </div>

      {/* Campo de Contraseña */}
      <div className="input-group" style={{ position: 'relative' }}>
        <label htmlFor="contraseña">Contraseña</label>
        <InputText
          id="contraseña"
          name="contraseña"
          type={showPassword ? 'text' : 'password'}
          value={formData.contraseña}
          onChange={handleChange}
          placeholder="Ingrese contraseña..."
        />
        <Button
          icon={showPassword ? "pi pi-eye-slash" : "pi pi-eye"}
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

      {/* Campo de Confirmar Contraseña */}
      <div className="input-group" style={{ position: 'relative' }}>
        <label htmlFor="confirmPassword">Confirmar contraseña</label>
        <InputText
          id="confirmPassword"
          name="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirme la contraseña..."
        />
        <Button
          icon={showPassword ? "pi pi-eye-slash" : "pi pi-eye"}
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

      <div className="flex justify-content-between pt-4">
        <div className="flex align-items-center">
          <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={Prev} />
        </div>
        <div className="flex align-items-center">
          <Button label="Crear" icon="pi pi-arrow-right" iconPos="right" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
