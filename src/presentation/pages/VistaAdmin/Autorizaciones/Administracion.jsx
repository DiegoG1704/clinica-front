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
import { TabView, TabPanel } from 'primereact/tabview';
import PagosVerif from './Componente/PagosVerif';

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

  const handleStatusChange = async (rowData) => {
    if (rowData?.id) {
      try {
        const response = await apiAdapter.put(`CambioEstadoPago/${rowData?.id}/${rowData?.pago_id}`);
        console.log('API Response:', response); // Verifica la respuesta de la API
        if (response?.success) {
          toastRef.current.show({
            severity: 'success',
            summary: 'Usuario actualizado ',
            detail: 'Se ha actualizado el rol del usuario correctamente',
            life: 3000,
          });
          await fetchAffiliatesData(); // Actualiza la lista después de cambiar el estado
        }

      } catch (error) {
        console.error('Error updating status:', error);
        toastRef.current.show({
          severity: 'error',
          summary: 'Error al actualizar usuario',
          detail: 'Hubo un error al actualizar el rol del usuario',
          life: 3000,
        });
      }
    }
  };

  const handlePRStatusChange = async (id) => {
    if (id) {
      try {
        console.log("Changing PR status for affiliate ID:", id); // Verifica el ID
        const response = await apiAdapter.put(`/CambioEstadoPr/${id}`);
        if (response?.success) {
          console.log('API Response:', response); // Verifica la respuesta de la API
          toastRef.current.show({
            severity: 'success',
            summary: 'Status Updated',
            detail: 'The affiliate PR status has been updated to Active',
            life: 3000,
          });
          await fetchAffiliatesData(); // Actualiza la lista después de cambiar el estado
        }

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
        onClick={() => showConfirmDialog(rowData)}
        label={rowData.Estado}
        disabled={rowData.Estado === 'Activo' || rowData.estado_solicitud !== "2"}
        className={rowData.Estado === 'Activo' ? 'green-button' :
          rowData.estado_solicitud === "2" ? "orange-button" : ""}
      />
    </div>
  );

  const statusChangeButtonPR = (rowData) => (
    <div className="flex gap-2">
      <Button
        severity={rowData.EstadoPr === 'Activo' ? 'success' : 'danger'}
        onClick={() => showConfirmDialogPR(rowData.id)}
        label={rowData.EstadoPr}
        disabled={rowData.EstadoPr === 'Activo' || rowData.estado_solicitud !== "3"}
        className={rowData.EstadoPr === 'Activo' ? 'green-button' : rowData.estado_solicitud === "3" ? "orange-button" : ""}
      />
    </div>
  );

  const showConfirmDialog = (rowData) => {

    setSelectedAffiliateId(rowData?.id);
    confirmDialog({
      group: 'templating',
      header: 'Confirmación',
      message: (
        <div className="flex flex-column align-items-center w-full mt-3  ">
          <span><i className="pi pi-exclamation-circle text-6xl text-orange-500"></i></span>
          <span>¿Desea cambiar de estado?</span>
          <div className="text-lg text-gray-800 mb-1">
          <strong>Tipo de pago:</strong> {rowData?.tipopago}
          </div>
          <div className="text-lg text-gray-800 mb-2">
          <strong>fecha de pago:</strong> {rowData?.fechapago}
          </div>
          <div className="text-lg text-gray-800 mb-2">
          <strong>rol pagado:</strong> {rowData?.tipopagorol}
          </div>
          <a
            href={`${process.env.REACT_APP_API_BASE_URL}uploads/${rowData?.archivo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-blue-600 underline mt-1 inline-block"
          >
              Ver comprobante
          </a>
        </div>
      ),
      accept: () => {
        console.log("Accept clicked, changing status...");
        handleStatusChange(rowData); // Llama a la función para cambiar el estado
      },
      reject: rejectAction,
    });
  };

  const showConfirmDialogPR = (id) => {
    console.log("Affiliate ID selected (PR):", id); // Verifica el ID
    setSelectedAffiliateId(id);
    confirmDialog({
      group: 'templating',
      header: 'Confirmación',
      message: (
        <div className="flex flex-column align-items-center w-full mt-3  ">
          <span><i className="pi pi-exclamation-circle text-6xl text-orange-500"></i></span>
          <span>¿Desea cambiar de estado?</span>
        </div>
      ),
      accept: () => { handlePRStatusChange(id) },
      reject: rejectAction,
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',
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
    { header: 'fecha_inscripcion', field: 'fecha_inscripcion' },
    { header: 'Codigo', field: 'codigo' },
    { header: 'Rol', field: 'rol_nombre' },
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
      <div className="flex justify-content-center">
      <Card className="admin-card" style={{ marginTop: '15px' }}>
       <TabView>
          <TabPanel header="Lista de afiliados">
            {loadingState ? (
              <div className="flex justify-content-center" style={{ marginTop: '50px' }}>
                <ProgressSpinner />
              </div>
            ) : (
              
                  <CustomDataTable
                    columns={columns}
                    value={filterAffiliates}
                    paginator={true}
                    rows={5}  // Número de filas por página
                    rowsPerPageOptions={[5, 10, 25, 50]}  // Opciones de filas por página
                  />
            )}
          </TabPanel>
          <TabPanel header="Lista de Pagos">
              <PagosVerif/>
          </TabPanel>
      </TabView>
      </Card>
      </div>
      <ConfirmDialog group="templating" />
    </>
  );
}
