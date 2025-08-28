import { apiAdapter } from '@/core/adapters/apiAdapter';
import { Button } from 'primereact/button';
import React, { useEffect, useState, useRef } from 'react';
import { Toast } from 'primereact/toast';

export default function PagosVerif() {
  const [pagos, setPagos] = useState([]);
  const toast = useRef(null);

  const fetchPagos = async () => {
    try {
      const response = await apiAdapter.get('pagosVerificar');
      setPagos(response);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchPagos();
  }, []);

  const handleSubmit = async ({ userId, pago_id, tipopagorol }) => {
    try {
      await apiAdapter.post(`ActualizarEstadoPago/${userId}/${pago_id}`, { rol_id: Number(tipopagorol)});
      toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Pago aprobado correctamente', life: 3000 });
      fetchPagos(); // refrescar lista
    } catch (error) {
      console.log('error', error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo aprobar el pago', life: 3000 });
    }
  };


  return (
    <div className="p-4">
      <Toast ref={toast} />
      <h2 className="text-2xl font-bold mb-4 text-900">Pagos por Verificar</h2>
      <div className="grid">
        {pagos.map((pago) => (
          <div key={pago.id} className="col-12 md:col-6 lg:col-4">
            <div className="p-4 border-1 surface-border border-round surface-card shadow-1 flex flex-column justify-between h-full">
              <div className="mb-2">
                <div className="text-900 mb-1">
                  <strong>{pago.nombres} {pago.apellidos}</strong>
                </div>
                <div className="text-900 mb-1">
                  <strong>Teléfono:</strong> {pago.telefono}
                </div>
                <div className="text-900 mb-1">
                  <strong>Fecha:</strong> {pago.fechapago}
                </div>
                <div className="text-900 mb-1">
                  <strong>Tipo de pago:</strong> {pago.tipopago}
                </div>
                <div className="text-900 mb-2">
                  <strong>Rol pagado:</strong> {pago.tipopagorol}
                </div>
              </div>

              {pago.archivo? (
                <a
                  href={`${process.env.REACT_APP_API_BASE_URL}uploads/${pago.archivo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-sm underline mb-3 inline-block"
                >
                  Ver comprobante
                </a>
              ) : (
                <p className="text-sm text-gray-600 mb-3 italic">
                  El comprobante fue enviado por WhatsApp.
                </p>
              )}

              <Button
                label="Aprobar"
                icon="pi pi-check"
                className="w-full p-button-sm"
                severity="success"
                onClick={() => handleSubmit(pago)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
