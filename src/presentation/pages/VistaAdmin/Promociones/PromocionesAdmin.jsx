import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import React, { useState } from 'react'
import PromocionesList from './Components/PromocionesList';
import CreatePromocionesAdmin from './Components/CreatePromocionesAdmin';
import { usePromocionPloc } from '../../../context/PromocionesContext/PromocionContext';
import { usePlocState } from '../../../hooks/ploc/usePlocState';
import "./Promociones.css"
const PromocionesAdmin = () => {
    const [visible, setVisible] = useState(false);
    const ploc = usePromocionPloc()
    const state = usePlocState(ploc)

    return (
        <div>
            <header className='flex'>
                <div className='flex-1 p-2'>
                    <h1>Bienvenido  a tarifarios</h1>
                    <Divider />
                </div>

            </header>
            <main className='py-3'>
                <PromocionesList data={state?.clinicas} fnCreate={ploc.showDialogCreate} />
                <CreatePromocionesAdmin visible={state.visiableCreatePromocion}
                    setVisible={ploc.hideDialogCreate} selectFileToSend={ploc.selectFileToSend}
                    urlFile={state?.file?.url} fileName={state?.file?.name} sendTarifario={ploc.sendTarifario}
                />
            </main>
        </div>
    )
}

export default PromocionesAdmin
