import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React from 'react'
import { useClinica } from '../../../../../context/ClinicaContext/ClinicaContext'
import InputInteger from '../../../../../components/Inputs/InputNumberInteger/InputInteger'

const ClinicaItem = ({ Next }) => {
    const { handleChangeClinica, findDataByRuc, clinica } = useClinica()
    return (
        <div>
            <div className="flex flex-column ">
                {/* Campo RUC */}
                <div className="input-group">
                    <label htmlFor="ruc">RUC</label>
                    <div className="input-button-group">
                        {/* <InputText
                            id="ruc"
                            name="ruc"
                            onChange={handleChangeClinica}
                            type='number'

                            placeholder="Ingresar  RUC"
                            maxLength={11}
                        /> */}
                        <InputText
                            placeholder={"Ingresar RUC"} className="w-full" keyfilter="int"
                            onChange={(e) => { e.target.name = "ruc";; handleChangeClinica(e) }} maxLength={11} minLength={1} value={clinica?.ruc}
                        />
                        {/* <InputInteger /> */}
                        <Button
                            className="validate-button"
                            label='Buscar'
                            onClick={findDataByRuc}

                        />
                    </div>
                </div>
                {/* Nombre */}
                <div className="input-group">
                    <label htmlFor="ruc">Nombre</label>
                    <div className="input-button-group">
                        <InputText
                            id="ruc"
                            name="nombre"
                            value={clinica?.nombre}
                            placeholder="Ingresar razón social"
                            onChange={handleChangeClinica}
                        />
                    </div>
                </div>
                {/* Dirección */}
                <div className="input-group">
                    <label htmlFor="ruc">Direccion</label>
                    <div className="input-button-group">
                        <InputText
                            id="ruc"
                            value={clinica?.direccion}
                            name="direccion"
                            placeholder="Ingresar dirección"
                            onChange={handleChangeClinica}
                        />
                    </div>
                </div>

                {/* Ubicación (Departamento) */}
                <div className="input-group">
                    <label htmlFor="ruc">Ubicación</label>
                    <div className="input-button-group">
                        <InputText
                            id="ruc"
                            value={clinica?.ubicacion}
                            name="ubicacion"
                            placeholder="Ingresar ubicación"

                            onChange={handleChangeClinica}
                        />
                    </div>

                </div>
                {/* Teléfonos */}
                <div className="input-group">
                    <label htmlFor="ruc">Télefono</label>
                    <div className="input-button-group">
                        <InputText
                            value={clinica?.telefono}
                            id="ruc"
                            name="telefono"
                            placeholder="Ingresar télefono"
                            onChange={(e) => { e.target.name = "telefono"; handleChangeClinica(e) }}
                            className="w-full" 
                            maxLength={9}
                            keyfilter="int"

                        />

                    </div>

                </div>


            </div>



        </div>

    )
}

export default ClinicaItem
