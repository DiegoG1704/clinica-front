import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { useClinica } from '../../../../context/ClinicaContext/ClinicaContext';

export default function CreateUsuario({ Prev, DatosPer, Close }) {
  const {clinicaAdministrador,handleChangeUserAdmin}=useClinica()
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
     setShowPassword(!showPassword);
   };

  return (
    <div className="flex flex-column gap-2">

      {/* Campo de Correo */}
      <div className="input-group">
        <label htmlFor="correo">Correo</label>
        <InputText
          id="correo"
          name="correo"
          value={clinicaAdministrador.correo}
          onChange={handleChangeUserAdmin}
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
          value={clinicaAdministrador.contraseña}
          onChange={handleChangeUserAdmin}
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
          name="confirmarContraseña"
          type={showPassword ? 'text' : 'password'}
          value={clinicaAdministrador.confirmarContraseña}
          onChange={handleChangeUserAdmin}
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

      {/* <div className="flex justify-content-between pt-4">
        <div className="flex align-items-center">
          <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={Prev} />
        </div>
        <div className="flex align-items-center">
          <Button label="Crear" icon="pi pi-arrow-right" iconPos="right" onClick={handleSubmit} />
        </div>
      </div> */}
    </div>
  );
}
