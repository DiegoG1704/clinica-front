import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import '../Afiliados/css/Carousel.css';                            // Custom styling
import portada from '../../../img/Frame.png'
import portada2 from '../../../img/doc-slider.png'
import BackgroundImage from '../../../img/back-slider.png'
import Elipse from '../../../img/Ellipse.png'
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
            mainImage: portada,
            background: Elipse
        },
        {
            id: 2,
            name: 'La salud nunca fue tan accesible . . .',
            highlight: 'MásSalud',
            description: 'La única plataforma en el Perú que te ofrece la mayor calidad y atención en salud a los mejores precios.Conoce más sobre nuestra iniciativa',
            buttonLabel: 'Conoce más',
            mainImage: portada2,
            background: BackgroundImage

        }
    ];

    const productTemplate = (product) => {
        return (
            <div className="custom-carousel-content container ">
                <div className="text-section  h-full flex flex-column justify-content-center w-full">
                    <span className='advice'>Programa de Afiliación Exclusivo</span>
                    <span className="title my-3 ">
                        {product.name}
                        <span className="highlight ">{product.highlight}</span>
                    </span>

                    <p className="description ">{product.description}</p>
                    {/* <Button label={product.buttonLabel} className="custom-button" /> */}
                </div>
                <div className="image-section relative  h-full w-full">

                    <img src={product.mainImage} alt={`Imagen destacada de ${product.highlight}`} className="background-image z-2" loading="lazy" />
                    <img src={product.background} alt={`Imagen destacada de ${product.highlight}`} className="doctor-image absolute " loading="lazy" />
                </div>

            </div>
        );
    };

    useEffect(() => {
        setProducts(sampleProducts);
    }, []);

    return (
        <div className="carousel-demo">
            {/* <div className="social-buttons">
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

            </div> */}
            <Carousel value={products} numVisible={1} numScroll={1} responsiveOptions={responsiveOptions} circular autoplayInterval={5000} itemTemplate={productTemplate} />
        </div>
    );
}
