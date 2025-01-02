import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Contacto() {
    const navigate = useNavigate();
  return (
    <>
        <header className="afiliados-container">
            <img
                src='https://www.massalud.com.pe/img/logo-inicio3.png'
                alt="Logo de MásSalud"
                className="logo"
            />
            <div className="header-actions">
                <div className="links-container">
                    <h1><a href='/' className="link">Inicio</a></h1>
                    <h1><a href='/ConoceMas' className="link">Nosotros</a></h1>
                    <h1><a href='/Contacto' className="link">Contacto</a></h1>
                    <Button label="Iniciar Sesión" onClick={() => navigate('/login')} className='loguear' />
                </div>
            </div>
        </header>
        <div className='Section2'>
            <span className='title5'>¿Tienes dudas?</span>
            <span className="RedClin">Contactanos</span>
            <span className='title5'>¿Deseas saber mas?</span>
        </div>

        <div className="flex flex-wrap justify-content-center align-items-center mt-6">
            {/* Sección de contacto */}
            <div className="flex flex-column w-full md:w-6 text-center mb-4 md:mb-0">
                <span style={{fontSize:'25px',color:'#176ABC'}}>Sigamos en contacto</span>
                <span style={{fontSize:'25px',color:'#176ABC'}}>¡Siguenos en todas nuestras redes sociales!</span>
            </div>

            {/* Sección de redes sociales y contacto */}
            <div className="flex flex-column w-full md:w-6 h-15rem">
                <Card className="w-full md:w-10 lg:w-8 mx-auto">
                <div className="flex flex-column text-center">
                    <span className="text-blue-800">
                    <i className="pi pi-phone" style={{ color: "#708090" }}></i> +51 920 517 220
                    </span>
                    <span className="text-blue-800">
                    <i className="pi pi-envelope" style={{ color: "#708090" }}></i> administracion@massalud.org.pe
                    </span>
                    <span className="text-blue-800">
                    <i className="pi pi-envelope" style={{ color: "#708090" }}></i> enriquedonohue@massalud.org.pe
                    </span>
                </div>
                </Card>
            </div>
        </div>

        <footer className='Barra'>
            <div className='Informacion'>
                <h2>Sobre Nosotros</h2>
                <p>Conoce el porqué de nuestra iniciativa y quién la crea. Conoce nuestras redes sociales. Mantente conectado.</p>
                <div className='iconos'>
                    <p><i className="pi pi-facebook" style={{ color: 'white'}}></i></p>
                    <p><i className="pi pi-instagram" style={{ color: 'white'}}></i></p>
                    <p><i className="pi pi-youtube" style={{ color: 'white'}}></i></p>
                    <p><i className="pi pi-linkedin" style={{ color: 'white'}}></i></p>
                </div>
            </div>
            <div className='Link'>
                <h2>Links de Acceso Rápido</h2>
                <p><i className="pi pi-play" style={{ color: 'white' }}></i>inicio</p>
                <p><i className="pi pi-play" style={{ color: 'white' }}></i>Nosotros</p>
                <p><i className="pi pi-play" style={{ color: 'white' }}></i>Contacto</p>
                <p><i className="pi pi-play" style={{ color: 'white' }}></i>Conócenos</p>
            </div>
        </footer>
    </>
  )
}
