import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { apiAdapter } from '../../../core/adapters/apiAdapter';
import logo from '../../img/sinLogo.png';
import CreatePromo from './Dialog/DialogCreatePromo';
import EditarPromo from './Dialog/DialogEditarPromo';
import DeletePromo from './Dialog/DialogDeletePromo';
import { Card } from 'primereact/card';
import PromoPDF from './Pdf/PromoPDF';
import * as XLSX from 'xlsx';

export default function PromocionesLocales() {
  const [promociones, setPromociones] = useState([]);
  const [agregar, setAgregar] = useState(false);
  const [editar, setEditar] = useState(false);
  const [eliminar, setEliminar] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  console.log('user',user);
  
  const fetchPromociones = async () => {
    try {
      setLoading(true);
      const response = await apiAdapter.get(`getClinicaId/${user?.clinica_id}`);
      setPromociones(response);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener las promociones:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromociones();
  }, [user]);

  console.log('datosClinica',promociones);
  const pdfUrl = `${process.env.REACT_APP_API_BASE_URL}${promociones?.tarifario}`;


  return (
    <>
      {loading ? (
        <div className="flex justify-content-center" style={{ marginTop: '50px' }}>
          <ProgressSpinner />
        </div>
      ) : (
        <div className='flex flex-column'>
          <h1>Tarifario de {promociones?.nombre}</h1>
          <div style={{display:'flex',justifyContent:'center'}}>
            <iframe
              src={pdfUrl}
              style={{ width: "90%", height: "45rem", border: "none" }}
              title="Tarifario PDF"
            ></iframe>
          </div>
        </div>

      )}
    </>
  );
}
