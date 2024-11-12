import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import React, { useRef } from 'react'
import { apiAdapter } from '../../../../core/adapters/apiAdapter'

export default function DeletePromo({ visible, close, recargar, datos1 }) {
  const toast = useRef(null); 

  const handleSubmit = async () => {
    try {
      const response = await apiAdapter.delete(`deletePromocion/${datos1.id}`);
      console.log(response);
      toast.current.show({
        severity: 'success',
        summary: 'Éxito',
        detail: `El área de ${datos1.area} ha sido eliminada.`,
        life: 3000, 
      });

      recargar();
      close();
    } catch (error) {
      console.log('Error:', error);
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Hubo un problema al eliminar la promoción. Intenta nuevamente.',
        life: 3000, 
      });
    }
  };

  const headerTemplate = () => {
    return (
        <div className='flex flex-row gap-2'>
            <span className="pi pi-building" style={{fontSize:"40px",fontWeight:"500",color:"#85C226"}}></span>
            <span style={{fontSize:"24px",fontWeight:"700"}}>¿Desea Eliminar el área de {datos1?.area}?</span>
        </div>
    )
}

  return (
    <>

      <Toast ref={toast} />

      <Dialog visible={visible} onHide={close} header={headerTemplate()} style={{ width: '400px' }}>
        {datos1 && (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Button
                label="Cancelar"
                style={{ marginRight: '10px', background: '#6EAFDB', borderColor: '#6EAFDB' }}
                onClick={close}
              />
              <Button
                label="Confirmar"
                style={{ background: '#DB2423', borderColor: '#DB2423' }}
                onClick={handleSubmit}
              />
            </div>
          </>
        )}
      </Dialog>
    </>
  );
}
