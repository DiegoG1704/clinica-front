import React, { useState,useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import './css/Register.css'; // Assuming your styles go here
import { useNavigate } from 'react-router-dom';
import { Checkbox } from "primereact/checkbox";
import axios from 'axios'; // Importar axios
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';

export default function Register() {
  const toast = useRef(null);
  const [dni, setDni] = useState('');
  const [firstName, setFirstName] = useState(''); // Nombre
  const [lastName, setLastName] = useState('');   // Apellidos
  const [address, setAddress] = useState('');
  const [civilStatus, setCivilStatus] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [loading, setLoading] = useState(false); // Estado para controlar el loading
  const [visible,setvisible]=useState(false)

  const civilStatusOptions = [
    { label: 'Soltero(a)', value: 'soltero' },
    { label: 'Casado(a)', value: 'casado' },
    { label: 'Divorciado(a)', value: 'divorciado' },
    { label: 'Viudo(a)', value: 'viudo' },
  ];

  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  const handleRegister = () => {
    navigate('/'); // Redirige a la ruta de registro
  };

  const Confirmacion = () =>{
    setChecked(true)
    setvisible(false)
  }

  const handleValidateDni = async () => {
    if (!dni) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Por favor ingresa un DNI' });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `https://dniruc.apisperu.com/api/v1/dni/${dni}?token=tu_token_aqui`
      );

      if (response.data) {
        const { nombres, apellidoPaterno, apellidoMaterno } = response.data;
        setFirstName(nombres);
        setLastName(`${apellidoPaterno} ${apellidoMaterno}`);
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Datos encontrados' });
      } else {
        toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'No se encontraron datos para el DNI ingresado' });
      }
    } catch (error) {
      console.error('Error al validar el DNI:', error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Hubo un error al validar el DNI' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
       <Toast ref={toast} />
      <div className="register-box">
        <h1 className="register-title">Registrar Datos personales</h1>
        <p className="register-subtitle">
          Crea tu cuenta en MasSalud y accede a las mejores ofertas en tratamientos, consultas y mucho más.
        </p>

        <div className="input-group">
          <label htmlFor="dni">DNI</label>
          <div className="input-button-group">
            <InputText
              id="dni"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              placeholder="Ingresa tu DNI"
              className="register-input"
            />
            <Button
              label={loading ? 'Validando...' : 'Validar'}
              className="validate-button"
              onClick={handleValidateDni}
              disabled={loading} // Deshabilita el botón mientras se realiza la validación
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="firstName">Nombres</label>
          <InputText
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Ingresa tus nombres"
            className="register-input"
            readOnly // Marcar como solo lectura
          />
        </div>

        <div className="input-group">
          <label htmlFor="lastName">Apellidos</label>
          <InputText
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Ingresa tus apellidos"
            className="register-input"
            readOnly // Marcar como solo lectura
          />
        </div>

        <div className="input-group">
          <label htmlFor="address">Dirección</label>
          <InputText
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Ingresa tu dirección"
            className="register-input"
          />
        </div>

        <div className="input-group">
          <label htmlFor="civilStatus">Estado Civil</label>
          <Dropdown
            id="civilStatus"
            value={civilStatus}
            options={civilStatusOptions}
            onChange={(e) => setCivilStatus(e.value)}
            placeholder="Selecciona tu estado civil"
            className="register-input"
          />
        </div>

        <div className="input-group">
          <label htmlFor="birthDate">Fecha de nacimiento</label>
          <InputText
            type='date'
            showIcon
            className="register-input"
            placeholder="Selecciona tu fecha de nacimiento"
            id="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>

        <div className="checkbox-custom">
          <Checkbox
            onChange={e => setChecked(e.checked)}
            checked={checked}
            className="p-checkbox"
          />
          <a onClick={()=>setvisible(true)}>Política de Privacidad y Términos y condiciones</a>
        </div>

        <Button label="Siguiente" className="register-button" />
      </div>

      <div className="login-link">
        <label>¿Ya tienes una cuenta?</label>
        <a onClick={handleRegister}>Inicia sesión</a>
      </div>
      <Dialog visible={visible} onHide={()=>setvisible(false)}>
        <div>
          <h1>Términos y condiciones</h1>
          <Button label='Aceptar' onClick={Confirmacion}/>
        </div>
      </Dialog>
    </div>
  );
}
