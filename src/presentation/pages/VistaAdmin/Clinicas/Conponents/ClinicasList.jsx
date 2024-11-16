import React, { useState } from 'react'
import CustomTable from '../../../../components/Table/CustomTable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import DialogUser from './DialogUser'
import DialogEditarClinica from './DialogEditar'
import { useClinica } from '../../../../context/ClinicaContext/ClinicaContext'
import { ConfirmDialog } from 'primereact/confirmdialog'

const ClinicasList = ({ data }) => {
    const [subAdmin, setSubAdmin] = useState(false)

    const [selectedClinicId, setSelectedClinicId] = useState(null) // Estado para el ID de la clínica seleccionada
    const { handleClickEditClinica, editar, setEditar,
        visibleDelete, setVisibleDelete,
        handleClickDeleteClinica, handleDeleteClinica } = useClinica()

    const LogoRowTemplate = (rowData) => {
        return (<img src={rowData.logo} alt={rowData.nombre} width="60" className='border-round-sm' />)
    }

    const actionsTemplate = (rowData) => (
        <div className='flex gap-2'>
            <Button icon="pi pi-pencil"
                className="bg-white border-none shadow-none"
                style={{ color: "#85C226" }}
                onClick={() => {
                    handleClickEditClinica(rowData)
                    setEditar(true) // Abrir el diálogo para editar
                }} />
            <Button icon="pi pi-trash" className="bg-white border-none shadow-none" style={{ color: "#85C226" }} onClick={() => {
                handleClickDeleteClinica(rowData)
                
            }} /> 
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
    const closeEditar = () => {
        setEditar(false)
    }

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
                onhiden={closeEditar}
                idClinica={selectedClinicId}
            />
            <ConfirmDialog
                visible={visibleDelete}
                header="Confirmación de Eliminación"
                message={"¿Estás seguro de eliminar la clínica?"}
                acceptLabel='Sí'
                onHide={() => { setVisibleDelete(false) }}
                accept={handleDeleteClinica}
            />

        </div>
    )
}

export default ClinicasList;
