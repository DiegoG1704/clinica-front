import axios from 'axios';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext/AuthContext';
import CreateSubAdmin from './Components/Dialogs/CreateSubAdmin';

export default function SubAdmin() {
  const {user} = useAuth()
    const[subAdmin,setSubAdmin]=useState([])
    const [create,setCreate]=useState(false)
    useEffect(() => {
        const fetchSubAdmin= async () => {
            try {
                const response = await axios.get(`http://localhost:4000/GetSubAdministrador/${user.clinica_id}`);
                setSubAdmin(response.data);
            } catch (error) {
                console.error('Error fetching clinic data:', error);
            }
        };
        fetchSubAdmin();
      }, [user.clinica_id]);
      const actionsTemplate = (rowData) => (
        <div className='flex gap-2'>
            <Button icon="pi pi-pencil" className="bg-white border-none shadow-none" style={{ color: "#85C226" }} />
            <Button icon="pi pi-trash" className="bg-white border-none shadow-none" style={{ color: "#85C226" }} />
        </div>
    );
  return (
    <div>
      <header className='flex'>
        <div className='flex-1 p-2'>
          <h1>Bienvenido a SubAdministradores</h1>
          <Divider />
        </div>
        <div className='flex justify-content-end align-items-center'>
          <Button label='Añadir SubAdministradores' className='' style={{
            backgroundColor: "#85C226",
            borderColor: "#85C226", height: "60px", borderRadius: "6px"
          }} 
          onClick={()=>setCreate(true)}
          icon="pi pi-plus" />
        </div>
      </header>
      <main>
      <div className='flex justify-content-center'>
        <Card style={{ width: '80%', height: '7rem'}}>
          <InputText
            placeholder='Buscar nombre de afiliados...'
            style={{ width: '50%', height: '4rem', borderRadius: '15px' }}
          />
        </Card>
      </div>
      <div className='flex justify-content-center'>
        <Card style={{ width: '80%', marginTop:'15px' }}>
          <DataTable value={subAdmin} rowClassName="my-2" dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
            <Column field="nombres" header="Nombre" />
            <Column field="apellidos" header="Apellidos" />
            <Column field="telefono" header="Télefono" />
            <Column field="dni" header="DNI" />
            <Column header="Cambios" body={actionsTemplate}/>
          </DataTable>
        </Card>
      </div>
      </main>
      <CreateSubAdmin visible={create} close={()=>setCreate(false)}/>
    </div>
  )
}
