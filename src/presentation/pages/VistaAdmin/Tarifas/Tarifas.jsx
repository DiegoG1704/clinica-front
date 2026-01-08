import { apiAdapter } from '@/core/adapters/apiAdapter';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useRef, useState } from 'react';

export default function Tarifas() {
    const [tarifario, setTarifario] = useState([]);
    const [logos, setLogos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClinicaId, setSelectedClinicaId] = useState(null);

    const carouselRef = useRef(null);
    const [scrollIndex, setScrollIndex] = useState(0);
    const logosPerView = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 21;

    const fetchIsoTipo = async (page = 1, searchTerm = '', clinicaId = null) => {
        try {
            // Construimos la URL dinámicamente según si hay clínica seleccionada
            let url = `getPromociones?page=${page}&limit=${itemsPerPage}&search=${searchTerm}`;
            if (clinicaId) {
            url += `&clinicaId=${clinicaId}`;
            }

            const response = await apiAdapter.get(url);

            setTarifario(response.data);
            setCurrentPage(response.currentPage);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error('Error al obtener tarifas:', error);
        }
        };

    

    const fetchLogo = async () => {
        try {
            const response = await apiAdapter.get(`LogosClinica`);
            setLogos(response);
        } catch (error) {
            console.error('Error al obtener logos:', error);
        }
    };

    useEffect(() => {
        fetchLogo();
    }, []);

    useEffect(() => {
        fetchIsoTipo(currentPage, searchTerm, selectedClinicaId);
        }, [currentPage, searchTerm, selectedClinicaId]);



    // Manejador para filtrar por clínica (logo)
    const handleLogoClick = (id) => {
        setSelectedClinicaId(id === selectedClinicaId ? null : id); // Toggle filter
    };

    // Manejador para scroll manual del carrusel
    const scrollCarousel = (direction) => {
  const container = carouselRef.current;
  const containerWidth = container.clientWidth;
  const itemWidth = container.querySelector('div').clientWidth; // Ancho de un solo ítem
  const scrollAmount = itemWidth * logosPerView; // Cuánto desplazamos cada vez

  if (direction === 'left' && scrollIndex > 0) {
    // Desplazamiento a la izquierda
    setScrollIndex(scrollIndex - 1);
    container.scrollLeft -= scrollAmount;
  } else if (direction === 'right' && (scrollIndex + 1) * logosPerView < logos.length) {
    // Desplazamiento a la derecha
    setScrollIndex(scrollIndex + 1);
    container.scrollLeft += scrollAmount;
  }
};


    // Filtrado de tarifas por búsqueda y clínica seleccionada
    const filterAffiliates = tarifario.filter((affiliate) => {
        const matchesSearch = `${affiliate.nombre} ${affiliate.area}`.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesClinica = selectedClinicaId ? affiliate.clinicaId === selectedClinicaId : true;
        return matchesSearch && matchesClinica;
    });

    return (
        <div className="p-2 surface-ground min-h-screen">
            {/* Encabezado */}
            <div className="mb-4 text-center">
                <h1 className="text-4xl font-bold" style={{ color: '#16717C' }}>Lista de Tarifas</h1>
                <p className="text-secondary">Aquí podrá buscar en la lista de tarifas disponibles.</p>
            </div>

            {/* Buscador */}
            <div className="flex justify-content-center mb-4">
                <InputText
                    placeholder="Buscar tarifa..."
                    className="w-full sm:w-10 md:w-8 lg:w-6 p-inputtext-sm border-round-xl border-2 border-teal-300"
                    style={{ height: '50px', fontSize: '18px' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Carrusel de logos con botones */}
            <div className="flex align-items-center justify-content-center mb-5">
                <Button
                    icon="pi pi-chevron-left"
                    className="p-button-text"
                    onClick={() => scrollCarousel('left')}
                    disabled={scrollIndex === 0}
                />
                <div
                    ref={carouselRef}
                    className="flex overflow-x-hidden gap-3 px-2 py-3"
                    style={{
                        scrollBehavior: 'smooth',
                        width: '90%',
                        maxWidth: '1200px'
                    }}
                >
                    {logos.map((p) => (
                        <div
                            key={p.id}
                            className={`flex justify-content-center align-items-center border-round shadow-1 px-3 py-2 cursor-pointer transition-colors transition-duration-200 ${
                                selectedClinicaId === p.id ? 'surface-200 border-teal-400' : 'surface-card'
                            }`}
                            style={{
                                minWidth: '160px',
                                maxWidth: '160px',
                                height: '100px',
                                flexShrink: 0
                            }}
                            onClick={() => handleLogoClick(p.id)}
                            title={p.nombre}
                        >
                            <img
                                src={`${process.env.REACT_APP_API_BASE_URL}uploads/${p.logo}`}
                                alt={`Logo de ${p.nombre}`}
                                style={{
                                    maxHeight: '60px',
                                    objectFit: 'contain'
                                }}
                            />
                        </div>
                    ))}
                </div>
                <Button
                    icon="pi pi-chevron-right"
                    className="p-button-text"
                    onClick={() => scrollCarousel('right')}
                    disabled={(scrollIndex + 1) * logosPerView >= logos.length}
                />
            </div>

            <div className="flex justify-content-end align-items-center gap-4 my-4">
                <Button
                    className="p-button p-component p-button-text"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    <span className="p-button-icon pi pi-angle-left"></span>
                    <span className="p-button-label">Anterior</span>
                </Button>

                <span style={{ fontWeight: '600', fontSize: '1.1rem', color: '#16717C' }}>
                    Página {currentPage} de {totalPages}
                </span>

                <Button
                    className="p-button p-component p-button-text"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    <span className="p-button-label">Siguiente</span>
                    <span className="p-button-icon pi pi-angle-right"></span>
                </Button>
                </div>


            {/* Lista de Tarifas */}
            <div className="grid flex-wrap">
                {filterAffiliates.map((p) => (
                    <div
                        key={p.id}
                        className="col-12 sm:col-6 lg:col-4"
                    >
                        <div className="p-4 surface-card border-round-xl shadow-2 flex flex-column justify-content-between h-full">
                            <div className="mb-3">
                                <span className="text-xl font-bold" style={{ color: '#116E6E' }}>{p.nombre}</span>
                                <div className="text-sm text-color-secondary">{p.area}</div>
                            </div>

                            {p.precioReg && (
                                <div className="flex justify-content-between align-items-center mb-2">
                                    <span className="text-sm">Precio actual</span>
                                    <span className="text-lg font-semibold">S/. {p.precioReg}</span>
                                </div>
                            )}
                            <div className="flex justify-content-between align-items-center mb-4">
                                <span className="text-lg font-bold text-green-600">Precio Massalud</span>
                                <span className="text-lg font-bold text-green-600">
                                    {p.tipo === "1" ? (
                                        <>S/. {Number(p.descuento).toFixed(2)}</>
                                    ) : p.tipo === "2" ? (
                                        p.precioReg ? (
                                            <>S/. {(Number(p.precioReg) * (1 - Number(p.descuento) / 100)).toFixed(2)}</>
                                        ) : (
                                            <>{Number(p.descuento)}% de descuento</>
                                        )
                                    ) : (
                                        <span className="text-red-500">No disponible</span>
                                    )}
                                </span>
                            </div>

                            <div className="flex flex-column sm:flex-row sm:justify-content-between align-items-center gap-3 mt-auto">
                                <img
                                    src={`${process.env.REACT_APP_API_BASE_URL}uploads/${p.logo}`}
                                    alt="Logo de la clínica"
                                    style={{ maxWidth: '150px', maxHeight: '60px', objectFit: 'contain' }}
                                />
                                {p.AtenClien ? (
                                    <a
                                        href={`https://wa.me/${p.AtenClien}?text=${encodeURIComponent(
                                            'Hola, soy afiliado al programa Massalud y me gustaría reservar una cita. ¿Podría brindarme más información, por favor?'
                                        )}`}
                                        // href={`https://wa.me/${p.AtenClien}?text=${encodeURIComponent(
                                        //     `Hola, soy afiliado al programa Massalud y me gustaría reservar una cita para el servicio "${p.nombre}". ¿Podría brindarme más información, por favor?`
                                        // )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button
                                            label="Reservar Cita"
                                            icon="pi pi-whatsapp"
                                            className="p-button-outlined p-button-sm"
                                            style={{
                                                color: "#0f8d35ff",
                                                borderColor: "#0f8d35ff",
                                                fontWeight: "bold",
                                                borderRadius: "6px",
                                                textTransform: "uppercase",
                                            }}
                                        />
                                    </a>
                                    ) : (
                                    <div className='flex flex-column'>
                                        <strong>Atencion Telefonica</strong>
                                        <span>{p.telefonos}</span>
                                    </div>
                                    )}

                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-content-center align-items-center gap-4 my-4">
                <Button
                    className="p-button p-component p-button-text"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    <span className="p-button-icon pi pi-angle-left"></span>
                    <span className="p-button-label">Anterior</span>
                </Button>

                <span style={{ fontWeight: '600', fontSize: '1.1rem', color: '#16717C' }}>
                    Página {currentPage} de {totalPages}
                </span>

                <Button
                    className="p-button p-component p-button-text"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    <span className="p-button-label">Siguiente</span>
                    <span className="p-button-icon pi pi-angle-right"></span>
                </Button>
                </div>
            {/* Información Importante */}
            <div className="p-4 mb-4 border-round-xl bg-blue-50 border-1 border-blue-200 shadow-2 flex items-start gap-3">
                {/* Icono de Información */}
                <i className="pi pi-info-circle text-xl text-blue-600" style={{ marginTop: '2px' }}></i>

                <div>
                    <h2 className="text-lg font-semibold text-blue-600 mb-2">Información Importante</h2>
                    <ul className="text-sm text-blue-800">
                        <li>Los precios con Massalud requieren inscripción previa al programa.</li>
                        <li>Las promociones están sujetas a disponibilidad de citas.</li>
                        <li>Válido hasta el 31 de diciembre de 2026.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
