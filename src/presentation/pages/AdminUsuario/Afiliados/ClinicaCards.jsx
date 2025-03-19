import React, { useState } from 'react'; // Asegúrate de importar useState
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import '../Afiliados/css/ClinicaCards.css';
import user from '../../../img/sinLogo.png';
import img from '../../../img/sinImg.png';
import Tarifas from './Dialog/Tarifas';
import { useAuth } from '../../../context/AuthContext/AuthContext';
import ClinicaCard from '@/presentation/features/admin/admin-usuario/afiliado/components/clinica-card/ClinicaCard';

export default function ClinicaCards({ Ancho, Alto, Margen, Display, Promociones, Admin }) {
    const [admin, setAdmin] = useState(Admin); // Estado para admin
    const {user} = useAuth();
    const [open, setOpen] = useState(false);
    const [selectedClinica, setSelectedClinica] = useState(null); // Estado para almacenar la clínica seleccionada

    const handleButtonClick = (clinica) => {
        setSelectedClinica(clinica); // Guardar la clínica seleccionada
        setOpen(true); // Abrir el diálogo
    };

    return (
        <div className="cards-container">
            {Promociones.length > 0 ? (
                Promociones.map((clinica,index) => (
                   <ClinicaCard key={index} clinica={clinica} fnTarifas={() => handleButtonClick(clinica)} defImage={ img} />
                ))
            ) : (
                <p>No se encontraron promociones.</p> // Mensaje si no hay resultados
            )}
            <Tarifas 
                Visible={open} 
                Close={() => setOpen(false)} 
                clinica={selectedClinica} // Pasar la clínica seleccionada al componente Tarifas
                datos={Promociones}
            />
        </div>
    );
}
