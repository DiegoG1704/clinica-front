import React, { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { apiAdapter } from '@/core/adapters/apiAdapter';
import { useAuth } from '@/presentation/context/AuthContext/AuthContext';
import TerminosyCond from '@/presentation/pages/login/Dialog/TerminosyCond';
import { Toast } from 'primereact/toast';
import yape from '../../../../img/yape-bcp-37283_logosenvector.com_5.png'
import trasferencia from '../../../../img/klipartz.com (8).png'

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

    // if (!voucherFile) {
    //   toast.current.show({
    //     severity: 'error',
    //     summary: 'Voucher no adjunto',
    //     detail: 'Por favor, adjunta un comprobante de pago.',
    //     life: 4000
    //   });
    //   return;
    // }


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

  return (
    <div className="p-4 bg-blue-50 border-round-2xl">
      <Toast ref={toast} />

      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="text-2xl font-bold" style={{ color: '#b0c802' }}>Resumen del Pago</h2>
        <p className="text-lg text-[#16617c] mt-2">
          Rol seleccionado: <span className="font-semibold">{currentRol?.name}</span><br />
          Monto a pagar: <span className="font-bold">S/ {currentRol?.cantidad}</span>
        </p>
      </div>

      {/* Método de pago */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2" style={{ color: '#176abc' }}>Selecciona un método de pago</h3>
        <div className="flex flex-wrap gap-3">
          {/* Transferencia */}
          <div
            className={`flex align-items-center gap-3 px-4 py-3 border-2 border-round cursor-pointer transition w-full sm:w-12rem justify-content-center text-base font-medium
              ${metodoPago === 'transferencia'
                ? 'border-[#176abc] bg-[#e0f2fe] text-[#176abc]'
                : 'border-gray-300 bg-white text-gray-700'}`}
            onClick={() => handleMetodoPago('transferencia')}
          >
            <img src={trasferencia} alt="Transferencia" className="w-2rem h-2rem object-contain" />
            Transferencia
          </div>

          {/* Yape */}
          <div
            className={`flex align-items-center gap-3 px-4 py-3 border-2 border-round cursor-pointer transition w-full sm:w-12rem justify-content-center text-base font-medium
              ${metodoPago === 'yape'
                ? 'border-[#9333ea] bg-[#f3e8ff] text-[#9333ea]'
                : 'border-gray-300 bg-white text-gray-700'}`}
            onClick={() => handleMetodoPago('yape')}
          >
            <img src={yape} alt="Yape" className="w-2rem h-2rem object-contain" />
            Yape
          </div>
        </div>
      </div>

      {/* Indicaciones y datos bancarios */}
      {metodoPago && (
        <div className="border-1 border-round p-4 mb-4" style={{ background: '#f9fafb', borderColor: '#d1d5db' }}>
          <h4 className="text-lg font-bold mb-2" style={{ color: '#b0c802' }}>Instrucciones de pago</h4>
          <ul className="text-sm text-gray-700 list-disc ml-4 mb-3">
            <li>Deposita <strong>S/ {currentRol?.cantidad}</strong> a la cuenta indicada.</li>
            <li>Adjunta el comprobante del pago.</li>
            <li>Activación: hasta 24h (48h si es interbancario).</li>
          </ul>

          {metodoPago === 'transferencia' && (
            <div className="flex flex-column gap-3 text-sm">
              <div>
                <strong className="text-[#16617c]">Nombre de cuenta:</strong>
                <p className="bg-white border p-2 rounded mt-1">ADB CONSULTING SAC</p>
              </div>
              <div>
                <strong className="text-[#16617c]">Cuenta Corriente:</strong>
                <p className="bg-white border p-2 rounded mt-1">194-2659964-0-21</p>
              </div>
              <div>
                <strong className="text-[#16617c]">CCI:</strong>
                <p className="bg-white border p-2 rounded mt-1">002-19400265996402191</p>
              </div>
            </div>
          )}

          {metodoPago === 'yape' && (
            <div className="mt-3 text-sm">
              <strong className="text-[#16617c]">Yape:</strong>
              <p className="bg-white border p-2 rounded mt-1 w-fit">920517220</p>
            </div>
          )}
        </div>
      )}

      {/* Subir Voucher */}
      {metodoPago && (
        <div className="mb-4">
          <h4 className="text-md font-semibold mb-2" style={{ color: '#176abc' }}>Sube tu voucher</h4>
          <div
            className="flex flex-column align-items-center justify-content-center border-2 border-dashed border-gray-300 p-4 border-round cursor-pointer hover:bg-gray-50 transition"
            onClick={() => fileInputRef.current.click()}
          >
            <i className="pi pi-upload text-2xl mb-2 text-gray-600" />
            <span className="text-gray-700">Haz clic para adjuntar comprobante</span>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {voucherPreview && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-1">Previsualización:</p>
              <img
                src={voucherPreview}
                alt="Voucher"
                className="border-round border-1 surface-border w-full max-w-20rem mx-auto"
              />
            </div>
          )}
        </div>
      )}
      <div className='flex align-items-center message-document'>
        <i className='pi pi-exclamation-circle'></i>
        <p>Si lo prefieres, también puedes enviar la imagen del <br/>comprobante por WhatsApp al número <strong>920 517 220</strong>.</p>
      </div>
      {/* Términos y condiciones */}
      <div className="flex items-start gap-2 mb-4">
        <Checkbox onChange={e => setChecked(e.checked)} checked={checked} />
        <p className="text-sm text-gray-700">
          Acepto la{' '}
          <span onClick={() => setOpenTC(true)} className="text-blue-800 font-semibold underline cursor-pointer">
            Política de Privacidad y los Términos y Condiciones
          </span>
        </p>
      </div>

      {/* Botón Enviar */}
      <Button
        label="Enviar comprobante"
        className="w-full"
        style={{ backgroundColor: '#176abc', borderColor: '#176abc' }}
        onClick={handleSubmit}
      />

      {/* Modal de términos */}
      <TerminosyCond visible={openTC} Close={() => setOpenTC(false)} Aceptar={hideDialog} PDF={'PROMOTOR.pdf'} />
    </div>


  );
}
