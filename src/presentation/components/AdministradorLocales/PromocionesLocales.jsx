import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { Dropdown } from 'primereact/dropdown';
import { apiAdapter } from '../../../core/adapters/apiAdapter';
import { InputTextarea } from 'primereact/inputtextarea';
import logo from '../../img/sinLogo.png'
import ApisPeruAdapter from '../../../core/adapters/http/ApisPeruAdapter';
import CreatePromo from './Dialog/DialogCreatePromo';
import EditarPromo from './Dialog/DialogEditarPromo';
import DeletePromo from './Dialog/DialogDeletePromo';

export default function PromocionesLocales() {
  const [promociones, setPromociones] = useState([]);
  const [agregar, setAgregar] = useState(false);
  const [editar, setEditar] = useState(false);
  const [eliminar, setEliminar] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const{user}=useAuth()
  
  const fetchPromociones = async () => {
      try {
        const response = await apiAdapter.get('getPromociones');
        setPromociones(response);
      } catch (error) {
        console.error('Error al obtener las promociones:', error);
      }
    };
  useEffect(() => {
    
    fetchPromociones();
  }, [user]);

  const actionsTemplate = (rowData) => (
    <div className='flex gap-2'>
      <Button
        icon="pi pi-pencil"
        className="bg-white border-none shadow-none"
        style={{ color: "#85C226" }}
        onClick={() => {
          setSelectedPromotion(rowData);
          setEditar(true);
        }}
      />
      <Button
        icon="pi pi-trash"
        className="bg-white border-none shadow-none"
        style={{ color: "#DB2423" }}
        onClick={() => {
          setSelectedPromotion(rowData);
          setEliminar(true);
        }}
      />
    </div>
  );


  return (
    <>
      <div className='flex'>
        <div className='flex-1 p-2'>
          <h1>Lista de Promociones</h1>
          <Divider />
        </div>
        <div className='flex justify-content-end align-items-center'>
          <Button
            label='Agregar Promocion' 
            style={{ backgroundColor: "#85C226", borderColor: "#85C226", width: "200px", height: "60px" }}
            onClick={() => setAgregar(true)}
          />
        </div>
      </div>
      <InputText
        placeholder='Buscar nombre de Promociones...'
        style={{ width: '50%' }}
      />
      <DataTable value={promociones} rowClassName="my-2">
        <Column
          header='Foto'
          body={(rowData) => (
            <img src={rowData.imagen?`${process.env.REACT_APP_API_BASE_URL}uploads/${rowData.imagen}`:logo} alt="Tipo" width="60" className='border-round-sm' />
          )}
        />
        <Column field="area" header="Area" />
        <Column field="descuento" header="Descuento" />
        <Column field="descripcion" header="Descripción" />
        <Column header='Acciones' body={actionsTemplate} />
      </DataTable>
      <CreatePromo visible={agregar} close={() => setAgregar(false)} recargar={fetchPromociones}/>
      <EditarPromo visible={editar} close={() => setEditar(false)} recarga={fetchPromociones} datos1={selectedPromotion} datos2={setSelectedPromotion}/>
      <DeletePromo visible={eliminar} close={() => setEliminar(false)} recargar={fetchPromociones} datos1={selectedPromotion}/>
    </>
  );
}
