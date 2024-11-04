import React from 'react'
import CustomTable from '../../../../components/Table/CustomTable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
const SubLocalesList = ({ data, fnEdit,FnDelete }) => {
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
    return (
        <div>
            <CustomTable data={data}>
                {/* <Column
                    header="Imagen"
                    body={LogoRowTemplate}
                /> */}
                <Column header="item" field='id' />
                <Column header="Nombre" field='nombre' />
                <Column header="Dirección" field='direccion' />
                <Column body={actionsTemplate} />

            </CustomTable>
        </div>
    )
}

export default SubLocalesList
