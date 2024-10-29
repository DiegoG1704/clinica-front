import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import React, { useEffect } from 'react'
import ClinicasList from './Conponents/ClinicasList'
import { useClinica } from '../../../context/ClinicaContext/ClinicaContext'

const ClinicaPage = () => {
    const {clinicas,getAllClinicas}=useClinica()
    useEffect(() => {
        console.log("ddd")
        getAllClinicas();
    }, []);
    return (
        <div>
            <div>

                <header className='flex'>
                    <div className='flex-1 p-2'>
                        <h1>Sub administradores locales</h1>
                        <Divider />
                    </div>
                    <div className='flex justify-content-end align-items-center'>
                        <Button label='Añadir clinica' className='' style={{ backgroundColor: "#85C226", borderColor: "#85C226", height: "60px", borderRadius: "6px" }} icon="pi pi-plus" />
                    </div>
                </header>
                <main>
                    <ClinicasList data={clinicas} />

                </main>
            </div>


        </div>
    )
}

export default ClinicaPage
