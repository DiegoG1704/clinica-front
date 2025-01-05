import { Button } from 'primereact/button'
import React from 'react'
import { Link, Navigate } from 'react-router-dom'

const Header = () => {
    return (
        <header className="  fixed top-0 left-0 w-full z-5 bg-white-alpha-80 backdrop-blur-sm border-bottom-1 border-gray-100  ">
            <div className="container mx-auto">
                <div className="flex align-items-center justify-content-between h-4.5rem">
                    <Link href="/" className="flex align-items-center gap-2 no-underline logo-header">
                        <img src="https://www.massalud.com.pe/img/logo-inicio3.png" alt="Más Salud Logo" width={115} height={"auto"} />

                    </Link>
                    <nav className="hidden flex  md:flex align-items-center gap-4 text-sm font-medium navigation ">
                        <div className="header-actions">
                            <div className="links-container">
                                <h1> <Link to='/' className="link">Inicio</Link></h1>
                                <h1><Link to='/ConoceMas' className="link">Nosotros</Link></h1>
                                <h1><Link to='/Contacto' className="link">Contacto</Link></h1>
                                <div className=' container-button__loguear flex align-items-center justify-content-center'>
                                    <Button onClick={() => Navigate('/login')} className='loguear' >Iniciar Sesión</Button>
                                </div>

                            </div>
                        </div>
                    </nav>

                </div>
            </div>
        </header>

    )
}

export default Header
