import React, { useEffect, useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { apiAdapter } from '../../../core/adapters/apiAdapter';
import { useAuth } from '../../context/AuthContext/AuthContext';
import GenerarPDF from '../../components/PDF/GenerarPDF'; // Importamos GenerarPDF

export default function SubAfiliados({ UserId }) {
  const [afiliados, setAfiliados] = useState([]);
  const [link, setLink] = useState([]);
  const [filteredAfiliados, setFilteredAfiliados] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [gananciaTotal, setGananciaTotal] = useState(0);
  const toast = useRef(null);
  const { user } = useAuth();

  // Función recursiva para calcular la ganancia total y formatear los afiliados
  const calculateGananciaTotal = (data) => {
    let total = data.ganancia || 0;
    if (data.children && data.children.length > 0) {
      total += data.children.reduce((sum, child) => sum + calculateGananciaTotal(child), 0);
    }
    return total;
  };

  const formatAfiliados = (data) => {
    const gananciaTotal = calculateGananciaTotal(data);
    return {
      key: `key_${data.id}`,  // Clave única para cada afiliado
      data: {
        nombres: data.nombres || '',
        apellidos: data.apellidos || '',
        dni: data.dni || '',
        telefono: data.telefono || '',
        rol: data.rol || '',
        fecha_inscripcion: data.fecha_inscripcion || '',
        ganancia: data.ganancia || 0,
        ganancia_total: gananciaTotal,  // Ganancia total calculada
      },
      children: data.children?.map(formatAfiliados) || [], // Recursión para los hijos
    };
  };

  const fetchLink = async () => {
    try {
      const response = await apiAdapter.get(`${process.env.REACT_APP_API_BASE_URL}LinkCodigo/${user?.id}`);
      setLink(response?.link); // Asegurarte de que extraes el enlace correctamente
    } catch (error) {
      console.error('Error al obtener el link:', error);
    }
  };

  useEffect(() => {
    const fetchAfiliados = async () => {
      try {
        const response = await apiAdapter.get(`${process.env.REACT_APP_API_BASE_URL}usuarios/${user?.id}`);
        const formattedData = response.map(formatAfiliados);
        setAfiliados(formattedData);
        setFilteredAfiliados(formattedData);

        const totalGanancia = formattedData.reduce((sum, afiliado) => sum + afiliado.data.ganancia_total, 0);
        setGananciaTotal(totalGanancia);
      } catch (error) {
        console.error('Error al obtener los afiliados:', error);
      }
    };

    fetchLink();
    fetchAfiliados();
  }, [UserId]);

  // Filtrar los afiliados según el término de búsqueda
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = afiliados.filter(afiliado =>
      (afiliado.data.nombres?.toLowerCase() || '').includes(value) ||
      (afiliado.data.apellidos?.toLowerCase() || '').includes(value) ||
      (afiliado.data.dni?.toLowerCase() || '').includes(value) ||
      (afiliado.data.telefono?.toString() || '').includes(value) ||
      (afiliado.data.ganancia?.toString() || '').includes(value)
    );

    setFilteredAfiliados(filtered);

    const total = filtered.reduce((sum, item) => sum + item.data.ganancia_total, 0);
    setGananciaTotal(total);
  };

  // Copiar el código del usuario al portapapeles
  const copiarCodigo = async () => {
    try {
      await navigator.clipboard.writeText(user?.codigo);
      toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Código copiado exitosamente', life: 3000 });
    } catch (err) {
      console.error('Error al copiar el código:', err);
    }
  };

  const copiarLink = async () => {
    try {
      if (link) {
        await navigator.clipboard.writeText(link); // Copiar el link al portapapeles
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Link copiado exitosamente', life: 3000 });
      } else {
        toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'No hay un link para copiar', life: 3000 });
      }
    } catch (err) {
      console.error('Error al copiar el link:', err);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo copiar el link', life: 3000 });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="flex">
        <div className="flex-1 p-2">
          <h1>Lista de promotores</h1>
          <Divider />
        </div>
        <div className="flex justify-content-end align-items-center">
          <Button
            label={user?.codigo}
            style={{ backgroundColor: "#85C226", borderColor: "#85C226", width: "160px", height: "50px" }}
            onClick={copiarCodigo}
          />
          <Button
            label='Link'
            icon='pi pi-link'
            style={{ backgroundColor: "#1A76D1", borderColor: "#1A76D1", width: "160px", height: "50px"}}
            onClick={copiarLink}
          />
        </div>
      </div>
      <div className="flex justify-content-center">
        <Card style={{ width: '80%', height: '7rem' }}>
          <div className="flex align-items-center justify-content-between" style={{ height: '100%' }}>
            <InputText
              placeholder="Buscar afiliado..."
              style={{ width: '50%', height: '4rem', borderRadius: '15px' }}
              value={searchTerm}
              onChange={handleSearch}
            />
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
            <TreeTable
              value={filteredAfiliados}
              tableStyle={{ minWidth: '50rem' }}
              dataKey="key"
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
            >
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
      <GenerarPDF afiliados={filteredAfiliados} gananciaTotal={gananciaTotal} />
    </>
  );
}
