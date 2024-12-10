import React, { useRef } from 'react'
import CustomDialog from '../../../../components/Dialog/CustomDialog'
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import InputInteger from '../../../../components/Inputs/InputNumberInteger/InputInteger';
import { Button } from 'primereact/button';
import { useConfiguracionPloc } from '../../../../context/ConfiguracionContext/ConfiguracionContext';
import { showToast, showToastWithErrors } from '../../../../utils/showToast';
import { Toast } from 'primereact/toast';

const EditProfile = ({ user ,getUser}) => {
    const ploc = useConfiguracionPloc(); // Accede al ploc desde el contexto
    // const handleCloseDialog = () => {
    //     ploc.closeDialogDelete();
    // };
    // const confirmDelete = async () => {
    //     const response = await ploc.deleteSubAdmin()
    //     console.log("rrs", response?.error)
    //     if (response?.success) {
    //         showToast("success", "Local eliminado", "Se ha eliminado el local correctamente", toast)
    //     } else {
    //         showToastWithErrors("error", "Error al eliminar local", response?.error, toast)
    //     }
    // }
    const toast = useRef(null)

    const handleSubmit = async () => {
        const response = await ploc.updateGeneralData(user?.id);
        if (response?.success) {
            showToast("success", "Datos Actualizados", "Se ha actualizado sus datos correctamente", toast)
            await getUser()
        } else {
            showToastWithErrors("error", "Error al actualizar", response?.error, toast)
        }
    }
    const footerTemplate = () => (
        <div className="dialog-footer flex justify-content-end" style={{ marginTop: '5px' }}>
            <Button
                style={{ margin: '5px', background: 'transparent', borderColor: '#85C226', color: '#85C226' }}
                label="Cerrar"
            // onClick={close}
            />
            <Button
                label="Actualizar"
                onClick={handleSubmit}
                style={{ margin: '5px', background: '#85C226', borderColor: '#85C226' }}
            // disabled={loading}
            />
        </div>
    )

    return (
        <>
            <Toast ref={toast} />
            <CustomDialog title={"Editar información general"} visible={ploc.state.visibleDialogGeneralInfo} iconClassName={"pi pi-id-card"} footer={footerTemplate} onhide={ploc.closeDialogGeneralInfo}>
                <div className='DatosPersonales'>
                    {/* <div className="input-group">
                        <label htmlFor="dni">DNI</label>
                        <div className="input-button-group">
                            <InputInteger
                                id="dni"
                                name="dni"
                                // value={subAdminData.dni}
                                // onChange={(e) => { e.target.name = "dni"; handleChange(e) }}
                                placeholder="Ingresa el DNI ..."
                                maxLength={8}
                                className={"w-full"}
                                containerClass={"w-full"}
                            />
                            <Button
                                label={false ? 'Validando...' : 'Validar'}
                                className="validate-button"
                            // onClick={validateDni}
                            // disabled={subAdminData?.dni?.length !== 8}
                            />
                        </div>
                    </div> */}
                    {/* <div className="input-group">
                        <label htmlFor="nombres">Nombres</label>
                        <div className="input-button-group">
                            <InputText
                                id="nombres"
                                name="nombres"
                                placeholder='Ingresa nombre...'
                                // value={subAdminData.nombres}
                                // onChange={handleChange}
                                required
                            />

                        </div>
                    </div> */}

                    {/* Apellidos */}
                    {/* <div className="input-group">
                        <label htmlFor="apellidos">Apellidos</label>

                        <div className="input-button-group">
                            <InputText
                                id="apellidos"
                                name="apellidos"
                                placeholder='Ingresa apellido...'
                                // value={subAdminData.apellidos}
                                // onChange={handleChange}
                                required
                            />

                        </div>
                    </div> */}

                    {/* Correo */}
                    <div className="input-group">
                        <label htmlFor="apellidos">Correo</label>

                        <div className="input-button-group">
                            <InputText
                                id="apellidos"
                                name="correo"
                                placeholder='Ingresa correo...'
                                value={ploc?.state?.general_info?.correo}
                                onChange={(e) => { e.target.name = "correo"; ploc.handleChangeGeneralInfo(e) }}
                                type='email'
                                required
                            />

                        </div>
                    </div>

                    {/* Teléfono */}
                    <div className="input-group">
                        <label htmlFor="telefono">Teléfono</label>

                        <div className="input-button-group">
                            <InputInteger
                                id="telefono"
                                name="telefono"
                                placeholder='Ingresa telefono...'
                                value={ploc?.state?.general_info?.telefono}
                                onChange={(e) => { e.target.name = "telefono"; ploc.handleChangeGeneralInfo(e) }}

                                maxLength={11}
                                className={"w-full"}
                                containerClass={"w-full"}
                            />

                        </div>
                    </div>
                    {/* Fecha de Nacimiento */}
                    {/* <div className="input-group">
                        <label htmlFor="fechNac">Fecha de Nacimiento</label>
                        <div className="input-button-group">
                            <Calendar
                                id="fechNac"
                                name="fechNac"
                                placeholder='00/00/0000'
                                // value={subAdminData.fechNac ? new Date(subAdminData.fechNac) : null} // Convertir a Date si ya existe
                                // onChange={handleChange}
                                showIcon
                                dateFormat="dd/mm/yy" // Mantener el formato visual, pero la fecha será guardada correctamente
                            // maxDate={maxDateFechaNacimiento}
                            // minDate={minDateFechaNacimiento}

                            />
                        </div>
                    </div> */}


                    {/* Dirección */}
                    <div className="input-group">
                        <label htmlFor="direccion">Dirección</label>
                        <div className="input-button-group">
                            <InputText
                                id="direccion"
                                name="direccion"
                                placeholder='Ingresa direccion...'
                                value={ploc?.state?.general_info?.direccion}
                                onChange={(e) => { e.target.name = "direccion"; ploc.handleChangeGeneralInfo(e) }}
                            />
                        </div>
                    </div>

                </div>

            </CustomDialog>
        </>
    )
}

export default EditProfile
