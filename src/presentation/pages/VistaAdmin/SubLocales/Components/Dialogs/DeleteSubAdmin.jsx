import axios from 'axios'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import React, { useRef } from 'react'
import { Toast } from 'primereact/toast';
import { apiAdapter } from '../../../../../../core/adapters/apiAdapter';
import { date } from 'zod';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { useAdminPloc } from '../../../../../context/SubAdministradores/SubAdministradorContext';
import { showToast, showToastWithErrors } from '../../../../../utils/showToast';

export default function DeleteSubAdmin({ visibles, close, actualizar, Data }) {
    const ploc = useAdminPloc(); // Accede al ploc desde el contexto
    const handleCloseDialog = () => {
        ploc.closeDialogDelete();
    };
    const confirmDelete = async () => {
        const response = await ploc.deleteSubAdmin()
        console.log("rrs", response?.error)
        if (response?.success) {
            showToast("success", "Local eliminado", "Se ha eliminado el local correctamente", toast)
        } else {
            showToastWithErrors("error", "Error al eliminar local", response?.error, toast)
        }
    }

    const toast = useRef(null)
    const messageTemplate = (
        <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
            <i className="pi pi-exclamation-circle text-6xl text-primary-500"></i>
            <span>Please confirm to proceed moving forward.</span>
        </div>
    )


    return (
        <div>
            <Toast ref={toast} />
            <ConfirmDialog visible={ploc.state.openDialogDelete} message={messageTemplate }
                header="Confirmación" acceptLabel='Si' rejectLabel='No' onHide={handleCloseDialog}
                acceptClassName='bg-green-400 border-green-400'
                accept={confirmDelete}
            >
            </ConfirmDialog>
        </div>
    )








}
