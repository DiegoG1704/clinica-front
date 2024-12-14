import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import '../Afiliados/css/Carousel.css';                            // Custom styling
import portada from '../../../img/img.png'

export default function Carrousel() {
    const [products, setProducts] = useState([]);

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
            image: portada
        },
        {
            id: 2,
            name: 'Salud al alcance de todos con',
            highlight: 'MásSalud',
            description: 'Conoce más sobre nuestra iniciativa dando click abajo y entérate de las últimas novedades y beneficios que te ofrecemos',
            buttonLabel: 'Conoce más',
            image: portada
        }
    ];

    const productTemplate = (product) => {
        return (
            <div className="custom-carousel-content">
                <div className="text-section">
                    <span className="title">
                        {product.name} 
                    </span>
                    <span className="highlight">{product.highlight}</span>
                    <p className="description">{product.description}</p>
                    <Button label={product.buttonLabel} className="custom-button" />
                </div>
                <div className="image-section">
                    <img src={product.image} alt={`Imagen destacada de ${product.highlight}`} className="doctor-image" loading="lazy" />
                </div>
            </div>
        );
    };

    useEffect(() => {
        setProducts(sampleProducts);
    }, []);

    return (
        <div className="carousel-demo">
            <Carousel value={products} numVisible={1} numScroll={1} responsiveOptions={responsiveOptions} circular autoplayInterval={5000} itemTemplate={productTemplate} />
        </div>
    );
}
