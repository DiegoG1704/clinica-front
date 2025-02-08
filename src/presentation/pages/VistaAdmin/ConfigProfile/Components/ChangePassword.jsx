import React from 'react'
import CustomDialog from '../../../../components/Dialog/CustomDialog'
import { Button } from 'primereact/button'

import { Password } from 'primereact/password';

const ChangePassword = ({visibleChangePassword,setVisibleChangePassword,data,handleChangeData,changePassword,showDialogChangePassword}) => {
    const footerTemplate = () =>
    (<>
        <div className='flex gap-2'>
            <Button label='Cancelar' className='btn-cancel' onClick={setVisibleChangePassword} />
            <Button label='Guardar' className='btn-save' onClick={changePassword} />
        </div>
    </>)

    return (
        <>
            <CustomDialog visible={visibleChangePassword} title={"Cambiar contraseña"} iconClassName={"pi pi-lock"} footer={footerTemplate} onhide={setVisibleChangePassword} >
                <div className="flex flex-column gap-3  w-full">
                    <div className="flex flex-column w-full">
                        <label htmlFor="username">Contraseña actual</label>
                       <Password feedback={false} toggleMask  className='w-full' name='contraseña' value={data?.contraseña} onChange={(e)=>{handleChangeData(e)}}/>
                    </div>
                    <div className="flex flex-column gap-2 flex-1">
                        <label htmlFor="username">Nueva contraseña</label>
                        <Password  feedback={false} toggleMask className='w-full' name='newcontraseña' value={data?.newcontraseña} onChange={(e)=>{handleChangeData(e)}}/>
                    </div>

                </div>



            </CustomDialog>

        </>
    )
}

export default ChangePassword
