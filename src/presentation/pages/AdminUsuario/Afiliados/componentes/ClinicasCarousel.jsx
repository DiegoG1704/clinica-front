import React, { useEffect, useState } from 'react';
import { Carousel } from 'primereact/carousel';
import '../css/ClinicasCarousel.css'
// Importa las imágenes correctamente
import unilabs from '../../../../img/Clinicas/unilabs.png';
import holaDoc from '../../../../img/Clinicas/holaDoc.jpeg';
import artroSalud from '../../../../img/Clinicas/Arthrosalud.png';
import raimondi from '../../../../img/Clinicas/raimondi.jpg';
import sanJuan from '../../../../img/Clinicas/sanJuan.jpg';
import medicals from '../../../../img/Clinicas/Medical.jpeg';
import JP from '../../../../img/Clinicas/clinica-javierPrado.jpg'
import AltSalud from '../../../../img/Clinicas/AltaSalud.jpeg'
import Opeluce from '../../../../img/Clinicas/clinica-opeluce-local.jpg'

export default function ClinicasCarousel({ datos }) {
    const [products, setProducts] = useState([]);
    

    const clinicas = [
        {
            src: unilabs,
            alt: "Clínica UniLabs",
            width: 500,
            height: 500,
            telefono: '(01)2220550',
            title: "UniLabs",
            description: "Laboratorios equipados con la mejor tecnología del país."
        },
        {
            src: holaDoc,
            alt: "Clínica HolaDoc",
            width: 500,
            height: 500,
            telefono: '908 885 371',
            title: "HolaDoc",
            
        },
        {
            src: artroSalud,
            alt: "Clínica ArtroSalud",
            width: 500,
            height: 500,
            telefono: '960 080 073',
            title: "ArtroSalud",
            
        },
        {
            src: raimondi,
            alt: "Clínica Raimondi",
            width: 500,
            height: 500,
            telefono: '915 214 053',
            title: "Raimondi",
            
        },
        {
            src: sanJuan,
            alt: "Clínica San Juan de Dios",
            width: 500,
            height: 500,
            telefono: '944 576 008',
            title: "San Juan",
            description: "Atención integral y personalizada."
        },
        {
            src: medicals,
            alt: "Policlínico Medical San Miguel",
            width: 500,
            height: 500,
            telefono: '997 819 568',
            title: "Medical San Miguel",
            
        },
        {
            src: JP,
            alt: "Clínica Javier Prado",
            width: 500,
            height: 500,
            telefono: '(01) 211 – 4141 ',
            title: "Clínica Javier Prado",
            
        },
        {
            src: AltSalud,
            alt: "Clínica AltaSalud",
            width: 500,
            height: 500,
            telefono: '944247167 ',
            title: "Clínica AltaSalud",
            
        },
        {
            src: Opeluce,
            alt: "Clínica de Ojos D' Opeluce",
            width: 500,
            height: 500,
            telefono: '(01) 206 -4700',
            title: "Clínica de Ojos D' Opeluce",
            
        }
    ];

    // Responsiveness settings
    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 1,
            numScroll: 1,
        },
        {
            breakpoint: '600px',
            numVisible: 1,
            numScroll: 1,
        },
        {
            breakpoint: '480px',
            numVisible: 1,
            numScroll: 1,
        },
    ];

    const productTemplate = (clinica) => {
        return (
            <div className="card-container">
                <div className="card">
                    <img src={clinica.src || "/placeholder.svg"} alt={clinica.alt} className="card-image" />
                    <div className="card-overlay">
                        <h3 className="card-title">{clinica.alt}</h3>
                        {/* <p className="card-description">{clinica.description}</p> */}
                        <span className="card-phone">Teléfono: {clinica.telefono}</span>
                    </div>
                </div>
            </div>
        )
    }

    useEffect(() => {
        setProducts(clinicas)
    }, []) // Removed clinicas from dependency array

    return (
        <section className="clinicas-section">
            <div className="container">
                <div className="section-header">
                    <span className="title1">Conoce</span>
                    <span className="RedClin">Nuestra red de clínicas privadas</span>
                </div>
                <Carousel
                    value={products}
                    numVisible={3}
                    numScroll={1}
                    responsiveOptions={responsiveOptions}
                    circular
                    autoplayInterval={5000}
                    itemTemplate={productTemplate}
                    className="custom-carousel"
                />
            </div>
        </section>
    )
}
