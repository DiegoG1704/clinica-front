import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import axios from 'axios';

export default function CreateAdmin({ Next, Prev, idClinica, onNext, formData }) {
  const [formDataLocal, setFormDataLocal] = useState(formData || {
    nombres: '',
    apellidos: '',
    telefono: '',
    fechNac: '',
    direccion: '',
    dni: '',
    estado_civil: null,
    rol_id: 2,
    afiliador_id: null,
    clinica_id: idClinica,
    fotoPerfil: null,
    Local_id: null,
    codigo: null,
  });
  console.log('idclin', idClinica);

  const [dniError, setDniError] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = React.useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataLocal({ ...formDataLocal, [name]: value });
  };

  const validateDni = async () => {
    const { dni } = formDataLocal;
    if (!dni || dni.length !== 8) {
      setDniError('El DNI debe tener 8 dígitos');
      return;
    }

    setLoading(true);
    setDniError('');

    try {
      const response = await axios.get(`https://dniruc.apisperu.com/api/v1/dni/${dni}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRnc3QxNzA0QGdtYWlsLmNvbSJ9.4MWOq0VPNPDODZpUXh3p2MoG55I6hSBLSMzEFvT7es0`);
      if (response.data) {
        const { nombres, apellidoPaterno, apellidoMaterno } = response.data;
        setFormDataLocal({
          ...formDataLocal,
          nombres: nombres || '',
          apellidos: `${apellidoPaterno} ${apellidoMaterno}` || '',
        });
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'DNI válido, campos llenados', life: 3000 });
      } else {
        setDniError('DNI no válido');
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'DNI no encontrado', life: 3000 });
      }
    } catch (error) {
      setDniError('Hubo un error al validar el DNI');
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error en la validación del DNI', life: 3000 });
    } finally {
      setLoading(false);
    }
  };

  // Mandar los datos a CreateUsuario a través de onNext
  const handleSubmit = () => {
    onNext(formDataLocal);
    console.log('Datos', formDataLocal);
    Next();
  };

  return (
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

      <div className="flex justify-content-between pt-4">
        <div className="flex align-items-center">
          <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={Prev} />
        </div>
        <div className="flex align-items-center">
          <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
