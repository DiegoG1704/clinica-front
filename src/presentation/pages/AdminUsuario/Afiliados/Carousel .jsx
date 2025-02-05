import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import '../Afiliados/css/Carousel.css';                            // Custom styling
import portada from '../../../img/img.png'
import portada2 from '../../../img/pixelcut.png'
import { useNavigate } from 'react-router-dom';
import Elipse from '../../../img/Ellipse.png'
import BackgroundImage from '../../../img/sistemCarrusel.png'
import { classNames } from 'primereact/utils';

export default function Carrousel() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

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
            breakpoint: '480px',  // Add another breakpoint for smaller devices
            numVisible: 1,
            numScroll: 1,
        },
    ];

    const sampleProducts = [
        {
            id: 1,
            name: 'Salud al alcance de todos con',
            highlight: 'MásSalud',
            description: 'Conoce más sobre nuestra iniciativa dando click abajo y entérate de las últimas novedades y beneficios que te ofrecemos',
            buttonLabel: 'Conoce más',
            mainImage: portada,
            background: Elipse,
            link: '/ConoceMas',  // Ruta interna
            className:"background-image__first-slider z-2"
        },
        {
            id: 2,
            name: 'La salud nunca fue tan accesible . . .',
            highlight: 'MásSalud',
            description: 'La única plataforma en el Perú que te ofrece la mayor calidad y atención en salud a los mejores precios.Conoce más sobre nuestra iniciativa',
            buttonLabel: 'Conoce más',
            mainImage: portada2,
            background: Elipse,
            link: 'https://massalud.com.pe',  // Enlace externo
            className:"background-image z-2"
        }
    ];

    const productTemplate = (product) => {
        return (
            <div className="custom-carousel-content container ">
                <div className="text-section h-full flex flex-column justify-content-center w-full">
                    <span className='advice'>Programa de Afiliación Exclusivo</span>
                    <span className="title my-3">
                        {product.name}
                        <span className="highlight">{product.highlight}</span>
                    </span>
                    <p className="description">{product.description}</p>

                </div>
                <div className="image-section relative h-full w-full">
                    {product?.id === 2 && (
                        <img src={product.background} alt={`Imagen destacada de ${product.highlight}`} className="doctor-image absolute" loading="lazy" />

                    )}
                    <img src={product.mainImage} alt={`Imagen destacada de ${product.highlight}`} className={product.className} loading="lazy" />


                </div>
            </div>
        );
    };

    useEffect(() => {
        setProducts(sampleProducts);
    }, []);

    return (
        <div className="carousel-demo">
            <Carousel
                value={products}
                numVisible={1}
                numScroll={1}
                responsiveOptions={responsiveOptions}
                circular
                autoplayInterval={5000}
                itemTemplate={productTemplate}
            />
        </div>
    );
}
