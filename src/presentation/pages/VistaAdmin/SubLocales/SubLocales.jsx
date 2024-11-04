import React, { useEffect } from 'react'
import SubLocalesList from './Components/SublocalesList'
import { useSubLocalPloc } from '../../../context/subLocalContext/subLocalContext'
import { usePlocState } from '../../../hooks/ploc/usePlocState'
import { useAuth } from '../../../context/AuthContext/AuthContext'
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import CustomDialog from '../../../components/Dialog/CustomDialog'
import SubLocalCreate from './Components/Dialogs/SubLocalCreate'
import SubLocalEdit from './Components/Dialogs/SubLocalEdit'
import SubLocalDelete from './Components/Dialogs/SubLocalDelete'


export default function SubLocales() {
  const { user } = useAuth()
  const ploc = useSubLocalPloc()
  const state = usePlocState(ploc)

  useEffect(() => {
    if (user?.clinica_id) {
      ploc.loadSubLocal(user.clinica_id);
      
    }
  }, [user?.clinica_id, ploc]);

  

  return (
    <div>
      <header className='flex'>
        <div className='flex-1 p-2'>
          <h1>Bienvenido  a Sublocales</h1>
          <Divider />
        </div>
        <div className='flex justify-content-end align-items-center'>
          <Button label='Añadir clinica' className='' style={{
            backgroundColor: "#85C226",
            borderColor: "#85C226", height: "60px", borderRadius: "6px"
          }} icon="pi pi-plus" onClick={() => { ploc.openDialogCreate(user?.clinica_id); }} />
        </div>
      </header>
      <main>
        <SubLocalesList data={state?.locales} fnEdit={ploc.openDialogEdit} FnDelete={ploc?.openDialogDelete}/>
        {/* <CustomDialog >

        </CustomDialog> */}
        <SubLocalCreate/>
        <SubLocalEdit />
        <SubLocalDelete></SubLocalDelete>

      </main>


    </div>
  )
}
