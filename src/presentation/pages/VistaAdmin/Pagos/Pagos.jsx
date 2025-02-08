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
import "../Autorizaciones/css/Administracion.css"

export default function Pagos() {
    const toastRef = useRef(null);
  const [affiliates, setAffiliates] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAffiliatesData = async () => {
    try {
      setLoadingState(true);
      const response = await apiAdapter.get('GanaciaTotal');
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


  const filterAffiliates = affiliates.filter(affiliate =>
    `${affiliate.nombres} ${affiliate.apellidos}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Define the columns for the CustomDataTable
  const columns = [
    {
      header: 'Nº',
      body: (row, { rowIndex }) => rowIndex + 1,  // Mostrar el número de la fila
    },
    { header: 'Nombres', field: 'nombres' },
    { header: 'Apellidos', field: 'apellidos' },
    { header: 'DNI', field: 'dni' },
    { header: 'Rol', field: 'rol' },
    { header: 'Pago', field: 'ganancia_total_general' },
    // { header: 'estado', body: statusChangeButton },
  ];
  return (
    <>
      <Toast ref={toastRef} />
      <div className="admin-panel-header flex">
        <div className="flex-1 p-2">
          <h1 className="admin-title">Lista de Pagos a Promotores</h1>
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
