import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { apiAdapter } from '../../../core/adapters/apiAdapter';
import logo from '../../img/sinLogo.png';
import CreatePromo from './Dialog/DialogCreatePromo';
import EditarPromo from './Dialog/DialogEditarPromo';
import DeletePromo from './Dialog/DialogDeletePromo';
import { Card } from 'primereact/card';
import PromoPDF from './Pdf/PromoPDF';
import * as XLSX from 'xlsx';

export default function PromocionesLocales() {
  const [promociones, setPromociones] = useState([]);
  const [agregar, setAgregar] = useState(false);
  const [editar, setEditar] = useState(false);
  const [eliminar, setEliminar] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  console.log('user', user);
  
  const fetchPromociones = async () => {
    try {
      setLoading(true);
      const response = await apiAdapter.get(`getPromociones/${user?.clinica_id}`);
      setPromociones(response);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener las promociones:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromociones();
  }, [user]);

  const filteredData = promociones.filter(Promo => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return Promo.area.toLowerCase().includes(lowercasedSearchTerm);
  });

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

  const truncateAddress = (address) => {
    const words = address.split(' '); // Divide la dirección en palabras
    const truncated = words.slice(0, 5).join(' '); // Toma las primeras 5 palabras
    return truncated;
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(promociones);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Promociones");
    XLSX.writeFile(wb, "promociones.xlsx");
  };
  

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

      <div className='flex justify-content-center'>
        <Card style={{ width: '80%', height: '7rem' }}>
          <div className='flex align-items-center' style={{ height: '100%' }}>
            <div className='flex justify-content-start' style={{ flex: 1 }}>
              <InputText
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder='Buscar promociones...'
                style={{ width: '50%', height: '3rem', borderRadius: '15px' }}
              />
            </div>

            <div className='flex justify-content-end'>
              <PromoPDF promociones={filteredData} />  {/* Componente para generar el PDF */}
              <Button icon="pi pi-file-excel" severity="success" outlined onClick={exportExcel} />
            </div>
          </div>
        </Card>
      </div>

      {/* ProgressSpinner mientras se carga la tabla */}
      {loading ? (
        <div className="flex justify-content-center" style={{ marginTop: '50px' }}>
          <ProgressSpinner />
        </div>
      ) : (
        <div className='flex justify-content-center'>
          <Card style={{ width: '80%', marginTop: '15px' }}>
          <DataTable value={filteredData} responsiveLayout='stack' rowClassName="my-2" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
              {/* Nueva columna para enumerar las filas */}
              <Column header="Nº" body={(rowData, { rowIndex }) => rowIndex + 1} />
              
              <Column
                header="Foto"
                body={(rowData) => (
                  <img src={rowData.imagen ? `${process.env.REACT_APP_API_BASE_URL}uploads/${rowData.imagen}` : logo} alt="Tipo" width="60" className='border-round-sm' />
                )}
              />
              <Column field="area" header="Área" />
              <Column field="descuento" header="Descuento" />
              <Column header="Descripción" body={(rowData) => truncateAddress(rowData.descripcion)} />
              {/* <Column header="Clínica" field='nombre_clinica' /> */}
              <Column header='Acciones' body={actionsTemplate} />
            </DataTable>
          </Card>
        </div>
      )}

      <CreatePromo visible={agregar} close={() => setAgregar(false)} recargar={fetchPromociones} />
      <EditarPromo visible={editar} close={() => setEditar(false)} recarga={fetchPromociones} datos1={selectedPromotion} datos2={setSelectedPromotion} />
      <DeletePromo visible={eliminar} close={() => setEliminar(false)} recargar={fetchPromociones} datos1={selectedPromotion} />
    </>
  );
}
