import React, { useState } from 'react'
import CustomTable from '../../../../components/Table/CustomTable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import DialogUser from './DialogUser'
import DialogEditarClinica from './DialogEditar'
import { useClinica } from '../../../../context/ClinicaContext/ClinicaContext'
import { ConfirmDialog } from 'primereact/confirmdialog'
import DialogImage from './DialogImage'

const ClinicasList = ({ data }) => {
    const [subAdmin, setSubAdmin] = useState(false)
    const [imagen, setImagen] = useState(false)
    const [selectedClinicId, setSelectedClinicId] = useState(null) // Estado para el ID de la clínica seleccionada
    const [selectedCli, setSelectedCli] = useState(null)
    const { handleClickEditClinica, editar, setEditar,
        visibleDelete, setVisibleDelete,
        handleClickDeleteClinica,
        handleDeleteClinica, getAllClinicas,
        closeEditar, handleCLickAdminUser, setCurrentUser } = useClinica()

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
                    console.log("ddaaa", rowData?.id)
                    handleCLickAdminUser(rowData?.id)
                    setSubAdmin(true); // Mostrar el diálogo
                }}
            />
        </div>
    );

    const ImageTemplate = (rowData) => (
        <div className='flex gap-2'>
            <Button
                icon="pi pi-images"
                className="bg-teal-500 border-none shadow-none"
                style={{ color: "white", borderRadius: '40px' }}
                onClick={() => {
                    setSelectedCli(rowData); // Al hacer clic, se establece el ID de la clínica
                    setImagen(true); // Mostrar el diálogo
                }}
            />
        </div>
    );

    // Función para mostrar solo las primeras 5 palabras de la dirección
    const truncateAddress = (address) => {
        const words = address.split(' '); // Divide la dirección en palabras
        const truncated = words.slice(0, 5).join(' '); // Toma las primeras 5 palabras
        return truncated;
    }
    const handleClose = () => {
        setSubAdmin(false)
        setCurrentUser({})

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
                <Column header="Dirección" body={(rowData) => truncateAddress(rowData.direccion)} />
                <Column header="Telefono" field='telefono' />
                <Column header="Sub-Admin" body={UserTemplate} />
                <Column header="Agregaar Imagen" body={ImageTemplate} />
                <Column body={actionsTemplate} />
            </CustomTable>

            {/* Dialog para Sub-Admin con el ID de la clínica */}
            <DialogUser
                visible={subAdmin}
                close={handleClose}
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

            <DialogImage
                visible={imagen}
                close={() => setImagen(false)}
                datos={selectedCli}
                recarga={getAllClinicas}
            />

        </div>
    )
}

export default ClinicasList;
