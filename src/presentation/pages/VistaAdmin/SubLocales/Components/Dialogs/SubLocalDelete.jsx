
import { ConfirmDialog } from 'primereact/confirmdialog'
import React, { useRef } from 'react'
import { useSubLocalPloc } from '../../../../../context/subLocalContext/subLocalContext';
import { Toast } from 'primereact/toast';
import { showToast, showToastWithErrors } from '../../../../../utils/showToast';


const SubLocalDelete = () => {
    const ploc = useSubLocalPloc(); // Accede al ploc desde el contexto
    const handleCloseDialog = () => {
        ploc.closeDialogDelete();
    };
    const confirmDelete=async()=>{
        const response=await ploc.deleteSubLocal()
        console.log("rrs",response?.error)
        if(response?.success){
            showToast("success","Local eliminado","Se ha eliminado el local correctamente",toast)
        }else{
            showToastWithErrors("error","Error al eliminar local",response?.error,toast)
        }
    }

    const toast = useRef(null)

    return (
        <div>
            <Toast ref={toast} />
            <ConfirmDialog visible={ploc.state.openDialogDelete} message="Estas seguro de eliminar el local"
                header="Eliminar Local" acceptLabel='Si' rejectLabel='No' onHide={handleCloseDialog}
                acceptClassName='bg-green-400 border-green-400'
                accept={confirmDelete}
            >
            </ConfirmDialog>
        </div>
    )
}

export default SubLocalDelete
