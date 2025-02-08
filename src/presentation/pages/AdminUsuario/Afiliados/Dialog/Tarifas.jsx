import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import CustomDialog from '../../../../components/Dialog/CustomDialog';

export default function Tarifas({ Visible, Close, clinica }) {
  const footerTemplate = () => (<div className='flex justify-content-end'>
    <Button style={{ background: "#85C226", borderColor: '#85C226' }} label='Cerrar' onClick={Close} />
  </div>)
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
    <CustomDialog iconClassName={"pi pi-building"} visible={Visible} onhide={Close} footer={footerTemplate} width='90vw' height={"90vh"} title={clinica?.nombre}>
      <div className='h-full'>
        <iframe
          src={pdfUrl}
          style={{ width: "100%", height: "100%", border: "none" }}
          title="Tarifario PDF"
        ></iframe>
      </div>

    </CustomDialog>
  );
}
