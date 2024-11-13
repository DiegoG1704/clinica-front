import React from 'react'
import CustomTable from '../../../../components/Table/CustomTable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Card } from 'primereact/card'
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
            <div className='flex justify-content-center'>
                <Card style={{ width: '80%', height: '7rem'}}>
                <InputText
                    placeholder='Buscar nombre de afiliados...'
                    style={{ width: '50%', height: '4rem', borderRadius: '15px' }}
                />
                </Card>
            </div>
            <div>
                <Card style={{ width: '80%', marginTop:'15px' }}>
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
                </Card>
            </div>
        </div>
    )
}

export default SubLocalesList
