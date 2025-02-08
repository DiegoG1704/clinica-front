import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import React from 'react'

export default function TerminosyCond({visible,Close,Aceptar,PDF}) {
  return (
    <Dialog header="Términos y Condiciones" visible={visible} style={{ width: '50vw' }} onHide={Close}>
        <iframe
          src={`${process.env.REACT_APP_API_BASE_URL}FilePdf/${PDF}`}
          style={{ width: "100%", height: "500px", border: "none" }}
          title="Tarifario PDF"
        ></iframe>
        <Button label="Aceptar" onClick={Aceptar} />
    </Dialog>
  )
}
