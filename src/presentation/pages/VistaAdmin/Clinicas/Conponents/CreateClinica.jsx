import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import axios from 'axios';

export default function CreateClinica({ Next,onNext }) {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    ruc: '',
    ubicacion: '',
    telefonos: '',
    ImagoTipo: null,
    IsoTipo: null
  });

  const [isRucValid, setIsRucValid] = useState(false);
  const [rucError, setRucError] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useRef(null); // Para notificaciones

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validar que solo se ingresen números en el campo de teléfono
    if (name === "telefonos" && /[^0-9]/.test(value)) {
      return; // Si el valor contiene algo que no es número, no actualizar el estado
    }
    setFormData({ ...formData, [name]: value });
  };

  // Validar el RUC y rellenar campos
  const validateRuc = async () => {
    const { ruc } = formData;
    if (!ruc || ruc.length !== 11) {
      setRucError('El RUC debe tener 11 dígitos');
      setIsRucValid(false);
      return;
    }
    setLoading(true);
    setRucError('');
    try {
      // Llamada a la API para obtener los datos del RUC
      const response = await axios.get(`https://dniruc.apisperu.com/api/v1/ruc/${ruc}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRnc3QxNzA0QGdtYWlsLmNvbSJ9.4MWOq0VPNPDODZpUXh3p2MoG55I6hSBLSMzEFvT7es0`);
      
      if (response.data) {
        const { razonSocial, direccion, departamento } = response.data;
        
        // Poblar los campos con los datos obtenidos
        setFormData({
          ...formData,
          nombre: razonSocial || '',
          direccion: direccion || '',
          ubicacion: departamento || '',
        });
        
        setIsRucValid(true);
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'RUC válido y campos llenados', life: 3000 });
      } else {
        setIsRucValid(false);
        setRucError('El RUC no es válido');
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'RUC no encontrado', life: 3000 });
      }
    } catch (error) {
      setIsRucValid(false);
      setRucError('Hubo un error al validar el RUC');
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error en la validación del RUC', life: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!isRucValid) {
      toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, valida el RUC antes de continuar.', life: 3000 });
      return;
    }
    if (!formData.nombre || !formData.direccion || !formData.ubicacion) {
      toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Todos los campos obligatorios deben estar llenos.', life: 3000 });
      return;
    }
  
    try {
      // Envía la solicitud POST al backend
      const response = await axios.post('http://localhost:4000/CreateClinica', formData);
  
      const { id } = response.data; // Obtener el id de la clínica recién creada
      console.log('ID de la clínica recién creada:', id); // Imprime el id en la consola
  
      // Mostrar un mensaje en el Toast con el id
      toast.current.show({
        severity: 'success',
        summary: 'Éxito',
        detail: `Clínica creada exitosamente con ID: ${id}`,
        life: 3000,
      });
  
      onNext(id); // Llama a la función onNext con el id creado para pasar al siguiente paso
      Next(); // Avanza al siguiente paso
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Hubo un problema al crear la clínica.', life: 3000 });
    }
  };
  
  return (
    <div className="flex flex-column gap-2">
      <Toast ref={toast} />

      {/* Campo RUC */}
      <div className="input-group">
        <label htmlFor="ruc">RUC</label>
        <div className="input-button-group">
          <InputText
            id="ruc"
            name="ruc"
            value={formData.ruc}
            onChange={handleChange}
            placeholder="Ingresa el RUC"
            maxLength={11}
          />
          <Button
            label={loading ? 'Validando...' : 'Validar'}
            className="validate-button"
            onClick={validateRuc}
            disabled={loading}
          />
        </div>
        {rucError && <small className="p-error">{rucError}</small>}
      </div>

      {/* Nombre */}
      <div className="flex flex-column gap-2">
        <label htmlFor="nombre">Nombre</label>
        <InputText
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>

      {/* Dirección */}
      <div className="flex flex-column gap-2">
        <label htmlFor="direccion">Dirección</label>
        <InputText
          id="direccion"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
        />
      </div>

      {/* Ubicación (Departamento) */}
      <div className="flex flex-column gap-2">
        <label htmlFor="ubicacion">Ubicación</label>
        <InputText
          id="ubicacion"
          name="ubicacion"
          value={formData.ubicacion}
          onChange={handleChange}
        />
      </div>

      {/* Teléfonos */}
      <div className="flex flex-column gap-2">
        <label htmlFor="telefonos">Teléfonos</label>
        <InputText
          id="telefonos"
          name="telefonos"
          value={formData.telefonos}
          onChange={handleChange}
          placeholder="Ingresa los teléfonos"
        />
      </div>

      {/* Botón Next */}
      <div className="flex pt-4 justify-content-end">
        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={handleSubmit} />
      </div>
    </div>
  );
}