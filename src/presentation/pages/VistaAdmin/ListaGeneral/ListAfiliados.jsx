import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';
import CustomDataTable from '../Autorizaciones/Componente/CustomDataTable';
import "../Autorizaciones/css/Administracion.css"
import { apiAdapter } from '../../../../core/adapters/apiAdapter';


export default function ListAfiliados() {
    const [afiliadores, setAfiliadores] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchClinicas = async () => {
      try {
        setLoading(true); // Inicia la carga
        const response = await apiAdapter.get('afiliadores-afiliados');
        setAfiliadores(response);
        setLoading(false); // Termina la carga
      } catch (error) {
        console.error('Error fetching clinic data:', error);
        setLoading(false); // Termina la carga
      }
    };

    fetchClinicas();
  }, []);

  // Filtrar afiliadores según el término de búsqueda
  const filteredAfiliadores = afiliadores.filter(afiliador =>
    `${afiliador.nombres} ${afiliador.apellidos} ${afiliador.dni}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Columnas para la tabla
  const columns = [
    { header: 'Nº', body: (rowData, { rowIndex }) => rowIndex + 1 },
    { field: 'dni', header: 'DNI' },
    { field: 'nombres', header: 'Nombre' },
    { field: 'apellidos', header: 'Apellidos' },
    { field: 'telefono', header: 'Teléfono' },
    
    { field: 'rol', header: 'Rol' },
  ];
  return (
    <>
      {/* <div className='flex'>
        <div className='flex-1 p-2'>
          <h1>Lista de Afiliados</h1>
          <Divider />
        </div>
      </div> */}

      <div className='flex justify-content-center'>
        <Card style={{ width: '80%', height: '7rem' }}>
          <InputText
            placeholder='Buscar nombre de Usuario...'
            style={{ width: '50%', height: '4rem', borderRadius: '15px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Card>
      </div>

      {loading ? (
        <div className="flex justify-content-center" style={{ marginTop: '50px' }}>
          <ProgressSpinner />
        </div>
      ) : (
        <div className='flex justify-content-center'>
          <Card style={{ width: '80%', marginTop: '15px' }}>
            <CustomDataTable
              columns={columns} // Pasa las columnas configuradas
              value={filteredAfiliadores} // Pasa los afiliadores filtrados
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]} // Opciones de filas por página
            />
          </Card>
        </div>
      )}
    </>
  )
}
