import { Divider } from 'primereact/divider'
import React from 'react'
import AdministradorLocalesList from '../../components/AdministradorLocales/AdministradorLocalesList'
import { Button } from 'primereact/button'

export default function Home() {
  return (
    <div>

      <header className='flex'>
        <div className='flex-1 p-2'>
          <h1>Sub administradores locales</h1>
          <Divider />
        </div>
        <div className='flex justify-content-end align-items-center'>
          <Button label='Añadir administrador' className='' style={{ backgroundColor: "#85C226", borderColor: "#85C226",width:"200px", height:"60px" }} />
        </div>

      </header>
      <main>
        <AdministradorLocalesList />
      </main>
    </div>
  )
}
