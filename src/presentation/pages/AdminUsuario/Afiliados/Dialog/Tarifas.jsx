import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

export default function Tarifas({ Visible, Close, clinica }) {
  console.log('datos', clinica);

  const headerTemplate = () => {
    return (
      <div className="flex flex-row gap-2">
        <span className="pi pi-building" style={{ fontSize: "40px", fontWeight: "500", color: "#85C226" }}></span>
        <span style={{ fontSize: "18px", fontWeight: "700", color: "#85C226" }}>{clinica.nombre}</span>
      </div>
    );
  };

  // Construir la URL del PDF
  const pdfUrl = `${process.env.REACT_APP_API_BASE_URL}${clinica?.tarifario}`;

  return (
    <Dialog visible={Visible} onHide={Close} header={headerTemplate} style={{ width: '650px',height:'650px' }}>
      <div>
        <iframe
          src={pdfUrl}
          style={{ width: "100%", height: "500px", border: "none" }}
          title="Tarifario PDF"
        ></iframe>
      </div>
      <div className='flex justify-content-end'>
        <Button style={{background: "#85C226", borderColor:'#85C226' }} label='Cerrar' onClick={Close}/>
      </div>
    </Dialog>
  );
}
