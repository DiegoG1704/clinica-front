import React, { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { apiAdapter } from '@/core/adapters/apiAdapter';
import { useAuth } from '@/presentation/context/AuthContext/AuthContext';
import TerminosyCond from '@/presentation/pages/login/Dialog/TerminosyCond';
import { Toast } from 'primereact/toast';

export default function PasarelaPagos({ onSuccess, rolId }) {
  const [metodoPago, setMetodoPago] = useState('transferencia');
  const [voucherFile, setVoucherFile] = useState(null);
  const { user } = useAuth();
  const [openTC, setOpenTC] = useState(false);
  const [checked, setChecked] = useState(false);
  const [voucherPreview, setVoucherPreview] = useState(null);
  const fileInputRef = useRef(null);
  const toast = useRef(null);

  const roles = [
    { name: 'Afiliado', id: 4, cantidad: 118 },
    { name: 'Promotor', id: 3, cantidad: 56 },
    { name: 'Afiliado + Promotor', id: 5, cantidad: 150 }
  ];

  const hideDialog = () => {
      setChecked(true)
      setOpenTC(false)
  }

  const [selectedrol, setSelectedrol] = useState(rolId);
  const currentRol = roles.find(r => r.id === selectedrol);

  const handleMetodoPago = (metodo) => {
    setMetodoPago(prev => (prev === metodo ? '' : metodo));
    setVoucherPreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setVoucherFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setVoucherPreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!checked) {
      toast.current.show({
        severity: 'warn',
        summary: 'Términos y Condiciones',
        detail: 'Debes aceptar los términos y condiciones para continuar.',
        life: 4000
      });
      return;
    }

    if (!voucherFile) {
      toast.current.show({
        severity: 'error',
        summary: 'Voucher no adjunto',
        detail: 'Por favor, adjunta un comprobante de pago.',
        life: 4000
      });
      return;
    }


    try {
      const formData = new FormData();
      formData.append('tipoPagoRol', rolId);
      formData.append('imagenPago', voucherFile);
      formData.append('tipopago', metodoPago);

      const response = await apiAdapter.post(`/crearPago/${user?.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onSuccess();
      toast.current.show({
        severity: 'success',
        summary: 'Pago Enviado',
        detail: 'Tu comprobante fue enviado correctamente.',
        life: 4000
      });
    } catch (error) {
      toast.current.show({
        severity: 'error',
        summary: 'Error al enviar',
        detail: 'Hubo un problema al enviar el pago.',
        life: 4000
      });
    }
  };

  const renderVoucherUpload = () => (
    <>
      <div
        className="flex flex-column align-items-center justify-content-center border-2 border-dashed border-300 p-4 border-round cursor-pointer hover:surface-hover transition"
        onClick={() => fileInputRef.current.click()}
      >
        <i className="pi pi-upload text-2xl mb-2" />
        <span className="text-600 font-medium">Adjuntar voucher</span>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {voucherPreview && (
        <div className="mt-3 text-center">
          <p className="text-sm text-600 mb-2">Previsualización:</p>
          <img src={voucherPreview} alt="Voucher" className="border-round border-1 surface-border w-full max-w-20rem mx-auto" />
        </div>
      )}

      <Button
        label="Enviar"
        className="w-full mt-3"
        style={{ backgroundColor: '#176abc', borderColor: '#176abc' }}
        onClick={handleSubmit}
      />
    </>
  );

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <div className="flex flex-column align-items-center mb-5 text-center">
        <h1 className="text-2xl font-semibold text-[#b0c802] mb-3">Realizar el pago</h1>

        <div className="flex flex-column w-full md:w-30rem text-left gap-4 mb-4">
          <strong className="text-xl mb-1" style={{ color: '#2e7d32' }}>Selecciona método de pago</strong>
          <div className="flex flex-column sm:flex-row justify-content-center gap-3">
            <div className="flex align-items-center gap-2 cursor-pointer" onClick={() => handleMetodoPago('transferencia')}>
              <Checkbox inputId="transferencia" checked={metodoPago === 'transferencia'} />
              <label htmlFor="transferencia" className="text-base">Transferencia</label>
            </div>
            <div className="flex align-items-center gap-2 cursor-pointer" onClick={() => handleMetodoPago('yape')}>
              <Checkbox inputId="yape" checked={metodoPago === 'yape'} />
              <label htmlFor="yape" className="text-base">Yape</label>
            </div>
          </div>
        </div>
      </div>

      {(metodoPago === 'transferencia' || metodoPago === 'yape') && (
        <div className="flex justify-content-center px-2">
          <div className="flex flex-column w-full md:w-30rem">
            <p className="text-xl mb-2" style={{ color: '#2e7d32', fontWeight: 600 }}>Indicaciones:</p>
            <p className="text-md text-700">
              - Depositar cantidad de <span style={{ color: '#2e7d32', fontWeight: 600 }}>S/{currentRol?.cantidad ?? '...'}</span>
            </p>
            <p className="text-sm text-600">- Adjuntar el Voucher del pago</p>
            <p className="text-sm text-600 mb-3">- La cuenta se activará hasta 24h después de la transferencia o 48h si es interbancaria.</p>

            <div className="border-1 border-round p-3 mb-4" style={{ background: '#f0fdfa', borderColor: '#99f6e4' }}>
              <p className="text-lg mb-2" style={{ color: '#0f766e', fontWeight: 600 }}>Pagos</p>

              {metodoPago === 'transferencia' ? (
                <div className="flex flex-column gap-3">
                  <div className="flex flex-column">
                    <strong className="text-sm mb-1" style={{ color: '#0f766e' }}>Nombre de cuenta:</strong>
                    <span className="px-2 py-1 border-round border-1" style={{ borderColor: '#99f6e4', background: '#ffffff', color: '#0f766e' }}>ADB CONSULTING SAC</span>
                  </div>
                  <div className="flex flex-column">
                    <strong className="text-sm mb-1" style={{ color: '#0f766e' }}>Cuenta Corriente SOLES:</strong>
                    <span className="px-2 py-1 border-round border-1" style={{ borderColor: '#99f6e4', background: '#ffffff', color: '#0f766e' }}>194-2659964-0-21</span>
                  </div>
                  <div className="flex flex-column">
                    <strong className="text-sm mb-1" style={{ color: '#0f766e' }}>CCI Moneda Nacional:</strong>
                    <span className="px-2 py-1 border-round border-1" style={{ borderColor: '#99f6e4', background: '#ffffff', color: '#0f766e' }}>002-19400265996402191</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-column">
                  <strong className="text-sm mb-1" style={{ color: '#0f766e' }}>Yape:</strong>
                  <span className="px-2 py-1 border-round border-1" style={{ borderColor: '#99f6e4', background: '#ffffff', color: '#0f766e' }}>920517220</span>
                </div>
              )}
            </div>
            <div className='flex'>
              <Checkbox
                  onChange={e => { setChecked(e.checked) }}
                  checked={checked}
                  className="mt-2"
              />
              <p className="text-sm">
                  Al registrarte aceptas haber leído y estar de acuerdo con la
                  <span onClick={() => setOpenTC(true)} className="text-blue-600 font-bold cursor-pointer"> Política de Privacidad y los Términos y Condiciones</span>
              </p>
            </div>

            {renderVoucherUpload()}
          </div>
        </div>
      )}
    <TerminosyCond visible={openTC} Close={() => setOpenTC(false)} Aceptar={hideDialog} PDF={'PROMOTOR.pdf'} />
    </div>
  );
}
