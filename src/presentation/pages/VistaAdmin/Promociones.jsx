import { Divider } from 'primereact/divider';
import React, { useEffect, useState } from 'react';
import ClinicaCards from '../AdminUsuario/Afiliados/ClinicaCards';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { apiAdapter } from '../../../core/adapters/apiAdapter';

export default function Promociones() {
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [promociones, setPromociones] = useState([]); // Estado para almacenar promociones
  const { user } = useAuth()
  console.log("use", user)
  // Función para obtener las promociones
  const fetchPromociones = async () => {
    try {
      const response = await apiAdapter.get(`getPromociones/${user?.clinica_id}`);
      setPromociones(response);
    } catch (error) {
      console.error('Error al obtener las promociones:', error);
    }
  };

  useEffect(() => {
    if (user?.clinica_id !== null) {
      fetchPromociones();

    }

  }, []);

  // Filtrar promociones según el término de búsqueda
  const filteredPromociones = promociones.filter(promocion =>
    promocion.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className='flex'>
        <div className='flex-1 p-2'>
          <h1>Lista de Promociones</h1>
          <Divider />
        </div>
        <div className='flex justify-content-end align-items-center'>
          {user?.rolId === 'afiliado' && (
            <Button
              label='Cambiar de Plan'
              className=''
              style={{ backgroundColor: "#85C226", borderColor: "#85C226", width: "200px", height: "60px" }}
            />
          )}
        </div>
      </div>
      <div className="flex justify-content-center">
        <InputText
          placeholder='Buscar promoción ...'
          style={{ width: '50%', height: '4rem', borderRadius: '20px' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ClinicaCards
        Ancho={'280px'}
        Alto={'200px'}
        Margen={'2rem'}
        Display={'none'}
        Promociones={filteredPromociones}
        Admin={true}
      />
    </>
  );
}
