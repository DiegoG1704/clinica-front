import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import React from 'react'

const PromocionesLocalesPage = () => {
  

  return (
    <div>
      <div>

        <header className='flex'>
          <div className='flex-1 p-2'>
            <h1>Lista de Promociones</h1>
            <Divider />
          </div>
          <div className='flex justify-content-end align-items-center'>
            <Button label='Añadir Promoción' className='' style={{ backgroundColor: "#85C226", borderColor: "#85C226", height: "60px", borderRadius: "6px" }} icon="pi pi-plus" />
          </div>
        </header>
        <main>
          

        </main>
      </div>


    </div>
  )
}

export default PromocionesLocalesPage
