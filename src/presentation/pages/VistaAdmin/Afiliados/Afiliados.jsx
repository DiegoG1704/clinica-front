import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import React, { useState, useEffect } from 'react';
import { Tag } from 'primereact/tag';
import { apiAdapter } from '../../../../core/adapters/apiAdapter';
import { useAuth } from '../../../context/AuthContext/AuthContext';
import AgregarFam from './Dialog/AgregarFam';
import CustomDataTable from '../Autorizaciones/Componente/CustomDataTable';
import '../Autorizaciones/css/Administracion.css'

export default function UserAfiliados() {
  const [visible, setVisible] = useState(false);
  const [afiliadores, setAfiliadores] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const { user } = useAuth();

  const fetchAfiliadores = async () => {
    try {
      setLoading(true);
      const response = await apiAdapter.get(`GetFamiliares/${user?.id}`);
      console.log('Afiliadores cargados:', response);  // Verifica la respuesta de la API
      setAfiliadores(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching afiliadores:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAfiliadores();
  }, []);

  // Función para mostrar etiquetas con colores dependiendo del estado
  const estadoTemplate = (rowData) => {
    return (
      <Tag value={rowData.estado}
           severity={rowData.estado === 'Activo' ? 'success' : 'danger'}
           className="mr-2" />
    );
  };

  // Función para mostrar etiquetas con colores dependiendo de la unión familiar
  const unionFamiliarTemplate = (rowData) => {
    let parentescoLabel = '';  // Etiqueta de parentesco por defecto
    let severity = 'info';     // Valor por defecto para el color

    // Traducción de los valores de parentesco
    if (rowData.parentesco === '1') {
      parentescoLabel = 'Esposo(a)';
      severity = 'info';  // Puedes elegir otro color si lo prefieres
    } else if (rowData.parentesco === '2') {
      parentescoLabel = 'Hijo(a)';
      severity = 'primary';  // Color para "Hijo(a)"
    } else {
      parentescoLabel = 'Desconocido';  // Si el valor es algo distinto de '1' o '2'
      severity = 'warning';  // Un color de advertencia para valores desconocidos
    }

    return (
      <Tag icon="pi pi-user" value={parentescoLabel} severity={severity} />
    );
  };

  const columns = [
    { header: 'Nº', body: (rowData, { rowIndex }) => rowIndex + 1 },
    { field: 'dni', header: 'DNI' },
    { field: 'nombres', header: 'Nombres' },
    { field: 'apellidos', header: 'Apellidos' },
    { header: 'Parentesco', body: unionFamiliarTemplate },
    { header: 'Estado', body: estadoTemplate },
  ];

  return (
    <>
      <div className="flex flex-column p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Afiliaciones a Familiares</h1>
        <Divider />
        <div className="flex justify-content-end align-items-center mt-4">
          <Button
            label="Agregar Familiar"
            style={{
              backgroundColor: "#85C226",
              borderColor: "#85C226",
              height: "60px",
              borderRadius: "6px",
              fontWeight: "bold",
              color: "#fff",
            }}
            icon="pi pi-plus"
            onClick={() => setVisible(true)}
          />
        </div>

        {/* CustomDataTable displaying the user data */}
        <CustomDataTable
          columns={columns}
          value={afiliadores}
          paginator
          rows={5}
          className="mt-4"
        />
      </div>
      <AgregarFam Open={visible} Close={() => setVisible(false)} Actualizar={fetchAfiliadores} />
    </>
  );
}
