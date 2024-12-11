import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import React, { useEffect, useRef, useState } from 'react';
import { apiAdapter } from '../../../../core/adapters/apiAdapter';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';
import CustomDataTable from './Componente/CustomDataTable';
import './css/Administracion.css'

export default function AdminPanel() {
  const toastRef = useRef(null);
  const [affiliates, setAffiliates] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAffiliateId, setSelectedAffiliateId] = useState(null);

  const fetchAffiliatesData = async () => {
    try {
      setLoadingState(true);
      const response = await apiAdapter.get('EstadosUser');
      console.log('Affiliates loaded:', response);
      setAffiliates(response);
      setLoadingState(false);
    } catch (error) {
      console.error('Error fetching affiliates:', error);
      setLoadingState(false);
    }
  };

  useEffect(() => {
    fetchAffiliatesData();
  }, []);

  const handleStatusChange = async () => {
    if (selectedAffiliateId) {
      try {
        console.log("Changing status for affiliate ID:", selectedAffiliateId); // Verifica el ID
        const response = await apiAdapter.put(`/CambioEstado/${selectedAffiliateId}`);
        console.log('API Response:', response); // Verifica la respuesta de la API
        toastRef.current.show({
          severity: 'success',
          summary: 'Status Updated',
          detail: 'The affiliate status has been updated to Active',
          life: 3000,
        });
        await fetchAffiliatesData(); // Actualiza la lista después de cambiar el estado
      } catch (error) {
        console.error('Error updating status:', error);
        toastRef.current.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Unable to update the affiliate status',
          life: 3000,
        });
      }
    }
  };
  
  const handlePRStatusChange = async () => {
    if (selectedAffiliateId) {
      try {
        console.log("Changing PR status for affiliate ID:", selectedAffiliateId); // Verifica el ID
        const response = await apiAdapter.put(`/CambioEstadoPr/${selectedAffiliateId}`);
        console.log('API Response:', response); // Verifica la respuesta de la API
        toastRef.current.show({
          severity: 'success',
          summary: 'Status Updated',
          detail: 'The affiliate PR status has been updated to Active',
          life: 3000,
        });
        await fetchAffiliatesData(); // Actualiza la lista después de cambiar el estado
      } catch (error) {
        console.error('Error updating PR status:', error);
        toastRef.current.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Unable to update the affiliate PR status',
          life: 3000,
        });
      }
    }
  };  

  const rejectAction = () => {
    toastRef.current.show({ severity: 'warn', summary: 'Rejected', detail: 'Status has not been changed', life: 3000 });
  };

  const filterAffiliates = affiliates.filter(affiliate =>
    `${affiliate.nombres} ${affiliate.apellidos}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusChangeButton = (rowData) => (
    <div className="flex gap-2">
      <Button
        severity={rowData.Estado === 'Activo' ? 'success' : 'danger'}
        onClick={() => showConfirmDialog(rowData.id)}
        label={rowData.Estado}
      />
    </div>
  );

  const statusChangeButtonPR = (rowData) => (
    <div className="flex gap-2">
      <Button
        severity={rowData.EstadoPr === 'Activo' ? 'success' : 'danger'}
        onClick={() => showConfirmDialogPR(rowData.id)}
        label={rowData.EstadoPr}
      />
    </div>
  );

  const showConfirmDialog = (id) => {
    console.log("Affiliate ID selected:", id); // Verifica el ID
    setSelectedAffiliateId(id);
    confirmDialog({
      group: 'templating',
      header: 'Confirmation',
      message: (
        <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
          <i className="pi pi-exclamation-circle text-6xl text-primary-500"></i>
          <span>¿Desea cambiar de estado?</span>
        </div>
      ),
      accept: () => {
        console.log("Accept clicked, changing status...");
        handleStatusChange(); // Llama a la función para cambiar el estado
      },
      reject: rejectAction,
    });
  };

  const showConfirmDialogPR = (id) => {
    console.log("Affiliate ID selected (PR):", id); // Verifica el ID
    setSelectedAffiliateId(id);
    confirmDialog({
      group: 'templating',
      header: 'Confirmation',
      message: (
        <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
          <i className="pi pi-exclamation-circle text-6xl text-primary-500"></i>
          <span>¿Desea cambiar de estado?</span>
        </div>
      ),
      accept: handlePRStatusChange,
      reject: rejectAction,
    });
  };
  

  // Define the columns for the CustomDataTable
  const columns = [
    {
      header: 'Nº',
      body: (row, { rowIndex }) => rowIndex + 1,  // Mostrar el número de la fila
    },
    { header: 'Nombres', field: 'nombres' },
    { header: 'Apellidos', field: 'apellidos' },
    { header: 'DNI', field: 'dni' },
    { header: 'Rol', field: 'rol_nombre' },
    { header: 'fecha_inscripcion', field: 'fecha_inscripcion' },
    { header: 'Estado Usuario', body: statusChangeButton },
    { header: 'Estado Promotor', body: statusChangeButtonPR },
  ];

  return (
    <>
      <Toast ref={toastRef} />
      <div className="admin-panel-header flex">
        <div className="flex-1 p-2">
          <h1 className="admin-title">Lista de Usuarios</h1>
          <Divider />
        </div>
      </div>
      <div className="flex justify-content-center">
        <Card className="admin-card">
          <InputText
            placeholder="Buscar usuario..."
            className="admin-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Card>
      </div>
      {loadingState ? (
        <div className="flex justify-content-center" style={{ marginTop: '50px' }}>
          <ProgressSpinner />
        </div>
      ) : (
        <div className="flex justify-content-center">
          <Card className="admin-card" style={{ marginTop: '15px' }}>
          <CustomDataTable
              columns={columns}
              value={filterAffiliates}
              paginator={true}
              rows={5}  // Número de filas por página
              rowsPerPageOptions={[5, 10, 25, 50]}  // Opciones de filas por página
            />
          </Card>
        </div>
      )}
      <ConfirmDialog group="templating" />
    </>
  );
}
