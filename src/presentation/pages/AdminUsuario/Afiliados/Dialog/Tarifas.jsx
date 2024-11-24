import React from 'react';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default function Tarifas({ Visible, Close, clinica }) {
  const consultas = [
    { consulta: 'Consulta medica General', tipo: 'CONSULTA EXTERNA', precio: 'S/ 30.00' },
    { consulta: 'Consulta medica Obstetrica', tipo: 'CONSULTA EXTERNA', precio: 'S/ 30.00' },
    { consulta: 'Consulta medica Nutrición', tipo: 'CONSULTA EXTERNA', precio: 'S/ 40.00' },
    { consulta: 'Consulta medica Psicología', tipo: 'CONSULTA EXTERNA', precio: 'S/ 40.00' },
    { consulta: 'Consulta medica Odontología', tipo: 'CONSULTA EXTERNA', precio: 'S/ 40.00' },
    { consulta: 'Consulta Cirugía Pedriática', tipo: 'CONSULTA EXTERNA', precio: 'S/ 50.00' },
    { consulta: 'Consulta medica Fisíca', tipo: 'CONSULTA EXTERNA', precio: 'S/ 50.00' },
    { consulta: 'Consulta medica traumatología', tipo: 'CONSULTA EXTERNA', precio: 'S/ 50.00' },
    { consulta: 'Consulta medica Pedriatría', tipo: 'CONSULTA EXTERNA', precio: 'S/ 50.00' },
    { consulta: 'Consulta medica Cardiología', tipo: 'CONSULTA EXTERNA', precio: 'S/ 50.00' },
    { consulta: 'Consulta medica Anestesiología', tipo: 'CONSULTA EXTERNA', precio: 'S/ 50.00' },
    { consulta: 'Consulta medica Neumología', tipo: 'CONSULTA EXTERNA', precio: 'S/ 50.00' },
    { consulta: 'Consulta medica Cirugía Plástica', tipo: 'CONSULTA EXTERNA', precio: 'S/ 50.00' },
    { consulta: 'Consulta medica Endocrinología', tipo: 'CONSULTA EXTERNA', precio: 'S/ 50.00' },
    { consulta: 'Consulta medica Reumatología', tipo: 'CONSULTA EXTERNA', precio: 'S/ 50.00' },
    { consulta: 'Consulta Medicina Interna', tipo: 'CONSULTA EXTERNA', precio: 'S/ 50.00' },
    { consulta: 'Consulta medica Neurología', tipo: 'CONSULTA EXTERNA', precio: 'S/ 50.00' },
    { consulta: 'Consulta medica Gastroenterología', tipo: 'CONSULTA EXTERNA', precio: 'S/ 50.00' },
    { consulta: 'Consulta de Toráx y Cardiovascular', tipo: 'CONSULTA EXTERNA', precio: 'S/ 50.00' },
    { consulta: 'Consulta de Otorrinolaringolgía', tipo: 'CONSULTA EXTERNA', precio: 'S/ 50.00' },
    { consulta: 'Consulta Cirugía General', tipo: 'CONSULTA EXTERNA', precio: 'S/ 50.00' },
    { consulta: 'Consulta Ginecología', tipo: 'CONSULTA EXTERNA', precio: 'S/ 50.00' },
    { consulta: 'Consulta medica Oftalmología', tipo: 'CONSULTA EXTERNA', precio: 'S/ 50.00' },
    { consulta: 'Consulta medica Urología', tipo: 'CONSULTA EXTERNA', precio: 'S/ 50.00' },
    { consulta: 'Consulta medica Neurocirugía', tipo: 'CONSULTA EXTERNA', precio: 'S/ 50.00' },
    { consulta: 'Consulta Neuropsicología', tipo: 'CONSULTA EXTERNA', precio: 'S/ 50.00' },
    { consulta: 'Consulta Oncológica', tipo: 'CONSULTA EXTERNA', precio: 'S/ 50.00' },
    { consulta: 'Consulta medica Geriatría', tipo: 'CONSULTA EXTERNA', precio: 'S/ 50.00' },
    { consulta: 'Consulta medica Dermatologíca', tipo: 'CONSULTA EXTERNA', precio: 'S/ 50.00' },
    { consulta: 'Consulta medica de Emergencia', tipo: 'EMERGENCIA', precio: 'S/ 50.00' },
    { consulta: 'Consulta medica Cabeza y Cuello', tipo: 'CONSULTA EXTERNA', precio: 'S/ 50.00' },
    { consulta: 'Consulta medica Neuropsicología-TEA', tipo: 'CONSULTA EXTERNA', precio: 'S/ 50.00' },
    { consulta: 'Consulta medica Psiquiatría Adulto', tipo: 'CONSULTA EXTERNA', precio: 'S/ 68.00' }
  ];

  const headerTemplate = () => {
    return (
      <div className='flex flex-row gap-2'>
        <span className="pi pi-building" style={{ fontSize: "40px", fontWeight: "500", color: "#85C226" }}></span>
        <span style={{ fontSize: "18px", fontWeight: "700", color: "#85C226" }}>{clinica.nombre}</span>
      </div>
    );
  };

  return (
    <Dialog visible={Visible} onHide={Close} header={headerTemplate} style={{ width: '650px' }}>
      <div>
        <DataTable value={consultas} paginator rows={10}>
          <Column field="consulta" header="Consulta" />
          <Column field="tipo" header="Tipo" />
          <Column field="precio" header="Precio" />
        </DataTable>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button label='Cerrar' icon="pi pi-times" onClick={Close} />
        </div>
      </div>
    </Dialog>
  );
}
