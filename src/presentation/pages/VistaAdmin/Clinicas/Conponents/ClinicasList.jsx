import React, { useState } from 'react'
import CustomTable from '../../../../components/Table/CustomTable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import DialogUser from './DialogUser'
import DialogEditarClinica from './DialogEditar'

const ClinicasList = ({ data }) => {
    const [subAdmin, setSubAdmin] = useState(false)
    const [editar,setEditar] = useState(false)
    const [selectedClinicId, setSelectedClinicId] = useState(null) // Estado para el ID de la clínica seleccionada
    console.log('data',data)
    const LogoRowTemplate = (rowData) => {
        return (<img src={rowData.logo} alt={rowData.nombre} width="60" className='border-round-sm' />)
    }

    const actionsTemplate = (rowData) => (
        <div className='flex gap-2'>
            <Button icon="pi pi-pencil" 
                className="bg-white border-none shadow-none" 
                style={{ color: "#85C226" }} 
                onClick={() => {
                    setSelectedClinicId(rowData.id); // Asignar el id de la clínica seleccionada
                    setEditar(true) // Abrir el diálogo para editar
                }} />
            <Button icon="pi pi-trash" className="bg-white border-none shadow-none" style={{ color: "#85C226" }} />
        </div>
    );

    const UserTemplate = (rowData) => (
        <div className='flex gap-2'>
            <Button
                icon="pi pi-user"
                className="bg-blue-600 border-none shadow-none"
                style={{ color: "white", borderRadius: '40px' }}
                onClick={() => {
                    setSelectedClinicId(rowData.id); // Al hacer clic, se establece el ID de la clínica
                    setSubAdmin(true); // Mostrar el diálogo
                }}
            />
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
                <Column header="Dirección" field='direccion' />
                <Column header="Telefono" field='telefono' />
                <Column header="Sub-Admin" body={UserTemplate} />
                <Column body={actionsTemplate} />
            </CustomTable>

            {/* Dialog para Sub-Admin con el ID de la clínica */}
            <DialogUser
                visible={subAdmin}
                close={() => setSubAdmin(false)}
                idClinica={selectedClinicId}  // Pasar el ID de la clínica al componente DialogUser
            />
            <DialogEditarClinica
                visible={editar}
                onhide={()=>setEditar(false)}
                idClinica={selectedClinicId}
            />

        </div>
    )
}

export default ClinicasList;
