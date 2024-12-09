import { Button } from 'primereact/button'
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Divider } from 'primereact/divider'
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import React, { useEffect, useRef, useState } from 'react'
import { apiAdapter } from '../../../../core/adapters/apiAdapter';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

export default function Administracion() {
  const toast = useRef(null);
    const [afiliadores, setAfiliadores] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de carga
    const [searchTerm, setSearchTerm] = useState('');
    const accept = () => {
      toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
  };

  const reject = () => {
      toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  };

  
    useEffect(() => {
      const fetchClinicas = async () => {
        try {
          setLoading(true); // Inicia la carga
          const response = await apiAdapter.get('afiliadores-afiliados');
          setAfiliadores(response);
          setLoading(false); // Termina la carga
        } catch (error) {
          console.error('Error fetching clinic data:', error);
          setLoading(false); // Termina la carga
        } 
      };
  
      fetchClinicas();
    }, []);
  
    // Filtrar afiliadores según el término de búsqueda
    const filteredAfiliadores = afiliadores.filter(afiliador =>
      `${afiliador.nombres} ${afiliador.apellidos}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const actionsTemplate = (rowData) => (
      <div className='flex gap-2'>
           <Button 
              // className="bg-white border-none shadow-none" 
              // style={{ color: "#85C226" }} 
              severity="success"
              onClick={() => showTemplate()} 
              label='Activo'
          />
      </div>
  );

  const actionsTemplatePR = (rowData) => (
    <div className='flex gap-2'>
         <Button 
            // className="bg-white border-none shadow-none" 
            // style={{ color: "#85C226" }} 
            severity="success"
            onClick={() => showTemplatePR()}
            label='Activo'
        />
    </div>
);

const showTemplate = () => {
  confirmDialog({
      group: 'templating',
      header: 'Confirmation',
      message: (
          <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
              <i className="pi pi-exclamation-circle text-6xl text-primary-500"></i>
              <span>¿Desea Cambiar de estado?</span>
          </div>
      ),
      accept,
      reject
  });
};

const showTemplatePR = () => {
  confirmDialog({
      group: 'templating',
      header: 'Confirmation',
      message: (
          <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
              <i className="pi pi-exclamation-circle text-6xl text-primary-500"></i>
              <span>¿Desea Cambiar de estado?</span>
          </div>
      ),
      accept,
      reject
  });
};

  return (
    <>
      <Toast ref={toast} />
        <div className='flex'>
            <div className='flex-1 p-2'>
            <h1>Lista de Usuarios</h1>
            <Divider />
            </div>
        </div>
        <div className='flex justify-content-center'>
            <Card style={{ width: '80%', height: '7rem'}}>
            <InputText
                placeholder='Buscar nombre de afiliados...'
                style={{ width: '50%', height: '4rem', borderRadius: '15px' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            </Card>
        </div> 
        {loading ? (
            <div className="flex justify-content-center" style={{ marginTop: '50px' }}>
            <ProgressSpinner />
            </div>
        ) : (
        <div className='flex justify-content-center'>
            <Card style={{ width: '80%', marginTop:'15px' }}>
                <DataTable value={filteredAfiliadores} rowClassName="my-2" dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
                    <Column header="Nº" body={(rowData, { rowIndex }) => rowIndex + 1} />
                    <Column field="nombres" header="Nombre" />
                    <Column field="apellidos" header="Apellidos" />
                    <Column field="telefono" header="Télefono" />
                    <Column field="dni" header="DNI" />
                    <Column field="rol" header="Rol" />
                    <Column header="Estado Usuario" body={actionsTemplate}/>
                    <Column header="Estado Usuario" body={actionsTemplatePR}/>
                </DataTable>
            </Card>
        </div>
        )}
        <ConfirmDialog group="templating" />
    </>
  )
}
