import React from 'react'
import CustomTable from '../../../../components/Table/CustomTable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
const ClinicasList = ({data}) => {
    console.log("daa",data)

    const LogoRowTemplate = (rowData) => {
        console.log("ss",rowData)
        return (<img src={rowData.logo} alt={rowData.nombre} width="60" className='border-round-sm' />)
    }

    
    const actionsTemplate = (rowData) => (
        <div className='flex gap-2'>
            <Button icon="pi pi-pencil" className="bg-white border-none shadow-none" style={{ color: "#85C226" }} />
            <Button icon="pi pi-trash" className="bg-white border-none shadow-none" style={{ color: "#85C226" }} />
        </div>
    );
    return (
        <div>
            <CustomTable data={data}>
                <Column
                    header="Imagen"
                    body={LogoRowTemplate}
                />
                <Column header="RUC" field='ruc' />
                <Column header="Razón Social" field='nombre' />
                <Column header="Dirección" field='direccion'/>
                <Column header="Telefono" field='telefono'/>
                <Column  body={actionsTemplate}/>

            </CustomTable>
        </div>
    )
}

export default ClinicasList
