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
import EditSubAdmin from './Components/Dialogs/EditSubAdmin';
import DeleteSubAdmin from './Components/Dialogs/DeleteSubAdmin';
import { apiAdapter } from '../../../../core/adapters/apiAdapter';

export default function SubAdmin() {
  const {user} = useAuth()
  const[subAdmin,setSubAdmin]=useState([])
  const [create,setCreate]=useState(false)
  const [edit, setEdit] = useState(false);  // Para controlar si estamos en modo edición
  const [editData, setEditData] = useState(null);  // Para almacenar los datos del subadministrador que estamos editando
  const [delet , setDelete] = useState(false)
    const fetchSubAdmin = async () => {
      try {
          const response = await apiAdapter.get(`GetSubAdministrador/${user?.clinica_id}`);
          setSubAdmin(response);
      } catch (error) {
          console.error('Error fetching subadmins:', error);
      }
    };
    useEffect(() => {
      fetchSubAdmin();
  }, [user?.clinica_id]);  // Asegúrate de que esta dependencia sea correcta

      const actionsTemplate = (rowData) => (
        <div className='flex gap-2'>
             <Button 
                icon="pi pi-pencil" 
                className="bg-white border-none shadow-none" 
                style={{ color: "#85C226" }} 
                onClick={() => {
                    setEdit(true);      // Cambiar el estado de edición
                    setEditData(rowData);  // Guardar los datos del subadministrador en el estado
                }} 
            />
            <Button 
              icon="pi pi-trash" 
              className="bg-white border-none shadow-none" 
              style={{ color: "#85C226" }} 
              onClick={()=>{
                setEditData(rowData);
                setDelete(true)
              }}
              />
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
      <CreateSubAdmin 
        visible={create} 
        close={()=>setCreate(false)} 
        actualizar={fetchSubAdmin}
      />
      <EditSubAdmin 
        visible={edit} 
        close={() => setEdit(false)}  // Cerrar el modal
        actualizar={fetchSubAdmin}  // Función para actualizar la lista de subadministradores
        editData={editData}
      />
      <DeleteSubAdmin
        visible={delet}
        close={()=>setDelete(false)}
        actualizar={fetchSubAdmin}
        Data={editData}
      />
    </div>
  )
}
