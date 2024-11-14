import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner'; // Importamos el ProgressSpinner
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { apiAdapter } from '../../../core/adapters/apiAdapter';
import { InputTextarea } from 'primereact/inputtextarea';
import logo from '../../img/sinLogo.png'
import CreatePromo from './Dialog/DialogCreatePromo';
import EditarPromo from './Dialog/DialogEditarPromo';
import DeletePromo from './Dialog/DialogDeletePromo';
import { Card } from 'primereact/card';

export default function PromocionesLocales() {
  const [promociones, setPromociones] = useState([]);
  const [agregar, setAgregar] = useState(false);
  const [editar, setEditar] = useState(false);
  const [eliminar, setEliminar] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para la búsqueda
  const [loading, setLoading] = useState(true); // Estado de carga
  const { user } = useAuth();
  
  const fetchPromociones = async () => {
      try {
        setLoading(true); // Inicia la carga
        const response = await apiAdapter.get('getPromociones');
        setPromociones(response);
        setLoading(false); // Termina la carga
      } catch (error) {
        console.error('Error al obtener las promociones:', error);
        setLoading(false); // En caso de error, también termina la carga
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
          <InputText
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder='Buscar promociones...'
            style={{ width: '50%', height: '4rem', borderRadius: '15px' }}
          />
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
              <Column header="Clínica" field='nombre_clinica' />
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
