import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';

export default function Admin() {
  const [afiliadores, setAfiliadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchClinicas = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:4000/afiliadores-afiliados');
        setAfiliadores(response.data);
      } catch (error) {
        console.error('Error fetching clinic data:', error);
        setError('Failed to load clinics.');
      } finally {
        setLoading(false);
      }
    };

    fetchClinicas();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Filtrar afiliadores según el término de búsqueda
  const filteredAfiliadores = afiliadores.filter(afiliador =>
    `${afiliador.nombres} ${afiliador.apellidos}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className='flex'>
        <div className='flex-1 p-2'>
          <h1>Lista de Afiliados</h1>
          <Divider />
        </div>
      </div>
      <InputText
        placeholder='Buscar nombre de afiliados...'
        style={{ width: '50%' }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <DataTable value={filteredAfiliadores} rowClassName="my-2">
        <Column
          header='Foto de Perfil'
          body={(rowData) => (
            <img src={`http://localhost:4000/uploads/${rowData.fotoPerfil}`} alt="Tipo" width="60" className='border-round-sm' />
          )}
        />
        <Column field="nombres" header="Nombre" />
        <Column field="apellidos" header="Apellidos" />
        <Column field="correo" header="Correo" />
        <Column field="telefono" header="Télefono" />
        <Column field="dni" header="DNI" />
        <Column field="rol" header="Rol" />
      </DataTable>
    </>
  );
}
