import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import { Divider } from 'primereact/divider'
import React, { useState } from 'react'
import TerminosyCond from '../../../login/Dialog/TerminosyCond';

export default function TermYCond() {
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(false);
    const handleTermsAccept = () => {
        setChecked(true);
        setOpen(false);
    };
  return (
    <>
        <p className="message__title">Agregar a un Familiar</p>
        <p className="text-lg font-semibold mb-3 text-gray-700">Para agregar a un familiar debe seguir los pasos</p>
        <Divider align="center" className="mb-4">
            <div className="inline-flex align-items-center">
                <i className="pi pi-lightbulb mr-2 text-yellow-500" />
                <p><strong>PASOS</strong></p>
            </div>
        </Divider>
        <p>- Depositar la cantidad de <strong>S/. 59</strong></p>
        <p>- Enviar el comprobante a este número <strong>920517220</strong></p>
        <p>- El estado de familiar agregado cambiara en el lapso de 24h después de la transferencia o 48h de la </p>
        <p>transferencia interbancaria y podra visualizarse en las listas de las clinicas y sera beneficiario</p>
        <p>de las promociones</p>
        <Divider align="center" className="my-4">
            <div className="inline-flex align-items-center">
                <p><strong>PAGOS</strong></p>
            </div>
        </Divider>
        <p><strong>BCP: ADB CONSULTING SAC</strong></p>
        <p><i className="pi pi-credit-card" style={{ fontSize: '1rem' }}></i> Cuenta Corriente SOLES: <strong>194-2659964-0-21</strong></p>
        <p><i className="pi pi-credit-card" style={{ fontSize: '1rem' }}></i> CCI Moneda Nacional: <strong>002-19400265996402191</strong></p>
        <p><i className="pi pi-mobile" style={{ fontSize: '1rem' }}></i> Yape: <strong>920517220</strong></p>

        <div className="flex justify-content-center my-4">
            <Checkbox
                onChange={e => { setChecked(e.checked) }}
                checked={checked}
                className="mr-2"
            />
            <p className="text-sm">
                Al registrarte aceptas haber leído y estar de acuerdo con la
                <span onClick={() => setOpen(true)} className="text-blue-600 font-bold cursor-pointer"> Política de Privacidad y los Términos y Condiciones</span>
            </p>
        </div>
        <TerminosyCond visible={open} Close={() => setOpen(false)} Aceptar={handleTermsAccept} PDF={'PROMOTOR.pdf'} />
    </>
  )
}
