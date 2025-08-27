import React, { useEffect, useState } from 'react';
import { Divider } from 'primereact/divider';
import PasarelaPagos from './components/Pasarela';
import ListaPagos from './components/ListaPagos';
import { useAuth } from '@/presentation/context/AuthContext/AuthContext';
import { apiAdapter } from '@/core/adapters/apiAdapter';

export default function VistaPagos() {
  // const pagos = [
  //   {
  //     id: 1,
  //     fechaPago: '12-08-2025',
  //     fechaVenc: '12-08-2026',
  //     estado: 'proximo',
  //     tipopagoRol:'Afiliado',
  //     tipoPago: 'transferencia',
  //     archivo: 'ddd'
  //   },
  //   {
  //     id: 2,
  //     fechaPago: '12-08-2025',
  //     fechaVenc: '12-08-2026',
  //     estado: 'vencido',
  //     tipopagoRol:'Afiliado',
  //     tipoPago: 'transferencia',
  //     archivo: 'ddd'
  //   },
  //   {
  //     id: 3,
  //     fechaPago: '12-08-2025',
  //     fechaVenc: '12-08-2026',
  //     estado: 'verificando',
  //     tipopagoRol:'Promotor',
  //     tipoPago: 'transferencia',
  //     archivo: 'ddd'
  //   },
  //   {
  //     id:4,
  //     fechaPago: '12-08-2025',
  //     fechaVenc: '12-08-2026',
  //     estado: 'pagado',
  //     tipopagoRol:'Afiliado + Promotor',
  //     tipoPago: 'transferencia',
  //     archivo: 'ddd'
  //   },
  // ];
  const[pagos,setPagos]=useState([])
  const{user}=useAuth()
  const fechPagos=async()=>{
    try {
      const response = await apiAdapter.get(`/pagosRealizados/${user?.id}`)
      setPagos(response)
    } catch (error) {
      console.log('error',error);
    }
  }

  useEffect(() => {
      fechPagos();
    }, []);

  const tienePagos = pagos && pagos.length > 0;

  return (
    <div className="flex flex-column p-4 bg-white shadow-2 border-round" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gestión de Pagos</h1>
        <p className="text-muted-foreground mt-1">Administra y realiza seguimiento de tus pagos</p>
      </div>
      <Divider />
      
      {tienePagos ? (
        <ListaPagos data={pagos} actualizar={fechPagos} />
        ) : (
          <div className="flex justify-content-center">
            <PasarelaPagos onSuccess={fechPagos} rolId={4}/>
          </div>
        )}
    </div>
  );
}
