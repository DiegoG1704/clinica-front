import React from 'react';
import { Button } from 'primereact/button';

const quickLinks = [
    { name: 'Inicio', href: '/', icon: 'pi pi-home' },
    { name: 'Sobre Nosotros', href: '/ConoceMas', icon: 'pi pi-info-circle' },
    // { name: 'Servicios', href: '/services', icon: 'pi pi-briefcase' },
    // { name: 'Blog', href: '/blog', icon: 'pi pi-book' },
    { name: 'Contacto', href: '/Contacto', icon: 'pi pi-envelope' },
];

const contactInfo = [
    {
        icon: 'pi pi-phone',
        label: 'Teléfono',
        value: '+51 920 517 220',
        href: 'tel:+51 920 517 220'
    },
    {
        icon: 'pi pi-envelope',
        label: 'Email',
        value: 'info@massalud.org.pe',
        href: 'mailto:info@massalud.org.pe'
    },
    // {
    //     icon: 'pi pi-map-marker',
    //     label: 'Dirección',
    //     value: 'Lima, Perú',
    //     href: 'https://maps.google.com'
    // }
];

const socialLinks = [
    {
        name: 'YouTube',
        url: 'https://www.youtube.com/@info_M%C3%A1sSalud',
        icon: 'pi pi-youtube',
        ariaLabel: 'Visita nuestro canal de YouTube'
    },
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/massalud_adb/',
        icon: 'pi pi-instagram',
        ariaLabel: 'Síguenos en Instagram'
    },
    // {
    //     name: 'LinkedIn',
    //     url: 'https://linkedin.com/company/massalud',
    //     icon: 'pi pi-linkedin',
    //     ariaLabel: 'Conéctate con nosotros en LinkedIn'
    // }
];

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer" role="contentinfo">
            <div className="container">
                <div className="grid pt-6 pb-6">
                    <div className="col-12 md:col-6 lg:col-3 mb-4">
                        <h2 className="text-white text-3xl font-bold mb-3">MásSalud</h2>
                        <p className="text-white-alpha-70 line-height-3 mb-3">
                            Comprometidos con tu bienestar y salud. Brindando servicios de calidad y atención personalizada para ti y tu familia.
                        </p>
                    </div>

                    <div className="col-12 md:col-6 lg:col-3 mb-4">
                        <h3 className="text-white text-xl font-medium mb-3">Enlaces Rápidos</h3>
                        <ul className="list-none p-0 m-0">
                            {quickLinks.map((link) => (
                                <li key={link.name} className="mb-2">
                                    <a
                                        href={link.href}
                                        className="text-white-alpha-70 no-underline hover:text-white transition-colors transition-duration-150 cursor-pointer flex align-items-center"
                                    >
                                        <i className={`${link.icon} mr-2 text-xl`}></i>
                                        <span>{link.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-12 md:col-6 lg:col-3 mb-4">
                        <h3 className="text-white text-xl font-medium mb-3">Contacto</h3>
                        <ul className="list-none p-0 m-0">
                            {contactInfo.map((item) => (
                                <li key={item.label} className="mb-3">
                                    <a
                                        href={item.href}
                                        className="text-white-alpha-70 no-underline hover:text-white transition-colors transition-duration-150 cursor-pointer flex align-items-center"
                                    >
                                        <span className="flex align-items-center justify-content-center bg-white-alpha-20 border-circle mr-2" style={{ width: '2.5rem', height: '2.5rem' }}>
                                            <i className={`${item.icon} text-white text-xl`}></i>
                                        </span>
                                        <span>{item.value}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-12 md:col-6 lg:col-3 mb-4">
                        <h3 className="text-white text-xl font-medium mb-3">Síguenos</h3>
                        <p className="text-white-alpha-70 line-height-3 mb-3">
                            Mantente conectado con nosotros a través de nuestras redes sociales
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {socialLinks.map((social) => (
                                <Button
                                    key={social.name}
                                    icon={`${social.icon} text-2xl`}
                                    rounded
                                    text
                                    aria-label={social.ariaLabel}
                                    className="p-button-rounded p-button-text text-white hover:bg-white-alpha-30 transition-colors transition-duration-150"
                                    style={{ width: '3rem', height: '3rem' }}
                                    onClick={() => window.open(social.url, '_blank')}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-top-1 border-white-alpha-30 mt-4 pt-4">
                <div className="container">
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center">
                        <p className="text-white-alpha-60 text-sm mb-2 sm:mb-0">
                            © {currentYear} MásSalud. Todos los derechos reservados.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="/privacy"
                                className="text-white-alpha-60 hover:text-white text-sm no-underline transition-colors transition-duration-150"
                            >
                                Política de Privacidad
                            </a>
                            <a
                                href="/terms"
                                className="text-white-alpha-60 hover:text-white text-sm no-underline transition-colors transition-duration-150"
                            >
                                Términos y Condiciones
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

