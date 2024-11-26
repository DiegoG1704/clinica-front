import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import './css/Register.css';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { showToast, showToastWithErrors } from '../../utils/showToast';
import { Calendar } from 'primereact/calendar';

export default function Register({ onNext }) {
  const { FindPersonWithDni, validateGeneralData } = useAuth()
  const toast = useRef(null);
  const [dni, setDni] = useState('');
  const [nombres, setnombres] = useState('');
  const [apellidos, setapellidos] = useState('');
  const [direccion, setdireccion] = useState('');
  const [estadoCivil, setestadoCivil] = useState('');
  const [fechNac, setfechNac] = useState('');
  const [loading, setLoading] = useState(false);

  const estadoCivilOptions = [
    { label: 'Soltero(a)', value: 'soltero' },
    { label: 'Casado(a)', value: 'casado' },
    { label: 'Divorciado(a)', value: 'divorciado' },
    { label: 'Viudo(a)', value: 'viudo' },
  ];
  const navigate = useNavigate();

  const handleValidateDni = async () => {
    setLoading(true);
    try {
      const dataPerson = await FindPersonWithDni(dni)
      console.log("pe",dataPerson)
      if (dataPerson.success) {
        const { nombres, apellidos } = dataPerson.data;
        setnombres(nombres);
        setapellidos(apellidos);
        showToast("success", 'Éxito', 'Datos encontrados', toast)
      }
      else {
        showToastWithErrors("error", 'Advertencia', dataPerson?.error, toast)
      }
    } catch (error) {
      console.log("enre", error)
      showToastWithErrors("error", 'Advertencia', error, toast)
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = () => {
    // Asegúrate de enviar solo la parte de la fecha
    const formattedDate = fechNac ? fechNac.toISOString().split('T')[0] : ''; 
  
    const userData = {
      dni,
      nombres,
      apellidos,
      direccion,
      estadoCivil,
      fechNac: formattedDate,  // Aquí formateas la fecha
    };
  
    // Envías userData a la API
    onNext(userData);
    navigate('/DatosU');
  };
  



  return (
    <div className="register-container">
      <Toast ref={toast} />
      <Button
        icon="pi pi-chevron-left"
        className="back-button"
        onClick={() => navigate('/login')}
        aria-label="Retroceder"
      />
      <div className="login-link">
        <div>
          <label>¿Ya tienes una cuenta?</label>
          <a className='Iniciar' onClick={() => navigate('/login')}>Inicia sesión</a>
        </div>
        <a>¿Olvidaste tu ID o contraseña?</a>
      </div>
      <div className="register-box">
        <h1 className="register-title">Crear Cuenta</h1>
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
            />
            <Button
              label={loading ? 'Validando...' : 'Validar'}
              className="validate-button"
              onClick={handleValidateDni}
              disabled={loading}
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="nombres">Nombres</label>
          <InputText
            id="nombres"
            value={nombres}
            onChange={(e) => setnombres(e.target.value)}
            placeholder="Ingresa tus nombres"
          />
        </div>

        <div className="input-group">
          <label htmlFor="apellidos">Apellidos</label>
          <InputText
            id="apellidos"
            value={apellidos}
            onChange={(e) => setapellidos(e.target.value)}
            placeholder="Ingresa tus apellidos"
          />
        </div>

        <div className="input-group">
          <label htmlFor="direccion">Dirección</label>
          <InputText
            id="direccion"
            value={direccion}
            onChange={(e) => setdireccion(e.target.value)}
            placeholder="Ingresa tu dirección"
            className="register-input"
          />
        </div>

        <div className="input-group">
          <label htmlFor="estadoCivil">Estado Civil</label>
          <Dropdown
            id="estadoCivil"
            value={estadoCivil}
            options={estadoCivilOptions}
            onChange={(e) => setestadoCivil(e.value)}
            placeholder="Selecciona tu estado civil"
            className="register-input"
          />
        </div>

        <div className="input-group">
          <label htmlFor="fechNac">Fecha de nacimiento</label>
          <Calendar showIcon id="fecha_mantenimiento"
            value={fechNac}
            onChange={(e) => setfechNac(e.target.value)}
            className='input-calendar'
          />
        </div>

        <Button label="Siguiente" className="register-button" onClick={handleSubmit} />
      </div>

    </div>
  );
}
