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
import './css/SubAfiliados.css'
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';

export default function SubAfiliados({ UserId }) {
  const [afiliados, setAfiliados] = useState([]);
  const [link, setLink] = useState([]);
  const [filteredAfiliados, setFilteredAfiliados] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [gananciaTotal, setGananciaTotal] = useState(0);
  const toast = useRef(null);
  const { user } = useAuth();

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
      key: `key_${data.id}`,  
      data: {
        nombres: data.nombres || '',
        apellidos: data.apellidos || '',
        dni: data.dni || '',
        telefono: data.telefono || '',
        rol: data.rol || '',
        fecha_inscripcion: data.fecha_inscripcion || '',
        nivel: data.nivel,
        ganancia: data.ganancia,
        ganancia_total: gananciaTotal,  
      },
      children: data.children?.map(formatAfiliados) || [],
    };
  };

  const fetchLink = async () => {
    try {
      const response = await apiAdapter.get(`${process.env.REACT_APP_API_BASE_URL}LinkCodigo/${user?.id}`);
      setLink(response?.link);
    } catch (error) {
      // console.error('Error al obtener el link:', error);
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
        await navigator.clipboard.writeText(link); 
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Link copiado exitosamente', life: 3000 });
      } else {
        toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'No hay un link para copiar', life: 3000 });
      }
    } catch (err) {
      console.error('Error al copiar el link:', err);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo copiar el link', life: 3000 });
    }
  };

  // Función para aplicar estilos condicionales basados en el nivel
  const getNivelClass = (nivel) => {
    switch (nivel) {
      case 'Nivel 1':
        return 'nivel-1';
      case 'Nivel 2':
        return 'nivel-2';
      case 'Nivel 3':
        return 'nivel-3';
      default:
        return '';
    }
  };

  const getNivelEtiqueta = (nivel) => {
    switch (nivel) {
      case 'Nivel 1':
        return (<Tag style={{background:'#2aa87a',fontSize:'15px'}}>nivel-1</Tag> );
      case 'Nivel 2':
        return (<Tag style={{background:'#547fa1',fontSize:'15px'}}>nivel-2</Tag> );
      case 'Nivel 3':
        return (<Tag style={{background:'#63b2d4',fontSize:'15px'}}>nivel-3</Tag> );
      default:
        return '';
    }
  };
  
  const togglerTemplate = (node, options) => {
    if (!node) {
        return;
    }

    const expanded = options.expanded;
    const iconClassName = classNames('p-treetable-toggler-icon pi pi-fw', {
        'pi-caret-right': !expanded,
        'pi-caret-down': expanded
    });

    return (
        <button type="button" className="p-treetable-toggler p-link" style={options.buttonStyle} tabIndex={-1} onClick={options.onClick}>
            <span style={{color:'#2aa87a',fontWeight:'bold'}} className={iconClassName} aria-hidden="true"></span>
        </button>
    );
};


  return (
    <>
      <Toast ref={toast} />
      <div className="flex">
        <div className="flex-1 p-2">
          <h1>Lista de afiliados</h1>
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
              togglerTemplate={togglerTemplate} 
            >
              <Column field="nombres" header="Nombres" expander></Column>
              <Column field="apellidos" header="Apellidos"></Column>
              <Column field="rol" header="Rol"></Column>
              <Column field="fecha_inscripcion" header="Fecha de Inscripción"></Column>
              <Column header='Nivel' body={(rowData)=>getNivelEtiqueta(rowData.data.nivel)}/>
              <Column field="ganancia" header="Ganancia"></Column>

            </TreeTable>
          )}
        </Card>
      </div>
      <GenerarPDF afiliados={filteredAfiliados} gananciaTotal={gananciaTotal} />
    </>
  );
}
