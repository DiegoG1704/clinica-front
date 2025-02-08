import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import React, { useEffect, useRef, useState } from 'react';
import { apiAdapter } from '../../../../core/adapters/apiAdapter';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';
import CustomDataTable from '../Autorizaciones/Componente/CustomDataTable';
import '../Autorizaciones/css/Administracion.css'
import { Tag } from 'primereact/tag';

export default function AutorizacionFam() {
    const toastRef = useRef(null);
  const [affiliates, setAffiliates] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAffiliateId, setSelectedAffiliateId] = useState(null);

  const fetchAffiliatesData = async () => {
    try {
      setLoadingState(true);
      const response = await apiAdapter.get('GetFamiliaresGeneral');
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
        const response = await apiAdapter.put(`/CambioEstadoFam/${selectedAffiliateId}`);
        console.log('API Response:', response);
        toastRef.current.show({
          severity: 'success',
          summary: 'Status Updated',
          detail: 'The affiliate status has been updated to Active',
          life: 3000,
        });
        await fetchAffiliatesData();
      } catch (error) {
        toastRef.current.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Unable to update the affiliate status',
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
        severity={rowData.estado === 'Activo' ? 'success' : 'danger'}
        onClick={() => showConfirmDialog(rowData.id)}
        label={rowData.estado}
      />
    </div>
  );

  const showConfirmDialog = (id) => {
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
      accept: handleStatusChange,
      reject: rejectAction,
    });
  };

  // Función para mostrar etiquetas con colores dependiendo de la unión familiar
  const unionFamiliarTemplate = (rowData) => {
    let parentescoLabel = '';  // Etiqueta de parentesco por defecto
    let severity = 'info';     // Valor por defecto para el color

    // Traducción de los valores de parentesco
    if (rowData.parentesco === '1') {
      parentescoLabel = 'Esposo(a)';
      severity = 'info';  // Puedes elegir otro color si lo prefieres
    } else if (rowData.parentesco === '2') {
      parentescoLabel = 'Hijo(a)';
      severity = 'primary';  // Color para "Hijo(a)"
    } else {
      parentescoLabel = 'Desconocido';  // Si el valor es algo distinto de '1' o '2'
      severity = 'warning';  // Un color de advertencia para valores desconocidos
    }

    return (
      <Tag icon="pi pi-user" value={parentescoLabel} severity={severity} />
    );
  };

  // Define the columns for the CustomDataTable
  const columns = [
    {
      header: 'Nº',
      body: (row, { rowIndex }) => rowIndex + 1,  // Mostrar el número de la fila
    },
    { header: 'Nombres', field: 'nombres' },
    { header: 'Apellidos', field: 'apellidos' },
    { header: 'Parentesco', body: unionFamiliarTemplate },
    { header: 'DNI', field: 'dni' },
    { header: 'estado', body: statusChangeButton },
  ];
  return (
    <>
      <Toast ref={toastRef} />
      <div className="admin-panel-header flex">
        <div className="flex-1 p-2">
          <h1 className="admin-title">Lista de Familiares</h1>
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
  )
}
