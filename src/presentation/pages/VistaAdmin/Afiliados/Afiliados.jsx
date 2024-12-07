import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import React, { useState } from 'react';
import AgregarFam from './Dialog/AgregarFam';


export default function UserAfiliados() {
  const[visible,setVisible]=useState(false)
  const DatosFamiliares = [
    {
      "id": "1",
      "dni": "12345678A",
      "nombres": "Juan",
      "apellidos": "Pérez García",
      "parentesco": "Esposo",
      "estado": "Activo"
    },
    {
      "id": "2",
      "dni": "23456789B",
      "nombres": "Ana",
      "apellidos": "López Martínez",
      "parentesco": "Esposa",
      "estado": "Activo"
    },
    {
      "id": "3",
      "dni": "34567890C",
      "nombres": "Carlos",
      "apellidos": "Fernández Sánchez",
      "parentesco": "Hijo",
      "estado": "Inactivo"
    },
    {
      "id": "4",
      "dni": "45678901D",
      "nombres": "María",
      "apellidos": "González Pérez",
      "parentesco": "Hija",
      "estado": "Activo"
    },
    {
      "id": "5",
      "dni": "56789012E",
      "nombres": "José",
      "apellidos": "Rodríguez Ruiz",
      "parentesco": "Hijo",
      "estado": "Activo"
    }
  ];

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
    let severity = 'info'; // Valor por defecto
    if (rowData.parentesco === 'Esposo' || rowData.parentesco === 'Esposa') {
      severity = 'info';
    } else if (rowData.parentesco === 'Hijo' || rowData.parentesco === 'Hija') {
      severity = 'Primary';
    }

    return (
      <Tag icon="pi pi-user" value={rowData.parentesco} severity={severity} />
    );
  };

  return (
    <>
      <div className="flex flex-column p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Afiliaciones a Familiares</h1>
        <Divider />
        <div className="flex justify-content-end align-items-center mt-4">
          <Button
            label="Mejorar Plan"
            style={{
              backgroundColor: "#85C226",
              borderColor: "#85C226",
              height: "60px",
              borderRadius: "6px",
              fontWeight: "bold",
              color: "#fff",
            }}
            icon="pi pi-plus"
            onClick={()=>setVisible(true)}
          />
        </div>
        
        {/* DataTable displaying the user data */}
        <DataTable value={DatosFamiliares} paginator rows={5} className="mt-4">
          <Column header="Nº" body={(rowData, { rowIndex }) => rowIndex + 1} />
          <Column field="dni" header="DNI" />
          <Column field="nombres" header="Nombres" />
          <Column field="apellidos" header="Apellidos" />
          <Column header="Parentesco" body={unionFamiliarTemplate} />
          <Column header="Estado" body={estadoTemplate} />
        </DataTable>
      </div>
      <AgregarFam Open={visible} Close={()=>setVisible(false)}/>
    </>
  );
}
