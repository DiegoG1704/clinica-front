import React, { useEffect, useRef, useState } from 'react';
import { apiAdapter } from '../../../core/adapters/apiAdapter';
import ClinicaCards from '../../pages/AdminUsuario/Afiliados/ClinicaCards';
import { Button } from 'primereact/button';
import { useAuth } from '../../context/AuthContext/AuthContext';
import TerminosyCond from '../../pages/login/Dialog/TerminosyCond';
import { showToast } from '../../utils/showToast';
import PromotorUpgradeDialog from '@/presentation/features/admin/admin-usuario/afiliado/components/PromotorUpgradeDialog/PromotorUpgradeDialog';
import SolicitudEnviadaDialog from '@/presentation/features/admin/admin-usuario/afiliado/TarifariosClinicas/components/SolicitudEnviadaDialog/SolicitudEnviadaDialog';
import { Dialog } from 'primereact/dialog';
import PasarelaPagos from '@/presentation/pages/VistaAdmin/Pasarela/components/Pasarela';
import styles from '../../features/admin/admin-usuario/components/ConfirmSolicitudDialog/styles/ConfirmSolicitudDialog.module.css'

export default function Tarifario() {
    const { user, logout, me } = useAuth();
    const [tarifario, setTarifario] = useState([]);
    const [open, setOpen] = useState(false);
    const toast = useRef(null);
    const [openTC, setOpenTC] = useState(false);
    const [loading, setLoading] = useState(true);
    const [checked, setChecked] = useState(false);
    const [visible, setVisible] = useState(false);
    const [datos, setDatos] = useState({
        rol_id: 4,
    });
    const [visibleSolicitudEnviadaDialog, setVisibleSolicitudEnviadaDialog] = useState(false)
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

    const fechPagos=async()=>{
    try {
        await apiAdapter.get(`/pagosRealizados/${user?.id}`)
    } catch (error) {
        console.log('error',error);
    }
    }

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
            if (response?.success) {
                await me()

            }
            return true
            // await logout();
        } catch (error) {
            console.log('Error en el envío:', error);
            return false
        }
    };
    const handleClickButtonSolicitud = () => {

        if (user?.estado_solicitud === "3") {
            setVisibleSolicitudEnviadaDialog(true)
        } else {
            setOpen(true)
        }
    }

    const headerTemplate = (<><h2 className={'text-2xl'}>Cambio de rol a Promotor</h2>
        <p className={'text-sm'}>Para cambiar de rol a Promotor debe seguir los pasos</p></>)
    return (
        <>
            <header className="flex flex-column md:flex-row justify-content-between align-items-start md:align-items-center flex-wrap gap-4 mb-4 header-module">
                {/* Contenido del lado izquierdo */}
                <div className="flex-1">
                    <h1 className="title-module text-2xl md:text-3xl mb-1">Tarifario de las Clínicas</h1>
                    <p className="description-module text-sm md:text-base text-gray-600">
                    Gestiona y administra tus centros médicos
                    </p>
                </div>

                {/* Botón para promotor */}
                {user?.rol !== "Promotor" && (
                    <div className="flex justify-content-end w-full md:w-auto">
                    <Button
                        label="Convertirme en Promotor"
                        className="w-full md:w-auto"
                        style={{
                        backgroundColor: "#85C226",
                        borderColor: "#85C226",
                        height: "48px",
                        borderRadius: "6px",
                        fontWeight: "bold",
                        color: "#fff",
                        }}
                        onClick={() => setVisible(true)}
                        // onClick={handleClickButtonSolicitud}
                    />
                    </div>
                )}
            </header>


            <div className="mt-6">
                <ClinicaCards Promociones={tarifario} Ancho="600px" Alto="300px" />
            </div>
            <SolicitudEnviadaDialog visible={visibleSolicitudEnviadaDialog} onHide={hideSolicitudDialog} />
            <PromotorUpgradeDialog visible={open} setVisible={() => setOpen(false)} setChecked={setChecked} setOpenTC={setOpenTC} submit={submit} checked={checked} />
            <TerminosyCond visible={openTC} Close={() => setOpenTC(false)} Aceptar={handleTermsAccept} PDF={'PROMOTOR.pdf'} />
            <Dialog 
            visible={visible}
            onHide={()=>setVisible(false)}
            header={headerTemplate}
            style={{ width: '30vw' }}
            className="p-fluid w-full sm:w-10 md:w-6 lg:w-4"
            >
                <PasarelaPagos 
                onSuccess={() => {
                    setVisible(false);
                    fechPagos();
                    }}
                rolId={3}
                />
            </Dialog>
        </>
    );
}