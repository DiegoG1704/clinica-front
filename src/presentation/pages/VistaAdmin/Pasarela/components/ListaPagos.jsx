import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React, { useState } from 'react';
import PasarelaPagos from './Pasarela';
import { differenceInDays, parse } from 'date-fns';
import { ProgressBar } from 'primereact/progressbar';
import { CheckCircle, AlertCircle, Clock, XCircle } from 'lucide-react';
import { useAuth } from '@/presentation/context/AuthContext/AuthContext';

export default function ListaPagos({ data, actualizar }) {
  const [visible, setVisible] = useState(false);
  const { user } = useAuth();

  const getEstadoStyle = (estado) => {
    switch (estado) {
      case 'Pagado':
        return 'bg-green-100 text-green-700';
      case 'Programado':
        return 'bg-blue-100 text-blue-700';
      case 'Vencido':
        return 'bg-red-100 text-red-700';
      case 'Verificando':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case 'Pagado':
        return <CheckCircle className="text-green-600" size={22} />;
      case 'Programado':
        return <Clock className="text-blue-600" size={22} />;
      case 'Vencido':
        return <XCircle className="text-red-600" size={22} />;
      case 'Verificando':
        return <AlertCircle className="text-yellow-600" size={22} />;
      default:
        return null;
    }
  };

  const capitalizar = (texto) => texto.charAt(0).toUpperCase() + texto.slice(1);

  const Dias = {
    fechaVencimiento: '16-09-2025',
  };

  const fechaVenc = parse(Dias.fechaVencimiento, 'dd-MM-yyyy', new Date());
  const hoy = new Date();
  const totalDias = 365;

  const diasRestantes = differenceInDays(fechaVenc, hoy);
  const esVencido = diasRestantes < 0;
  const diasValor = Math.abs(diasRestantes);
  let progreso = ((totalDias - diasRestantes) / totalDias) * 100;
  progreso = Math.min(Math.max(progreso, 0), 100);

  return (
    <div className="flex flex-column gap-5 p-3 md:p-4" style={{ fontFamily: 'Inter, sans-serif' }}>
      
      {/* Botón para pagar */}
      <div className="flex flex-column sm:flex-row sm:justify-content-end">
        <Button
          className="px-4 py-2 text-base sm:text-lg font-semibold border-none border-round shadow-2 w-full sm:w-auto"
          style={{
            backgroundColor: '#176abc',
            color: '#ffffff',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#155a9c')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#176abc')}
          onClick={() => setVisible(true)}
        >
          Renovar
        </Button>
      </div>

      {/* Progreso */}
      <div className="p-3 surface-100 border-round shadow-1">
        <h2 className="text-xl sm:text-2xl font-bold mb-3" style={{ color: '#b0c802' }}>
          Días {esVencido ? 'vencidos' : 'restantes'}:{' '}
          <span style={{ color: '#16617c' }}>{diasValor}</span>
        </h2>
        <ProgressBar
          value={progreso}
          style={{ height: '24px', backgroundColor: '#e5e7eb' }}
          className="border-round"
          color={esVencido ? '#dc2626' : '#16617c'}
          displayValueTemplate={() =>
            `${diasValor} días ${esVencido ? 'vencidos' : 'restantes'}`
          }
        />
      </div>

      {/* Historial */}
      <div className="px-1 sm:px-0">
        <h3 className="text-xl sm:text-2xl mb-3 font-semibold" style={{ color: '#b0c802' }}>
          Historial de pagos
        </h3>

        <div className="grid grid-nogutter sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((pago) => (
            <div
              key={pago.id}
              className="p-3 sm:p-4 border-1 border-gray-200 border-round shadow-2 surface-card"
            >
              {/* Estado */}
              <div className="flex justify-content-between align-items-center mb-3">
                <span
                  className={`px-3 py-1 text-sm font-semibold border-round ${getEstadoStyle(pago.estado)}`}
                >
                  {capitalizar(pago.estado)}
                </span>
                {getEstadoIcon(pago.estado)}
              </div>

              {/* Info */}
              <div className="mb-2 text-sm text-900">
                <strong>Fecha de pago:</strong> {pago.fechaPago}
              </div>
              <div className="mb-2 text-sm text-900">
                <strong>Tipo de pago:</strong> {pago.tipopago}
              </div>
              <div className="mb-2 text-sm text-900">
                <strong>Rol pagado:</strong> {pago.tipopagorol}
              </div>

              {/* Comprobante */}
              {pago.archivo && (
                <a
                  href={`${process.env.REACT_APP_API_BASE_URL}uploads/${pago.archivo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-700 underline mt-2 inline-block"
                >
                  Ver comprobante
                </a>
              )}

              {/* Botón pagar */}
              {(pago.estado === 'vencido' || pago.estado === 'proximo') && (
                <Button
                  label="Pagar"
                  className="mt-3 text-sm font-semibold border-none border-round w-full"
                  style={{
                    backgroundColor: '#176abc',
                    color: '#fff',
                  }}
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal de pago */}
      <Dialog
        visible={visible}
        onHide={() => setVisible(false)}
        header="Realizar pago"
        className="p-fluid w-full sm:w-10 md:w-6 lg:w-4"
      >
        <PasarelaPagos
          onSuccess={() => {
            setVisible(false);
            actualizar();
          }}
          rolId={Number(user?.rolId)}
        />
      </Dialog>
    </div>
  );
}
