import axios from 'axios';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { TreeTable } from 'primereact/treetable';
import React, { useEffect, useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { apiAdapter } from '../../../core/adapters/apiAdapter';
import { useAuth } from '../../context/AuthContext/AuthContext';

export default function SubAfiliados({ UserId }) {
  const [afiliados, setAfiliados] = useState([]);
  const [filteredAfiliados, setFilteredAfiliados] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [gananciaTotal, setGananciaTotal] = useState(0); // Estado para la ganancia total
  const toast = useRef(null);
  const { user } = useAuth();

  // Función para calcular la ganancia total de un afiliado y sus hijos
  const calculateGananciaTotal = (data) => {
    let total = data.ganancia || 0;
    if (data.children && data.children.length > 0) {
      total += data.children.reduce((sum, child) => sum + calculateGananciaTotal(child), 0);
    }
    return total;
  };

  const formatAfiliados = (data, parentId = null) => {
    const gananciaTotal = calculateGananciaTotal(data); // Calculamos la ganancia total
    return {
      key: `key_${data.id}`, // Un identificador único para cada afiliado
      data: {
        nombres: data.nombres || '', // Asegúrate de que cada propiedad esté correctamente definida
        apellidos: data.apellidos || '',
        dni: data.dni || '',
        telefono: data.telefono || '',
        rol: data.rol || '',
        fecha_inscripcion: data.fecha_inscripcion || '',
        ganancia: data.ganancia || 0, // Asegúrate de que `ganancia` tenga un valor predeterminado
        ganancia_total: gananciaTotal, // Ganancia total calculada
      },
      children: data.children?.map(child => formatAfiliados(child, data.id)) || [] // Recursión para hijos
    };
  };
  

  useEffect(() => {
    const fetchAfiliados = async () => {
      try {
        // Realizas la llamada a la API para obtener los datos
        const response = await apiAdapter.get(`${process.env.REACT_APP_API_BASE_URL}usuarios/${user?.id}`);
        
        // Formateamos los datos y calculamos la ganancia total
        const formattedData = response.map(formatAfiliados);
        
        // Establecemos los datos formateados en el estado
        setAfiliados(formattedData);
        setFilteredAfiliados(formattedData); // Mostrar todos los afiliados inicialmente

        // Calculamos la ganancia total de todos los afiliados
        const totalGanancia = formattedData.reduce((sum, afiliado) => sum + afiliado.data.ganancia_total, 0);
        setGananciaTotal(totalGanancia);
      } catch (error) {
        console.error('Error al obtener los afiliados:', error);
      }
    };

    fetchAfiliados();
  }, [UserId]);

  // Función para manejar el filtro de búsqueda
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    // Filtrar afiliados según el término de búsqueda
    const filtered = afiliados.filter(afiliado =>
      (afiliado.data.nombres?.toLowerCase() || '').includes(value) ||
      (afiliado.data.apellidos?.toLowerCase() || '').includes(value) ||
      (afiliado.data.dni?.toLowerCase() || '').includes(value) ||
      (afiliado.data.telefono?.toString() || '').includes(value) ||
      (afiliado.data.ganancia?.toString() || '').includes(value)
    );

    setFilteredAfiliados(filtered);

    // Calcular la ganancia total de los afiliados filtrados
    const total = filtered.reduce((sum, item) => sum + item.data.ganancia_total, 0);
    setGananciaTotal(total);
  };

  const [codigo, setCodigo] = useState('');

  const copiarCodigo = async () => {
    try {
      await navigator.clipboard.writeText(user?.codigo);
      toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Código copiado exitosamente', life: 3000 });
    } catch (err) {
      console.error('Error al copiar el código:', err);
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <div className='flex'>
        <div className='flex-1 p-2'>
          <h1>Lista de Afiliados</h1>
          <Divider />
        </div>
        <div className='flex justify-content-end align-items-center'>
          <Button
            label={user?.codigo}
            style={{ backgroundColor: "#85C226", borderColor: "#85C226", width: "200px", height: "60px" }}
            onClick={copiarCodigo}
          />
        </div>
      </div>
      <div className="flex justify-content-center">
        <Card style={{ width: '80%', height: '7rem' }}>
          <div className="flex align-items-center justify-content-between" style={{ height: '100%' }}>
            {/* Input de búsqueda */}
            <InputText
              placeholder="Buscar afiliado..."
              style={{ width: '50%', height: '4rem', borderRadius: '15px' }}
              value={searchTerm}
              onChange={handleSearch}
            />
            
            {/* Contenedor de la ganancia */}
            <div className="flex align-items-center">
              <span className="mr-2">Ganancia Total:</span>
              <InputText value={gananciaTotal} disabled style={{ height: '4rem', width: '3rem' }} />
            </div>
          </div>
        </Card>
      </div>
      <div className="flex justify-content-center">
        <Card style={{ width: '80%', marginTop: '15px' }}>
          {filteredAfiliados.length === 0 ? (
            <div className="text-center">
              <h5>Los afiliados registrados se agregarán en esta tabla</h5>
            </div>
          ) : (
            <TreeTable value={filteredAfiliados} tableStyle={{ minWidth: '50rem' }} dataKey="key" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
              <Column field="nombres" header="Nombres" expander></Column>
              <Column field="apellidos" header="Apellidos"></Column>
              <Column field="dni" header="DNI"></Column>
              <Column field="telefono" header="Teléfono"></Column>
              <Column field="rol" header="Rol"></Column>
              <Column field="fecha_inscripcion" header="Fecha de Inscripción"></Column>
              <Column field="ganancia" header="Ganancia"></Column>
            </TreeTable>
          )}
        </Card>
      </div>
    </>
  );
}
