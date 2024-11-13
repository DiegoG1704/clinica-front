import axios from 'axios'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import React from 'react'
import { Toast } from 'primereact/toast';
import { apiAdapter } from '../../../../../../core/adapters/apiAdapter';
import { date } from 'zod';

export default function DeleteSubAdmin({ visible, close, actualizar ,Data}) {
    const toast = React.useRef(null);

    console.log('dat',Data)

    // Asegurarse de que Data es válido antes de continuar
    if (!Data) {
        return null; // O también puedes devolver un loading spinner o un mensaje alternativo
    }

    const handleSubmit = async () => {
        try {
            const response = await apiAdapter.delete(`user/delete/${Data?.id}`)
            console.log(response)
            actualizar();
            close();
            toast.current.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Usuario eliminado',
                life: 3000
              });
            
        } catch (error) {
            console.log('r', error)
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Hubo un problema al eliminar el usuario.',
                life: 3000
              });
        }
    }
    const headerTemplate = () => {
        return (
            <div className='flex flex-row gap-2'>
                <span className="pi pi-building" style={{fontSize:"40px",fontWeight:"500",color:"#85C226"}}></span>
                <span style={{fontSize:"24px",fontWeight:"700"}}>Desea eliminar {Data.nombres || 'usuario'}</span>
            </div>
        )
    }
    

    return (
        <Dialog visible={visible} onHide={close} style={{ width: '400px' }} header={headerTemplate}>
            <Toast ref={toast} />
            <div className='flex justify-content-center'>
                <div style={{ margin: '5px' }}>
                    <Button label="Cancelar" onClick={close} />
                </div>
                <div style={{ margin: '5px' }}>
                    <Button 
                    label="Eliminar"
                     icon="pi pi-save" 
                     style={{background:'red',borderColor:'red'}}
                     onClick={handleSubmit} />
                </div>
            </div>
        </Dialog>
    );
}
