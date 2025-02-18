import React, { useRef } from 'react'
import CustomDialog from '../../../../components/Dialog/CustomDialog'
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import InputInteger from '../../../../components/Inputs/InputNumberInteger/InputInteger';
import { Button } from 'primereact/button';
import { useConfiguracionPloc } from '../../../../context/ConfiguracionContext/ConfiguracionContext';
import { showToast, showToastWithErrors } from '../../../../utils/showToast';
import { Toast } from 'primereact/toast';

const EditProfile = ({ user, getUser }) => {
    const ploc = useConfiguracionPloc(); // Accede al ploc desde el contexto

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
            <CustomDialog title={"Editar información general"}
                visible={ploc.state.visibleDialogGeneralInfo}
                iconClassName={"pi pi-id-card"}
                footer={footerTemplate}
                onhide={ploc.closeDialogGeneralInfo}>
                <div className='DatosPersonales '>


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
                            <InputText
                                id="telefono"
                                name="telefono"
                                placeholder='Ingresa telefono...'
                                value={ploc?.state?.general_info?.telefono}
                                onChange={(e) => { e.target.name = "telefono"; ploc.handleChangeGeneralInfo(e) }}
                                maxLength={11}
                                className={"w-full"}
                                keyfilter="int"
                            />

                        </div>
                    </div>



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
