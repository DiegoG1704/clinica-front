import axios from 'axios';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { TreeTable } from 'primereact/treetable';
import React, { useEffect, useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';

export default function SubAfiliados({ UserId }) {
  const [afiliados, setAfiliados] = useState([]);
  const [filteredAfiliados, setFilteredAfiliados] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const toast = useRef(null);

  useEffect(() => {
    const fetchAfiliados = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/usuarios/${UserId?.id}`);
        const formattedData = response.data.map(formatAfiliados);
        setAfiliados(formattedData);
        setFilteredAfiliados(formattedData); // Inicialmente, mostrar todos los afiliados
      } catch (error) {
        console.error('Error al obtener los afiliados:', error);
      }
    };

    fetchAfiliados();
  }, [UserId]);

  const formatAfiliados = (data, parentId = null) => {
    return {
      key: `${parentId || 'root'}_${data.id}`,
      data: {
        nombres: data.nombres || 'Sin nombre',
        apellidos: data.apellidos || 'Sin apellido',
        dni: data.dni || 'N/A',
        telefono: data.telefono !== null ? data.telefono : 'Sin teléfono',
        rol: data.rol || 'Sin rol',
      },
      children: data.children?.map(child => formatAfiliados(child, data.id)) || []
    };
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    // Filtrar afiliados según el término de búsqueda
    const filtered = afiliados.filter(afiliado =>
      afiliado.data.nombres.toLowerCase().includes(value) ||
      afiliado.data.apellidos.toLowerCase().includes(value) ||
      afiliado.data.dni.toLowerCase().includes(value) ||
      afiliado.data.telefono.toString().includes(value)
    );

    setFilteredAfiliados(filtered);
  };

  const [codigo, setCodigo] = useState('');
  
  const generarCodigoUnico = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigoGenerado = '';
    for (let i = 0; i < 10; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      codigoGenerado += caracteres.charAt(indice);
    }
    setCodigo(codigoGenerado);
  };

  const copiarCodigo = async () => {
    if (codigo) {
      try {
        await navigator.clipboard.writeText(codigo);
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Código copiado exitosamente', life: 3000 });
      } catch (err) {
        console.error('Error al copiar el código:', err);
      }
    }
  };
  const actionsTemplate = (rowData) => (
    <div className='flex gap-2'>
      <Button icon="pi pi-trash" className="bg-white border-none shadow-none" style={{ color: "red" }} />
    </div>
  );

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
            label='Afiliar Usuarios'
            style={{ backgroundColor: "#85C226", borderColor: "#85C226", width: "200px", height: "60px" }}
            onClick={generarCodigoUnico}
          />
          <Button
            label={codigo || 'Código'}
            disabled={!codigo}
            style={{ backgroundColor: "#85C226", borderColor: "#85C226", width: "200px", height: "60px" }}
            onClick={copiarCodigo}
          />
        </div>
      </div>
      <div className="flex justify-content-center">
        <Card style={{ width: '80%', height: '7rem' }}>
          <InputText
            placeholder='Buscar afiliado...'
            style={{ width: '50%', height: '4rem', borderRadius: '15px' }}
            value={searchTerm}
            onChange={handleSearch}
            className="flex justify-content-left"
          />
        </Card>
      </div>
      <div className="flex justify-content-center">
        <Card style={{ width: '80%', marginTop: '15px' }}>
          <TreeTable value={filteredAfiliados} tableStyle={{ minWidth: '50rem' }} dataKey="key" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
            <Column field="nombres" header="Nombres" expander></Column>
            <Column field="apellidos" header="Apellidos"></Column>
            <Column field="dni" header="DNI"></Column>
            <Column field="telefono" header="Teléfono"></Column>
            <Column field="rol" header="Rol"></Column>
            <Column header='Editar' body={actionsTemplate}></Column>
          </TreeTable>
        </Card>
      </div>
    </>
  );
}
