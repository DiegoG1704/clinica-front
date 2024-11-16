import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { useClinica } from '../../../../context/ClinicaContext/ClinicaContext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import InputInteger from '../../../../components/Inputs/InputNumberInteger/InputInteger';

export default function CreateAdmin({ Next, Prev, idClinica, onNext, formData }) {
  const estadoCivilOptions = [
    { label: 'Soltero(a)', value: 'soltero' },
    { label: 'Casado(a)', value: 'casado' },
    { label: 'Divorciado(a)', value: 'divorciado' },
    { label: 'Viudo(a)', value: 'viudo' },
  ];
  const { clinicaAdministrador, handleChangeUserAdmin, findDataByDni } = useClinica()



  // Mandar los datos a CreateUsuario a través de onNext


  return (
    <div className="flex flex-column ">

      <div className="input-group">
        <label htmlFor="dni">DNI</label>
        <div className="input-button-group">
          <InputInteger
            value={clinicaAdministrador?.dni}
            name="dni"
            placeholder="Ingresa el DNI"
            maxLength={8}
            onChange={(e)=>{e.target.name="dni";handleChangeUserAdmin(e)}}
            className={"w-full"}
            containerClass={"w-full"}
          
          />
          <Button
            className="validate-button"
            label='Buscar'
            onClick={findDataByDni}
          />
        </div>

      </div>

      {/* Nombres */}
      <div className="input-group">
        <label htmlFor="dni">Nombres</label>
        <div className="input-button-group">
          <InputText
            value={clinicaAdministrador?.nombres}
            name="nombres"
            placeholder="Ingresa nombres"
            onChange={handleChangeUserAdmin}

          />
        </div>
      </div>
      {/* Apellidos */}
      <div className="input-group">
        <label htmlFor="dni">Apellidos</label>
        <div className="input-button-group">
          <InputText
            value={clinicaAdministrador?.apellidos}
            name="apellidos"
            onChange={handleChangeUserAdmin}

            placeholder="Ingresa apellidos"
            
          />
        </div>

      </div>
      <div className="input-group">
        <label htmlFor="dni">Estado civil</label>

        <Dropdown
          id="estadoCivil"
          name='estadoCivil'
          value={clinicaAdministrador?.estadoCivil}
          options={estadoCivilOptions}
          onChange={handleChangeUserAdmin}
          placeholder="Selecciona tu estado civil"
          className="register-input"
        />

      </div>

      {/* Dirección */}
      <div className="input-group">
        <label htmlFor="dni">Dirección</label>
        <div className="input-button-group">
          <InputText
            onChange={handleChangeUserAdmin}
            name="direccion"
            value={clinicaAdministrador?.direccion}
            placeholder="Ingresa dirección"

          />
        </div>

      </div>
      {/* Dirección */}
      <div className="input-group">
        <label htmlFor="dni">Télefono</label>
        <div className="input-button-group">
          <InputText
            onChange={handleChangeUserAdmin}
            name="telefono"
            value={clinicaAdministrador?.telefono}
            placeholder="Ingresa dirección"
            maxLength={9}

          />
        </div>

      </div>
      {/* Fecha de Nacimiento */}
      <div className="input-group">
        <label htmlFor="dni">Fecha Nacimiento</label>
        <div className="input-button-group">
          <Calendar showIcon id="fecha_mantenimiento"
            value={clinicaAdministrador?.fechNac}
            className='input-calendar w-full'
            onChange={handleChangeUserAdmin}
            name='fechNac'
          />
        </div>

      </div>
      {/* <div className="flex justify-content-between pt-4">
        <div className="flex align-items-center">
          <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={Prev} />
        </div>
        <div className="flex align-items-center">
          <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={handleSubmit} />
        </div>
      </div> */}
    </div>
  );
}
