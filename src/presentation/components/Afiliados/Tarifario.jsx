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
import PromotorUpgradeDialog from '@/presentation/features/admin/admin-usuario/afiliado/components/PromotorUpgradeDialog/PromotorUpgradeDialog';
import SolicitudEnviadaDialog from '@/presentation/features/admin/admin-usuario/afiliado/TarifariosClinicas/components/SolicitudEnviadaDialog/SolicitudEnviadaDialog';

export default function Tarifario() {
    const { user, logout } = useAuth();
    const [tarifario, setTarifario] = useState([]);
    const [open, setOpen] = useState(false);
    const toast = useRef(null);
    const [openTC, setOpenTC] = useState(false);
    const [loading, setLoading] = useState(true);
    const [checked, setChecked] = useState(false);
    const [datos, setDatos] = useState({
        rol_id: 4,
    });
    const [visibleSolicitudEnviadaDialog, setVisibleSolicitudEnviadaDialog] = useState()
    const toggleSolicitudDialog = (value) => {
        setVisibleSolicitudEnviadaDialog(value)
    }
    const showSolicitudDialog = () => {
        toggleSolicitudDialog(true)
    }
    const hideSolicitudDialog = () => {
        toggleSolicitudDialog(false)
    }

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
            const response = await apiAdapter.post(`${process.env.REACT_APP_API_BASE_URL}SolicitudPromotor/${user?.id}`, datos);
            console.log('Datos enviados:', response);
            // await logout();
        } catch (error) {
            console.log('Error en el envío:', error);
        }
    };
    const handleClickButtonSolicitud = () => {

        if (user?.estado_solicitud === "3") {
            setVisibleSolicitudEnviadaDialog(true)
        } else {
            setOpen(true)
        }
    }


    return (
        <>
            <header className={`flex header-module`}>
                <div className="flex-1 py-2 gap-0">
                    <h1 className={"title-module "}>Tarifario de las Clínicas</h1>
                    <p className={"description-module "}>Gestiona y administra tus centros médicos</p>
                    {/* <Divider /> */}


                </div>
                {/* ({user}) */}
                <div className="flex justify-content-end align-items-center">
                    <div className="flex justify-content-end align-items-center ">
                        {user?.rol !== "Promotor" && (<Button
                            label="Convertirme Promotor"
                            style={{
                                backgroundColor: "#85C226",
                                borderColor: "#85C226",
                                height: "60px",
                                borderRadius: "6px",
                                fontWeight: "bold",
                                color: "#fff",
                            }}

                            onClick={handleClickButtonSolicitud}
                        />)}



                    </div>
                </div>

            </header>

            <div className="mt-6">
                <ClinicaCards Promociones={tarifario} Ancho="600px" Alto="300px" />
            </div>
            <SolicitudEnviadaDialog visible={visibleSolicitudEnviadaDialog} onHide={hideSolicitudDialog} />
            <PromotorUpgradeDialog visible={open} setVisible={() => setOpen(false)} setChecked={setChecked} setOpenTC={setOpenTC} submit={submit} checked={checked} />
            <TerminosyCond visible={openTC} Close={() => setOpenTC(false)} Aceptar={handleTermsAccept} PDF={'PROMOTOR.pdf'} />
        </>
    );
}
