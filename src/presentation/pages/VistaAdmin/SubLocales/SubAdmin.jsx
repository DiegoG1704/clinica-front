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
import { ProgressSpinner } from 'primereact/progressspinner';
import { useAdminPloc } from '../../../context/SubAdministradores/SubAdministradorContext';
import { usePlocState } from '../../../hooks/ploc/usePlocState';

export default function SubAdmin() {
  const { user } = useAuth()
  const [subAdmin, setSubAdmin] = useState([])
  const [create, setCreate] = useState(false)
  const [edit, setEdit] = useState(false);  // Para controlar si estamos en modo edición
  const [editData, setEditData] = useState(null);  // Para almacenar los datos del subadministrador que estamos editando
  const [delet, setDelete] = useState(false)
  const [loading, setLoading] = useState(true);

  const ploc = useAdminPloc()
  const state = usePlocState(ploc)

  useEffect(() => {

    if (user?.clinica_id) {
      ploc.loadUsers(user.clinica_id);
      ploc.loadLocales(user.clinica_id)
    }
  }, [user?.clinica_id, ploc]);

  const [searchTerm, setSearchTerm] = useState(''); // Estado para la búsqueda
  // const filteredData = subAdmin.filter(data => {
  //   const lowercasedSearchTerm = searchTerm.toLowerCase();
  //   return (
  //     data.nombres.toLowerCase().includes(lowercasedSearchTerm) ||
  //     data.apellidos.toLowerCase().includes(lowercasedSearchTerm)
  //   );
  // });
  // const fetchSubAdmin = async () => {
  //   try {
  //     setLoading(true)
  //     const response = await apiAdapter.get(`GetSubAdministrador/${user?.clinica_id}`);
  //     setSubAdmin(response);
  //     setLoading(false)
  //   } catch (error) {
  //     console.error('Error fetching subadmins:', error);
  //     setLoading(false)
  //   }
  // };
  // useEffect(() => {
  //   fetchSubAdmin();
  // }, [user?.clinica_id]);  // Asegúrate de que esta dependencia sea correcta

  const actionsTemplate = (rowData) => (
    <div className='flex gap-2'>
      <Button
        icon="pi pi-pencil"
        className="bg-white border-none shadow-none"
        style={{ color: "#85C226" }}
        onClick={() => {
          ploc.openDialogEdit(rowData)
          setEditData(rowData);  // Guardar los datos del subadministrador en el estado
        }}
      />
      <Button
        icon="pi pi-trash"
        className="bg-white  border-none shadow-none"
        style={{ color: "#85C226" }}
        onClick={() => {
          ploc.openDialogConfirmDelete(rowData)

        }}
      />
    </div>
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div>
      <header className='flex'>
        <div className='flex-1 p-2'>
          <h1>Bienvenido a Sub-Administradores</h1>
          <Divider />
        </div>
        <div className='flex justify-content-end align-items-center'>
          <Button label='Añadir SubAdministradores' className='' style={{
            backgroundColor: "#85C226",
            borderColor: "#85C226", height: "60px", borderRadius: "6px"
          }}
            onClick={ploc.openDialogCreate}
            icon="pi pi-plus" />
        </div>
      </header>
      <main>
        <div className='flex justify-content-center'>
          {/* <Card style={{ width: '80%', height: '7rem' }}>
            <InputText
              placeholder='Buscar sub-Administrador...'
              style={{ width: '50%', height: '4rem', borderRadius: '15px' }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Card> */}
        </div>
        {state?.loading ? (
          <div className="flex justify-content-center" style={{ marginTop: '50px' }}>
            <ProgressSpinner />
          </div>
        ) : (
          <div className='flex justify-content-center'>
            <Card style={{ width: '80%', marginTop: '15px' }}>
              <DataTable value={state?.usuarios} rowClassName="my-2" dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
                <Column header="Nº" body={(rowData, { rowIndex }) => rowIndex + 1} />
                <Column field="nombres" header="Nombre" />
                <Column field="apellidos" header="Apellidos" />
                <Column field="telefono" header="Télefono" />
                <Column field="dni" header="DNI" />
                <Column header="Cambios" body={actionsTemplate} />
              </DataTable>
            </Card>
          </div>
        )}


      </main>

      <CreateSubAdmin
        visible={state.openDialogCreate}
        close={ploc.closeDialogCreate}
        // actualizar={fetchSubAdmin}
        fnCreate={ploc.createUser}
        handleChange={ploc.handlechange}
        dataLocales={state?.locales}
        subAdminData={state?.subAdmin}
        findDoc={ploc.findDoc}


      />
      <EditSubAdmin
        visible={state.openDialogEdit}
        close={ploc.closeDialogEdit}
        // actualizar={fetchSubAdmin}
        fnCreate={ploc.updateSubAdmin}
        handleChange={ploc.handlechange}
        dataLocales={state?.locales}
        subAdminData={state?.subAdmin}
        findDoc={ploc.findDoc}
      // editData={editData}
      />
      <DeleteSubAdmin
        visibles={state.openDialogDelete}
        close={()=>{  ploc.closeDialogDelete();}}
        // actualizar={fetchSubAdmin}
        Data={editData}
      ></DeleteSubAdmin>
    </div>
  )
}
