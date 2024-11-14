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
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'

const ClinicasList = ({ data }) => {
    const [subAdmin, setSubAdmin] = useState(false)
    const [imagen,setImagen] =useState(false)
    const [selectedClinicId, setSelectedClinicId] = useState(null) // Estado para el ID de la clínica seleccionada
    const [selectedCli, setSelectedCli] = useState(null)
    const [searchTerm, setSearchTerm] = useState(''); // Estado para la búsqueda
    const { handleClickEditClinica, editar, setEditar,
        visibleDelete, setVisibleDelete,
        handleClickDeleteClinica, handleDeleteClinica,getAllClinicas,closeEditar } = useClinica()

        // Filtrar los datos de las clínicas basados en el término de búsqueda
    const filteredData = data.filter(clinica => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return (
            clinica.nombre.toLowerCase().includes(lowercasedSearchTerm) ||
            clinica.ruc.toLowerCase().includes(lowercasedSearchTerm) ||
            clinica.direccion.toLowerCase().includes(lowercasedSearchTerm) ||
            clinica.telefono.toLowerCase().includes(lowercasedSearchTerm)
        );
    });

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

    const ImageTemplate = (rowData) =>(
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

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            <div className='flex justify-content-center'>
                <Card style={{ width: '80%', height: '7rem'}}>
                    <InputText
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder='Buscar clinicas afiliadas...'
                        style={{ width: '50%', height: '4rem', borderRadius: '15px' }}
                    />
                </Card>
            </div>
            <div className='flex justify-content-center'>
                <Card style={{ width: '80%', marginTop:'15px' }}>
                    <CustomTable data={filteredData}>
                    <Column header="Nº" body={(rowData, { rowIndex }) => rowIndex + 1} />
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
                </Card>
            </div>

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

            <DialogImage
                visible={imagen}
                close={()=>setImagen(false)}
                datos={selectedCli}
                recarga={getAllClinicas}
            />

        </div>
    )
}

export default ClinicasList;
