import React, { useEffect, useRef, useState } from 'react';
import { apiAdapter } from '../../../core/adapters/apiAdapter';
import ClinicaCards from '../../pages/AdminUsuario/Afiliados/ClinicaCards';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useAuth } from '../../context/AuthContext/AuthContext';
import TerminosyCond from '../../pages/login/Dialog/TerminosyCond';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';
import { showToast } from '../../utils/showToast';

export default function Tarifario() {
    const { user, logout } = useAuth();
    const [tarifario, setTarifario] = useState([]);
    const [open, setOpen] = useState(false);
    const toast = useRef(null);
    const [openTC, setOpenTC] = useState(false);
    const [loading, setLoading] = useState(true);
    const [codigo, setCodigo] = useState('');
    const [checked, setChecked] = useState(false);
    const [datos, setDatos] = useState({
        rol_id: 4,
    });
    const [isCodigoFetched, setIsCodigoFetched] = useState(false); // Nueva variable de estado

    useEffect(() => {
        const fetchIsoTipo = async () => {
            try {
                const response = await apiAdapter.get(`${process.env.REACT_APP_API_BASE_URL}listaClinicas`);
                setTarifario(response);
            } catch (error) {
                console.error('Error al obtener las clínicas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchIsoTipo();
    }, []);


    const handleTermsAccept = () => {
        setChecked(true);
        setOpenTC(false);
    };

    const submit = async () => {
        if (!checked) {
            showToast("error", "Error", "Debe aceptar los términos y condiciones", toast);
            return false;
        }

        // Lógica para enviar los datos
        try {
            const response = await apiAdapter.post(`${process.env.REACT_APP_API_BASE_URL}CodeGenered/${user?.id}`, datos);
            console.log('Datos enviados:', response);
            await logout();
        } catch (error) {
            console.log('Error en el envío:', error);
        }
 
    };


    return (
        <>
            <div className="flex">
                <div className="flex-1 p-2">
                    <h1>Tarifario de las Clínicas</h1>
                    <Divider />
                </div>
                {user?.rolId === "Afiliado" && (  // Asumiendo que 3 es el ID de afiliado
                    <div className="flex justify-content-end align-items-center">
                        <Button
                            label="Mejorar Plan"
                            style={{
                                backgroundColor: "#85C226",
                                borderColor: "#85C226",
                                height: "60px",
                                borderRadius: "6px",
                            }}
                            icon="pi pi-plus"
                            onClick={() => setOpen(true)}
                        />
                    </div>
                )}
            </div>
            <div>
                <ClinicaCards Promociones={tarifario} Ancho="600px" Alto="300px" />
            </div>
            <Dialog visible={open} onHide={() => setOpen(false)}>
            <Toast ref={toast} />
                <h1>Indicaciones</h1>
                <div className="checkbox-custom">
                    <Checkbox
                        onChange={e => {setChecked(e.checked)}}
                        checked={checked}
                        className="custom-checkbox"
                    />
                    <p>
                        Al registrarte aceptas haber leído y estar de acuerdo con la
                        <span onClick={() => setOpenTC(true)} className="terminosLink" style={{ fontWeight:'bold' }}> Política
                            de Privacidad y los Términos y condiciones</span>
                    </p>
                </div>
                <Button label="Aceptar" onClick={submit} />
            </Dialog>

            <TerminosyCond visible={openTC} Close={() => setOpenTC(false)} Aceptar={handleTermsAccept} PDF={'PROMOTOR.pdf'} />
        </>
    );
}
