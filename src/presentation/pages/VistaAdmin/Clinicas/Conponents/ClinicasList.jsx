import React from 'react'
import CustomTable from '../../../../components/Table/CustomTable'
import { Column } from 'primereact/column'
const ClinicasList = ({data}) => {

    const LogoRowTemplate = (rowData) => {
        return (<img src={rowData.imagen} alt={rowData.nombre} width="60" className='border-round-sm' />)
    }
    return (
        <div>
            <CustomTable>
                <Column
                    header="Imagen"
                    body={LogoRowTemplate}
                />
                <Column header="RUC" field='' />
                <Column header="Razón Social" />
                <Column header="Dirección" />
                <Column header="Telefono" />
                <Column header="Hola" />

            </CustomTable>
        </div>
    )
}

export default ClinicasList
