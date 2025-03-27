import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import CustomDialog from '../../../../components/Dialog/CustomDialog';
import PdfViewer from '@/presentation/components/PdfViewer/PdfViewer';

export default function Tarifas({ Visible, Close, clinica }) {
  const footerTemplate = () => (<div className='flex justify-content-end'>
    <Button style={{ background: "#85C226", borderColor: '#85C226' }} label='Cerrar' onClick={Close} />
  </div>)


  // Construir la URL del PDF
  const pdfUrl = `${process.env.REACT_APP_API_BASE_URL}${clinica?.tarifario}`;

  return (
    <CustomDialog iconClassName={"pi pi-building"} visible={Visible} onhide={Close} footer={footerTemplate} width='90vw' height={"90vh"} title={clinica?.nombre}>
      <div className='w-full h-full' >
        <PdfViewer fileUrl={pdfUrl} />
      </div>
    </CustomDialog>
  );
}
