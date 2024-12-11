import React, { useRef, useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import TermYCond from '../Componentes/TermYCond';
import { apiAdapter } from '../../../../../core/adapters/apiAdapter';
import { useAuth } from '../../../../context/AuthContext/AuthContext';

export default function AgregarFam({ Open, Close, Actualizar }) {
  const {user} = useAuth();
  const stepperRef = useRef(null);
  const [familiar, setFamiliar] = useState({
    nombres: '',
    apellidos: '',
    dni: '',
    parentesco: '',
    familiar_id:user?.id
  });

  const [isFormValid, setIsFormValid] = useState(false); // Estado para validar el formulario

  const unionOptions = [
    { label: 'Esposo(a)', value: '1' },
    { label: 'Hijo(a)', value: '2' },
  ];

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFamiliar({
      ...familiar,
      [name]: value
    });
  };

  const handleLocalChange = (e) => {
    setFamiliar({ ...familiar, parentesco: e.value }); // Guardar solo el id del local
  };



  // Función para manejar el envío del formulario
  const handleSubmit = async () => {
    console.log(familiar);
    try {
      const response = await apiAdapter.post('/createFam', familiar);
      console.log('Datos ingresados', response);
      setFamiliar({
        nombres: '',
        apellidos: '',
        dni: '',
        parentesco: ''
      });
      Close();
      Actualizar();
    } catch (error) {
      console.log('Problemas al crear la promoción', error);
    }
     // Cerrar el modal después de guardar
  };

  return (
    <Dialog visible={Open} onHide={Close} header="Agregar un Familiar">
      <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
        <StepperPanel>
          <div className="p-fluid">
            <div className="p-field m-2">
              <label htmlFor="dni">DNI</label>
              <InputText
                id="dni"
                name="dni"
                value={familiar.dni}
                onChange={handleChange}
                required
              />
            </div>

            <div className="p-field m-2">
              <label htmlFor="nombres">Nombres</label>
              <InputText
                id="nombres"
                name="nombres"
                value={familiar.nombres}
                onChange={handleChange}
                required
              />
            </div>

            <div className="p-field m-2">
              <label htmlFor="apellidos">Apellidos</label>
              <InputText
                id="apellidos"
                name="apellidos"
                value={familiar.apellidos}
                onChange={handleChange}
                required
              />
            </div>

            <div className="p-field m-2">
              <label htmlFor="unionFamiliar">Unión Familiar</label>
              <Dropdown
                id="unionFamiliar"
                name="unionFamiliar"
                value={familiar.parentesco}
                options={unionOptions}
                onChange={handleLocalChange}
                placeholder="Selecciona una opción"
                required
              />
            </div>
          </div>
          <div className="flex pt-4 justify-content-end">
            <Button
              label="Next"
              icon="pi pi-arrow-right"
              iconPos="right"
              onClick={() => stepperRef.current.nextCallback()}
              
            />
          </div>
        </StepperPanel>
        <StepperPanel>
          <TermYCond />
          <div className="flex pt-4 justify-content-between">
            <Button
              className="ButtonBack"
              label="Back"
              severity="secondary"
              icon="pi pi-arrow-left"
              onClick={() => stepperRef.current.prevCallback()}
            />
            <Button label="Agregar" iconPos="right" onClick={handleSubmit} />
          </div>
        </StepperPanel>
      </Stepper>
    </Dialog>
  );
}
