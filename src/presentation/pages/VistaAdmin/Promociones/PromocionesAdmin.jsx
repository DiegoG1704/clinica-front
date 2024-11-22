import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import React, { useState } from 'react'
import PromocionesList from './Components/PromocionesList';
import CreatePromocionesAdmin from './Components/CreatePromocionesAdmin';

const PromocionesAdmin = () => {
    const [visible, setVisible] = useState(false);
    return (
        <div>
            <header className='flex'>
                <div className='flex-1 p-2'>
                    <h1>Bienvenido  a Promociones</h1>
                    <Divider />
                </div>
                <div className='flex justify-content-end align-items-center'>
                    <Button label='Subir promociones' className='' style={{
                        backgroundColor: "#85C226",
                        borderColor: "#85C226", height: "60px", borderRadius: "6px"
                        
                    }} icon="pi pi-plus" onClick={()=>{setVisible(true)}}/>
                </div>
            </header>
            <main>
                <PromocionesList/>
                <CreatePromocionesAdmin visible={visible} setVisible={setVisible}/>
            </main>
        </div>
    )
}

export default PromocionesAdmin
