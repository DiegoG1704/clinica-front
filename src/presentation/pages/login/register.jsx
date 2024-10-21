import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Register.css';

export default function Register({ onNext }) {
  const toast = useRef(null);
  const [dni, setDni] = useState('');
  const [nombres, setnombres] = useState('');
  const [apellidos, setapellidos] = useState('');
  const [direccion, setdireccion] = useState('');
  const [estado_civil, setestadoCivil] = useState(null);
  const [fechNac, setfechNac] = useState('');
  const [loading, setLoading] = useState(false);

  const estadoCivilOptions = [
    { label: 'Soltero(a)', value: 'Soltero' },
    { label: 'Casado(a)', value: 'Casado' },
    { label: 'Divorciado(a)', value: 'Divorciado' },
    { label: 'Viudo(a)', value: 'iudo' },
  ];

  const navigate = useNavigate();

  const handleValidateDni = async () => {
    if (!dni) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Por favor ingresa un DNI' });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `https://dniruc.apisperu.com/api/v1/dni/${dni}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRnc3QxNzA0QGdtYWlsLmNvbSJ9.4MWOq0VPNPDODZpUXh3p2MoG55I6hSBLSMzEFvT7es0`
      );

      if (response.data) {
        const { nombres, apellidoPaterno, apellidoMaterno } = response.data;
        setnombres(nombres);
        setapellidos(`${apellidoPaterno} ${apellidoMaterno}`);
        console.log('Datos de la API:', response.data);
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Datos encontrados' });
      }
       else {
        toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'No se encontraron datos para el DNI ingresado' });
      }
    } catch (error) {
      console.error('Error al validar el DNI:', error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Hubo un error al validar el DNI' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!dni || !nombres || !apellidos || !direccion || !estado_civil || !fechNac) {
      toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, completa todos los campos' });
      return;
    }
  
    const userData = { dni, nombres, apellidos, direccion, estado_civil, fechNac };
    console.log('Datos del usuario:', userData); // Verifica que los nombres se están enviando correctamente
    
    if (typeof onNext === 'function') {
      onNext(userData); // Pass data to parent
    } else {
      console.warn('onNext is not a function');
    }
  
    navigate('/DatosU');
  };
  
  

  return (
    <div className="register-container">
      <Toast ref={toast} />
      <Button 
          icon="pi pi-chevron-left" 
          className="back-button" 
          onClick={()=> navigate('/login')} 
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
            value={estado_civil}
            options={estadoCivilOptions}
            onChange={(e) => setestadoCivil(e.value)}
            placeholder="Selecciona tu estado civil"
            className="register-input"
          />
        </div>

        <div className="input-group">
          <label htmlFor="fechNac">Fecha de nacimiento</label>
          <InputText
            type='date'
            className="register-input"
            id="fechNac"
            value={fechNac}
            onChange={(e) => setfechNac(e.target.value)}
          />
        </div>

        <Button label="Siguiente" className="register-button" onClick={handleSubmit} />
      </div>
      
    </div>
  );
}
