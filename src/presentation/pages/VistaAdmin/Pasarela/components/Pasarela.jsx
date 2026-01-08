import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';
import { apiAdapter } from '@/core/adapters/apiAdapter';
import { useAuth } from '@/presentation/context/AuthContext/AuthContext';
import TerminosyCond from '@/presentation/pages/login/Dialog/TerminosyCond';

import yape from '../../../../img/yape-bcp-37283_logosenvector.com_5.png';
import trasferencia from '../../../../img/klipartz.com (8).png';

export default function PasarelaPagos({ onSuccess, rolId }) {
  const { user } = useAuth();
  const toast = useRef(null);
console.log("rol",rolId);

  const [checked, setChecked] = useState(false);
  const [openTC, setOpenTC] = useState(false);

  const roles = [
    { name: 'Afiliado', id: 4, cantidad: 118 },
    { name: 'Promotor', id: 3, cantidad: 56 },
    { name: 'Afiliado + Promotor', id: 5, cantidad: 150 }
  ];

  const currentRol = roles.find(r => r.id === rolId);

  /* ===================== CULQI ===================== */
  useEffect(() => {
    if (!currentRol) return;

    const script = document.createElement('script');
    script.src = 'https://checkout.culqi.com/js/v4';
    script.async = true;

    script.onload = () => {
      window.Culqi.publicKey = 'pk_test_icMwsrYEU3AFwtWY';

      window.Culqi.settings({
        title: 'Mi Tienda',
        currency: 'PEN',
        amount: currentRol.cantidad * 100, // centavos
      });

      window.Culqi.options({
        lang: 'es',
        modal: true,
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [currentRol]);

  useEffect(() => {
  window.culqi = async () => {
    try {
      if (window.Culqi.token) {
        const token = window.Culqi.token.id;

         await apiAdapter.post(`/culqi/charge/${user.id}`, {
          token,
          monto: currentRol.cantidad,   // ✅ EN SOLES
          rol_id: rolId,                // ✅ correcto
        });

        toast.current.show({
          severity: 'success',
          summary: 'Pago exitoso',
          life: 4000
        });

        setTimeout(() => {
          window.location.reload();
        }, 1200);

        onSuccess?.();
      } else {
        console.error(window.Culqi.error);
      }
    } catch (error) {
      toast.current.show({
        severity: 'error',
        summary: 'Error en el pago',
        life: 4000
      });
    } finally {
      // 🔴 ESTO GARANTIZA QUE CULQI SE CIERRE
      window.Culqi.close();
    }
  };

  return () => {
    delete window.culqi;
  };
}, [currentRol, rolId, user, onSuccess]);

  /* ================================================= */

  const openCheckout = () => {
    if (!checked) {
      toast.current.show({
        severity: 'warn',
        summary: 'Términos y Condiciones',
        detail: 'Debes aceptar los términos y condiciones.',
        life: 4000
      });
      return;
    }

    window.Culqi.open();
  };

  const hideDialog = () => {
    setChecked(true);
    setOpenTC(false);
  };

  return (
    <div className="p-4 bg-blue-50 border-round-2xl">
      <Toast ref={toast} />

      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="text-2xl font-bold text-[#b0c802]">Resumen del Pago</h2>
        <p className="text-lg text-[#16617c] mt-2">
          Rol seleccionado: <strong>{currentRol?.name}</strong><br />
          Monto a pagar: <strong>S/ {currentRol?.cantidad}</strong>
        </p>
      </div>

      {/* Métodos de pago */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 text-[#176abc]">
          Metodos de pago
        </h3>

        <div className="flex flex-wrap gap-3">
          <MetodoPago
            icon={trasferencia}
            label="Transferencia"
          />

          <MetodoPago
            icon={yape}
            label="Yape"
          />
        </div>
      </div>

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
        <div>
          <strong className="text-[#16617c]">Yape:</strong>
          <p className="bg-white border p-2 rounded mt-1">920517220</p>
        </div>
      </div>

      {/* Aviso */}
      <div className="flex align-items-center gap-2 mb-4">
        <i className="pi pi-exclamation-circle" />
        <p>
          Cualquier inconveniente, comunicarse por WhatsApp al{' '}
          <strong>920 517 220</strong>
        </p>
      </div>


      {/* Términos */}
      <div className="flex items-start gap-2 mb-4">
        <Checkbox checked={checked} onChange={e => setChecked(e.checked)} />
        <p className="text-sm">
          Acepto la{' '}
          <span
            onClick={() => setOpenTC(true)}
            className="text-blue-800 font-semibold underline cursor-pointer"
          >
            Política de Privacidad y Términos y Condiciones
          </span>
        </p>
      </div>

      {/* Botón */}
      <Button
        label="Realizar Pago"
        className="w-full"
        style={{ backgroundColor: '#176abc', borderColor: '#176abc' }}
        onClick={openCheckout}
      />

      {/* Modal términos */}
      <TerminosyCond
        visible={openTC}
        Close={() => setOpenTC(false)}
        Aceptar={hideDialog}
        PDF="PROMOTOR.pdf"
      />
    </div>
  );
}

/* =================== COMPONENTE AUXILIAR =================== */
function MetodoPago({icon, label }) {
  return (
    <div
      className="flex align-items-center gap-3 px-4 py-3 border-2 border-round cursor-pointer transition 
      border-white bg-white text-gray-700"
    >
      <img src={icon} alt={label} className="w-2rem h-2rem" />
      {label}
    </div>
  );
}
