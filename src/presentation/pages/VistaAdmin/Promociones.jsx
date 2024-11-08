import { Divider } from 'primereact/divider';
import React, { useEffect, useState } from 'react';
import ClinicaCards from '../AdminUsuario/Afiliados/ClinicaCards';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { Button } from 'primereact/button';
import { useAuth } from '../../context/AuthContext/AuthContext';

export default function Promociones({RolID}) {
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [promociones, setPromociones] = useState([]); // Estado para almacenar promociones

  console.log('idrol',RolID)
  const {user}= useAuth()
  // Función para obtener las promociones
  useEffect(() => {
    const fetchPromociones = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getPromociones/${user?.id}`);
        setPromociones(response.data);
      } catch (error) {
        console.error('Error al obtener las promociones:', error);
      }
    };

    fetchPromociones();
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
          {RolID === 4 && (
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
          style={{ width: '50%', height: '4rem', borderRadius: '20px'}}
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
