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

export default function ClinicasCarousel({datos}) {
    const [products, setProducts] = useState([]);
    
    const clinicas = [
        {
          src: unilabs,
          alt: "Clínica UniLabs",
          width: 500,
          height: 500,
          telefono:'Telefono: (01)2220550',
          title: "UniLabs",
          description: "Laboratorios equipados con la mejor tecnología del país."
        },
        {
          src: holaDoc,
          alt: "Clínica HolaDoc",
          width: 500,
          height: 500,
          telefono:'Telefono: 908 885 371',
          title: "HolaDoc",
          description: "Laboratorios avanzados para servicios médicos."
        },
        {
          src: artroSalud,
          alt: "Clínica ArtroSalud",
          width: 500,
          height: 500,
          telefono:'960 080 073',
          title: "Telefono: ArtroSalud",
          description: "Especialistas en salud articular."
        },
        {
          src: raimondi,
          alt: "Clínica Raimondi",
          width: 500,
          height: 500,
          telefono:'Telefono: 915 214 053',
          title: "Telefono: Raimondi",
          description: "Tecnología avanzada en diagnóstico."
        },
        {
          src: sanJuan,
          alt: "Clínica San Juan de Dios",
          width: 500,
          height: 500,
          telefono:'Telefono: 944 576 008',
          title: "San Juan",
          description: "Atención integral y personalizada."
        },
        {
            src: medicals,
            alt: "Policlínico Medical San Miguel",
            width: 500,
            height: 500,
            telefono:'Telefono: 997 819 568',
            title: "Medical San Miguel",
            description: "Ofrecemos un servicio de calidad en todo momento"
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

    // Template for each carousel item
    const productTemplate = (clinica) => {
        return (
            <div key={clinica.title} className="carousel-item-container">
                <img
                    src={clinica.src}
                    alt={clinica.alt}
                    className="carousel-item-img"
                />
                <div className="carousel-item-overlay">
                    <h5 className="carousel-title">{clinica.alt}</h5>
                    <p className="carousel-description">{clinica.description}</p>
                    <span>{clinica.telefono}</span>
                </div>
            </div>
        );
    };
    

    useEffect(() => {
        setProducts(clinicas);
    }, []);

    return (
        <section className="w-full py-12 md:py-24 bg-white">
            <div className="container px-4 mb-5">
                <div className="text-center mb-4">
                    <span className="title1">Conoce</span><br></br>
                    <span className="RedClin">Nuestra red de clínicas privadas</span>
                </div>
                <Carousel
                    value={products}
                    numVisible={3} // Número de elementos visibles
                    numScroll={1}
                    responsiveOptions={responsiveOptions}
                    circular
                    autoplayInterval={5000}
                    itemTemplate={productTemplate}
                    className="custom-carousel" // Agrega una clase personalizada si es necesario
                />

            </div>
        </section>
    );
}
