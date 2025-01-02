import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import '../Afiliados/css/Carousel.css';                            // Custom styling
import portada from '../../../img/img.png'
import portada2 from '../../../img/pixelcut.png'

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
            name: 'La salud nunca fue tan accesible . . .',
            highlight: 'MásSalud',
            description: 'La única plataforma en el Perú que te ofrece la mayor calidad y atención en salud a los mejores precios.Conoce más sobre nuestra iniciativa',
            buttonLabel: 'Conoce más',
            image: portada2
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
             <div className="social-buttons">
             <Button 
                icon="pi pi-instagram" 
                className="EnlacesClin" 
                onClick={() => window.open("https://www.instagram.com/massalud_adb/", "_blank")} 
            />
            <Button 
                icon="pi pi-youtube" 
                className="EnlacesClin" 
                onClick={() => window.open("https://www.youtube.com/@info_M%C3%A1sSalud", "_blank")} 
            />

                {/* <Button icon="pi pi-linkedin" className="EnlacesClin" /> */}
            </div>
            <Carousel value={products} numVisible={1} numScroll={1} responsiveOptions={responsiveOptions} circular autoplayInterval={5000} itemTemplate={productTemplate} />
        </div>
    );
}
