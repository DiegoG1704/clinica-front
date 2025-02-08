import React, { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import CustomDialog from '../../../../components/Dialog/CustomDialog';
import CreateClinica from './CreateClinica';
import ClinicaItem from './ClinicaStopperItems/ClinicaItem';
import { useClinica } from '../../../../context/ClinicaContext/ClinicaContext';
import { showToast, showToastWithErrors } from '../../../../utils/showToast';

export default function DialogEditarClinica({ idClinica, visible, onhiden }) {
    const { updateClinica } = useClinica()
    const toast = useRef(null)
    const handleSubmit = async () => {
        const response = await updateClinica()
        console.log("response-error", response);
        if (response?.success === false) {
            showToastWithErrors("error", "Error al registrar", response?.error, toast);
        }else{
            showToast("success","Clinica actaulizada","Se ha editado la clinica correctamente",toast)
        }
    }



    const footerTemplate = () => (
        <div className=''>
            <Button className="bg-white border-none shadow-none" style={{ color: "#85C226" }} label='Cancelar' onClick={onhiden}/>
            <Button className=" border-none shadow-none" style={{ color: "#fff", backgroundColor: "#85C226" }} label='Guardar' onClick={handleSubmit} />
        </div>
    );

    return (
        <>
            <Toast ref={toast} />
            <CustomDialog visible={visible} onhide={onhiden} title={"Editar Clínica"} iconClassName={"pi pi-building"} footer={footerTemplate}>
                <ClinicaItem />


            </CustomDialog>

        </>

    );
}
