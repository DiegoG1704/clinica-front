import React, { useState } from 'react'
import CustomTable from '../../../../components/Table/CustomTable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Card } from 'primereact/card'
const SubLocalesList = ({ data, fnEdit,FnDelete }) => {
    const [searchTerm, setSearchTerm] = useState(''); // Estado para la búsqueda
    const filteredData = data.filter(local => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return (
            local.nombre.toLowerCase().includes(lowercasedSearchTerm) ||
            local.direccion.toLowerCase().includes(lowercasedSearchTerm)
        );
    });
    const actionsTemplate = (rowData) => (
        <div className='flex gap-2'>
            <Button icon="pi pi-pencil" className="bg-white border-none shadow-none" style={{ color: "#85C226" }} onClick={()=>{handleClickEdit(rowData)}}/>
            <Button icon="pi pi-trash" className="bg-white border-none shadow-none" style={{ color: "red" }} onClick={()=>{handleClickDelete(rowData)}} />
        </div>
    );
    const handleClickEdit = (dataLocal) => {
        console.log("rwu",dataLocal)
        fnEdit(dataLocal)
    }
    const handleClickDelete = (id) => {
      FnDelete(id)
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
                    placeholder='Buscar subLocal...'
                    style={{ width: '50%', height: '4rem', borderRadius: '15px' }}
                />
                </Card>
            </div>
            <div className='flex justify-content-center'>
                <Card style={{ width: '80%', marginTop:'15px' }}>
                    <CustomTable data={filteredData}>
                        <Column header="Nº" body={(rowData, { rowIndex }) => rowIndex + 1} />
                        <Column header="Nombre" field='nombre' />
                        <Column header="Dirección" field='direccion' />
                        <Column body={actionsTemplate} />

                    </CustomTable>
                </Card>
            </div>
        </div>
    )
}

export default SubLocalesList
