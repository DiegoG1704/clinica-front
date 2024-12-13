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
    const [isCodigoFetched, setIsCodigoFetched] = useState(false);

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
            <div className="flex flex-column p-4 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Tarifario de las Clínicas</h1>
                <Divider />
                {user?.rol === "Usuario" && (
                    <div className="flex justify-content-end align-items-center mt-4">
                        <Button
                            label="Convertirme Promotor"
                            style={{
                                backgroundColor: "#85C226",
                                borderColor: "#85C226",
                                height: "60px",
                                borderRadius: "6px",
                                fontWeight: "bold",
                                color: "#fff",
                            }}
                            icon="pi pi-plus"
                            onClick={() => setOpen(true)}
                        />
                    </div>
                )}
            </div>

            <div className="mt-6">
                <ClinicaCards Promociones={tarifario} Ancho="600px" Alto="300px" />
            </div>

            <Dialog visible={open} onHide={() => setOpen(false)} className="p-2 max-w-lg mx-auto">
                <Toast ref={toast} />
                <p className="message__title">Cambio de rol a Promotor</p>
                <p className="text-lg font-semibold mb-3 text-gray-700">Para cambiar de rol a Promotor debe seguir los pasos</p>
                <Divider align="center" className="mb-4">
                    <div className="inline-flex align-items-center">
                        <i className="pi pi-lightbulb mr-2 text-yellow-500" />
                        <p><strong>PASOS</strong></p>
                    </div>
                </Divider>
                <p>Depositar la cantidad de <strong>S/. 59</strong></p>
                <p>Enviar el comprobante a este número <strong>920517220</strong></p>
                <p>La cuenta se activará hasta 24h después de la transferencia o 48h de la transferencia interbancaria</p>

                <Divider align="center" className="my-4">
                    <div className="inline-flex align-items-center">
                        <p><strong>PAGOS</strong></p>
                    </div>
                </Divider>
                <p><strong>BCP: ADB CONSULTING SAC</strong></p>
                <p><i className="pi pi-credit-card" style={{ fontSize: '1rem' }}></i> Cuenta Corriente SOLES: <strong>194-2659964-0-21</strong></p>
                <p><i className="pi pi-credit-card" style={{ fontSize: '1rem' }}></i> CCI Moneda Nacional: <strong>002-19400265996402191</strong></p>
                {/* <p><i className="pi pi-mobile" style={{ fontSize: '1rem' }}></i> Yape: <strong>920517220</strong></p> */}

                <div className="flex justify-content-center my-4">
                    <Checkbox
                        onChange={e => { setChecked(e.checked) }}
                        checked={checked}
                        className="mr-2"
                    />
                    <p className="text-sm">
                        Al registrarte aceptas haber leído y estar de acuerdo con la
                        <span onClick={() => setOpenTC(true)} className="text-blue-600 font-bold cursor-pointer"> Política de Privacidad y los Términos y Condiciones</span>
                    </p>
                </div>
                <div className="flex justify-content-end">
                    <Button label="Aceptar" onClick={submit} className="p-button-success" />
                </div>
            </Dialog>

            <TerminosyCond visible={openTC} Close={() => setOpenTC(false)} Aceptar={handleTermsAccept} PDF={'PROMOTOR.pdf'} />
        </>
    );
}
