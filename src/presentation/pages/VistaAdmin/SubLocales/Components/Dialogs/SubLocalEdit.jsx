import { InputText } from 'primereact/inputtext'
import CustomDialog from '../../../../../components/Dialog/CustomDialog'
import { useSubLocalPloc } from '../../../../../context/subLocalContext/subLocalContext'
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { showToast, showToastWithErrors } from '../../../../../utils/showToast';

const SubLocalEdit = () => {
    const ploc = useSubLocalPloc(); // Accede al ploc desde el contexto
    const handleCloseDialog = () => {
        ploc.closeDialogEdit();
    };

    const toast=useRef(null)
    //Funcion para crear subLocales
    const handleClickAddSubLocal = async () => {
        const response = await ploc.updateSubLocal()
        console.log("respinse",response)
        if(!response?.success){
            showToastWithErrors("error","Error al crear sub-Local",response?.error,toast)
        }else{
            showToast("success","Creado correctamente","Se creó sub-Local correctamente",toast)
        }
    }
    //Template de footer para dialog
    const footerTemplate = () => (
        <div className=''>
            <Button className="bg-white border-none shadow-none" style={{ color: "#85C226" }} label='Cancelar' onClick={handleCloseDialog} />
            <Button className=" border-none shadow-none" style={{ color: "#fff", backgroundColor: "#85C226" }} label='Guardar' onClick={handleClickAddSubLocal} />
        </div>
    );

    const handleChange = (event) => {
        const { name, value } = event.target; // 'name' es el nombre del campo, 'value' es el nuevo valor
        ploc.updateLocalData({ [name]: value }); // Crea un nuevo objeto con el campo que cambió
    };

    console.log("dataso", ploc?.state)

    return (
        <>
        <Toast ref={toast}/>
            <CustomDialog iconClassName={"pi pi-building"} title={"Editar Sub-Local"} visible={ploc.state.openDialogEdit} onhide={handleCloseDialog} footer={footerTemplate}>
                <div className='flex flex-column gap-2'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="username">Nombre</label>
                        <InputText id="username" aria-describedby="username-help" name='nombre' onChange={handleChange} value={ploc?.state?.local?.nombre}/>
                    </div>

                    <div className="flex flex-column gap-2">
                        <label htmlFor="username">Dirección</label>
                        <InputText id="username" aria-describedby="username-help" name='direccion' onChange={handleChange}value={ploc?.state?.local?.direccion} />
                    </div>

                </div>

            </CustomDialog>
        </>

    )
}

export default SubLocalEdit
