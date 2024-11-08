import axios from 'axios'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import React from 'react'
import { Toast } from 'primereact/toast';

export default function DeleteSubAdmin({ visible, close, actualizar ,Data}) {
    const toast = React.useRef(null);

    // Asegurarse de que Data es válido antes de continuar
    if (!Data) {
        return null; // O también puedes devolver un loading spinner o un mensaje alternativo
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.delete(`http://localhost:4000/user/delete/${Data.id}`)
            console.log(response)
            toast.current.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Usuario eliminado',
                life: 3000
              });
            actualizar();
            close();
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

    return (
        <Dialog visible={visible} onHide={close} style={{ width: '400px' }}>
            <Toast ref={toast} />
            {/* Comprobación para evitar acceder a un campo de Data que no existe */}
            <h3>Desea eliminar {Data.nombres || 'usuario'}</h3>
            <div className='flex justify-content-center'>
                <div style={{ margin: '5px' }}>
                    <Button label="Cancelar" icon="pi pi-save" onClick={close} />
                </div>
                <div style={{ margin: '5px' }}>
                    <Button label="Eliminar" icon="pi pi-save" onClick={handleSubmit} />
                </div>
            </div>
        </Dialog>
    );
}
