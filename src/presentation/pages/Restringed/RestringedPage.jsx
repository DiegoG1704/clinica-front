import React from 'react'
import character from "../../img/marciano_restringed.png"
import "./RestringedPage.css"
import { Button } from 'primereact/button'
const RestringedPage = () => {
    return (
        <div className='flex  h-full justify-content-center align-items-center'>
            <div className='container-character'>
                <img src={character} alt="" />
            </div>
            <div className='container-message flex-column gap-4'>
                <header>
                    <p className='message__title'>Cuenta Inactiva</p>
                </header>
                <div>
                    <p className='message__description'>Tu cuenta está pendiente de activación. Para más detalles, contáctanos.</p>
                </div>
                <div>
                    <Button label='Cerrar Sesión' className='message__btn' />
                </div>
            </div>


        </div>
    )
}

export default RestringedPage
