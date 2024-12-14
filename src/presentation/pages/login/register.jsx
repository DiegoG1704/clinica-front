import React, { useState, useRef, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './css/Register.css';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { showToast, showToastWithErrors } from '../../utils/showToast';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import TerminosCondiciones from './Register/TerminosCondiciones';
import CustomDialog from '../../components/Dialog/CustomDialog';
import InputInteger from '../../components/Inputs/InputNumberInteger/InputInteger';
import { history } from '../../utils/history';

export default function Register({ onNext }) {
  const { FindPersonWithDni, validateGeneralData, validateCode } = useAuth()
  const toast = useRef(null);


  const [showPassword, setShowPassword] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showPromoterCode, setShowPromoterCode] = useState(false);
  const navigate = useNavigate();
  const { RegisterUser } = useAuth()
  const [errors, setErrors] = useState([])
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get('ref'); // Captura el código de la URL
  const [disableCode, setDisabledCode] = useState(false)
  console.log("code", referralCode)

  const [dataRegister, setDataRegister] = useState({
    dni: "",
    nombres: "",
    apellidos: "",
    direccion: "",
    estadoCivil: "",
    fechNac: "",
    correo: "",
    telefono: "",
    contraseña: "",
    confirmarContraseña: "",
    codigoPromotor: "",
    acceptTermns: false,
    rol_id: 6,
  })
  const validateCodeUser = async () => {
    const response = await validateCode({codigo:referralCode})
    console.log("response",response)
    if (response?.success) {
      setDisabledCode(true)
      setDataRegister({ ...dataRegister, codigoPromotor: referralCode })
    } else {
      history.navigate("/login")
    }
  }
  useEffect(() => {
    if (referralCode) {
      validateCodeUser()
    }

  }, []);
  // useEffect(() => {
  //   if (Object.keys(userData).length === 0) {
  //     navigate("/home")
  //   }
  // })

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleTermsAccept = () => {
    setVisible(false);
    setDataRegister({ ...dataRegister, acceptTermns: true })
  };

  const estadoCivilOptions = [
    { label: 'Soltero(a)', value: 'soltero' },
    { label: 'Casado(a)', value: 'casado' },
    { label: 'Divorciado(a)', value: 'divorciado' },
    { label: 'Viudo(a)', value: 'viudo' },
  ];



  const handleSubmit = async () => {
    const response = await RegisterUser(dataRegister)
    if (response?.success) {
      showToast("success", "Usuario correctamente", "Se ha creado el usuario correctamente", toast)
      navigate('/login');
    } else {
      console.log("resps", response)
      setErrors(response?.error)
      if (response?.otherError?.length > 0) {
        showToastWithErrors("error", 'Error al crear usuario', response?.otherError, toast)
      } else {
        if (response?.error?.[0]?.campo === "acceptTermns") {
          showToastWithErrors("error", 'Error al crear usuario', response?.error, toast)
        }
      }

    }

  };
  const handleChange = (e) => {
    if (hasError(e.target.name)) {
      let newErrors = errors.filter(item => item?.campo !== e.target.name)
      setErrors(newErrors)
    }
    setDataRegister({ ...dataRegister, [e.target.name]: e.target.value })
  }

  const getMessageError = (nameField) => errors?.find(item => item.campo === nameField)?.message || null;
  const hasError = (nameField) => errors?.some(item => item.campo === nameField) || false;

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
          <label htmlFor="dni" className={`${hasError("dni") ? "label-error" : ""}`}>DNI</label>
          <div className="input-button-group">
            <InputInteger
              id="dni"
              name='dni'
              value={dataRegister?.dni}
              onChange={(e) => { e.target.name = "dni"; handleChange(e) }}
              placeholder="Ingresa tu DNI"
              maxLength={8}
              className={`w-full ${hasError("dni") ? "input-error" : ""}`}
              containerClass={"w-full"}

            />


          </div>
          <span className='block message-error '>{getMessageError("dni")}</span>
          <div className='flex align-items-center message-document'>
            <i className='pi pi-exclamation-circle'></i><p>Ingresa tus <span>nombres</span> y <span>apellidos</span> exactamente como se muestran en tu <span>documento</span>.</p></div>
        </div>
        <div className="Gruppo">
          <div className="input-group">
            <label className={`${hasError("nombres") ? "label-error" : ""}`}>Nombres</label>
            <InputText
              id="nombres"
              name='nombres'
              value={dataRegister?.nombres}
              onChange={handleChange}
              placeholder="Ingresa tus nombres"
              className={`w-full ${hasError("nombres") ? "input-error" : ""}`}
            />
            <span className='block message-error '>{getMessageError("nombres")}</span>
          </div>
          <div className="input-group">
            <label className={`${hasError("apellidos") ? "label-error" : ""}`} htmlFor="apellidos">Apellidos</label>
            <InputText
              id="apellidos"
              name='apellidos'
              value={dataRegister?.apellidos}
              onChange={handleChange}
              placeholder="Ingresa tus apellidos"
              className={`w-full ${hasError("apellidos") ? "input-error" : ""}`}
            />
            <span className='block message-error '>{getMessageError("apellidos")}</span>
          </div>
        </div>


        <div className="input-group">
          <label className={`${hasError("direccion") ? "label-error" : ""}`} htmlFor="direccion">Dirección</label>
          <InputText
            id="direccion"
            name='direccion'
            value={dataRegister?.direccion}
            onChange={handleChange}
            placeholder="Ingresa tu dirección"
            className={`w-full ${hasError("direccion") ? "input-error" : ""}`}

          />
          <span className='block message-error '>{getMessageError("direccion")}</span>
        </div>
        <div className="Gruppo">
          <div className="input-group">
            <label htmlFor="estadoCivil" className={`${hasError("estadoCivil") ? "label-error" : ""}`}>Estado Civil</label>
            <Dropdown
              id="estadoCivil"
              name='estadoCivil'
              options={estadoCivilOptions}
              value={dataRegister?.estadoCivil}
              onChange={handleChange}
              placeholder="Selecciona tu estado civil"
              className={`w-full ${hasError("estadoCivil") ? "input-error" : ""}`}

            />
            <span className='block message-error '>{getMessageError("estadoCivil")}</span>
          </div>

          <div className="input-group">
            <label htmlFor="fechNac" className={`${hasError("fechNac") ? "label-error" : ""}`}>Fecha de nacimiento</label>
            <Calendar showIcon id="fecha_mantenimiento"
              name='fechNac'
              value={dataRegister?.fechNac}
              onChange={handleChange}
              className={`input-calendar w-full ${hasError("fechNac") ? "input-error" : ""}`}
              placeholder='00/00/0000'
            />
            <span className='block message-error '>{getMessageError("fechNac")}</span>
          </div>
        </div>

        <div className="Gruppo">
          {/* Correo */}
          <div className="input-group">
            <label className={`${hasError("correo") ? "label-error" : ""}`} htmlFor="correo">Correo</label>
            <InputText
              id="correo"
              name='correo'
              value={dataRegister?.correo}
              onChange={handleChange}
              placeholder="Ingresa tu correo"
              className={`w-full ${hasError("correo") ? "input-error" : ""}`}
            />
            <span className='block message-error '>{getMessageError("correo")}</span>
          </div>

          {/* Teléfono */}
          <div className="input-group">
            <label htmlFor="telefono" className={`${hasError("telefono") ? "label-error" : ""}`}>Teléfono</label>
            <InputInteger
              id="telefono"
              value={dataRegister?.telefono}
              name={"telefono"}
              onChange={(e) => { e.target.name = "telefono"; handleChange(e) }}
              placeholder="Ingresa tu teléfono"
              className={`w-full ${hasError("telefono") ? "input-error" : ""}`}
            />
            <span className='block message-error '>{getMessageError("telefono")}</span>
            {/* <span>Recomendamos incluír un número telefónico, esto permitira verificar tu cuenta y
                    mantenerte a salvo.</span> */}
          </div>
        </div>
        <div className="Gruppo">
          <div className="input-group">
            <label htmlFor="password" className={`${hasError("contraseña") ? "label-error" : ""}`}>Contraseña</label>
            <div className="p-inputgroup">
              <InputText
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Ingrese contraseña..."
                value={dataRegister?.contraseña}
                name={"contraseña"}
                onChange={handleChange}
                className={`w-full ${hasError("contraseña") ? "input-error" : ""}`}
              />

              <Button
                icon={showPassword ? "pi pi-eye-slash" : "pi pi-eye"}
                onClick={toggleShowPassword}
                className="p-button-secondary-Login"
              />
            </div>
            <span className='block message-error '>{getMessageError("contraseña")}</span>
          </div>

          {/* Confirmación de contraseña */}
          <div className="input-group">
            <label htmlFor="confirmPassword" className={`${hasError("confirmarContraseña") ? "label-error" : ""}`}>Confirmar Contraseña</label>
            <div className="p-inputgroup">
              <InputText
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirme contraseña..."
                name='confirmarContraseña'
                value={dataRegister?.confirmarContraseña}
                onChange={handleChange}
                className={`w-full ${hasError("confirmarContraseña") ? "input-error" : ""}`}
              />
              <Button
                icon={showPassword ? "pi pi-eye-slash" : "pi pi-eye"}
                onClick={toggleShowPassword}
                className="p-button-secondary-Login"
              />

            </div>
            <span className='block message-error '>{getMessageError("confirmarContraseña")}</span>
          </div>
        </div>
        {/* Contraseña */}

        <span onClick={() => setShowPromoterCode(!showPromoterCode)}>
          ¿Tiene Codigo de algún Promotor?
        </span>
        {showPromoterCode && (
          <div className="input-group">
            <label htmlFor="codigoPromotor" className={`${hasError("codigoPromotor") ? "label-error" : ""}`}>Código de Promotor</label>
            <InputText
              id="codigoPromotor"
              name='codigoPromotor'
              value={dataRegister?.codigoPromotor} // Puedes cambiar esto por el estado adecuado
              onChange={handleChange} // Puedes usar otro estado para el código del promotor si lo prefieres
              disabled={disableCode}
              className={`w-full ${hasError("codigoPromotor") ? "input-error" : ""}`}

            />
            <span className='block message-error '>{getMessageError("codigoPromotor")}</span>
          </div>

        )}


        {/* Checkbox para aceptar términos */}
        <div className="checkbox-custom">
          <Checkbox
            onChange={e => {
              e.target.name = "acceptTermns";
              e.target.value = e.checked; handleChange(e)
            }}
            checked={dataRegister?.acceptTermns}
            className="custom-checkbox"
          />
          <p>
            Al registrarte aceptas haber leído y estar de acuerdo con la
            <span onClick={() => setVisible(true)} className="terminosLink"> Política
              de Privacidad y los Términos y condiciones</span>
          </p>
        </div>

        <Button label="Registrarse" className="register-button" onClick={handleSubmit} />
      </div>
      {/* Diálogo de términos y condiciones */}
      <CustomDialog title={"TÉRMINOS Y CONDICIONES DEL PROGRAMA MÁS SALUD"}
        iconClassName={"pi pi-file"} visible={visible} width='50vw' height={"90vh"} onhide={() => setVisible(false)}
        footer={<Button label="Aceptar" onClick={handleTermsAccept} />}>
        <TerminosCondiciones />
      </CustomDialog >

    </div>
  );
}
