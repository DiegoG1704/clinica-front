import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Divider } from 'primereact/divider';
import SubLocalDialog from '../AdminGeneral/SubLocalDialog';
import Locales from '../AdminGeneral/Locales';
import CustomDialog from '../../components/Dialog/CustomDialog';

export default function Clinicas() {
    const [clinicas, setClinicas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false)
    const [visibleLocal, setVisibleLocal] = useState(false)
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClinicas = async () => {
            setLoading(true); // Asegúrate de iniciar el loading aquí
            try {
                const response = await axios.get('http://localhost:4000/listaClinicas');
                setClinicas(response.data); // Asegúrate de que este acceso sea correcto
            } catch (error) {
                console.error('Error fetching clinic data:', error);
                setError('Failed to load clinics.');
            } finally {
                setLoading(false);
            }
        };

        fetchClinicas();
    }, []); // Solo ejecutar al montar el componente

    const actionsTemplate = (rowData) => (
        <div className='flex gap-2'>
            <Button icon="pi pi-pencil" className="bg-white border-none shadow-none" style={{ color: "#85C226" }} />
            <Button icon="pi pi-trash" className="bg-white border-none shadow-none" style={{ color: "#85C226" }} />
        </div>
    );

    const actionsAdminLocal = (rowData) => (
        <div className='flex'>
            <Button icon="pi pi-user" rounded severity="info" aria-label="User" style={{ color: "#fff" }} onClick={() => setVisible(true)} />
        </div>
    );

    const actionsLocales = (rowData) => (
        <div className='flex'>
            <Button icon="pi pi-building" rounded severity="secondary" aria-label="User" style={{ color: "#fff" }} onClick={() => setVisibleLocal(true)} />
        </div>
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <div className='flex'>
                <div className='flex-1 p-2'>
                    <h1>Lista de Clinicas</h1>
                    <Divider />
                </div>
                <div className='flex justify-content-end align-items-center'>
                    <Button label='Añadir Clinica' className='' style={{ backgroundColor: "#85C226", borderColor: "#85C226", width: "200px", height: "60px" }} />
                </div>
            </div>
            < CustomDialog value={clinicas} rowClassName="my-2" dataKey="id">
                <Column field="nombre" header="Nombre" />
                <Column
                    header='IsoTipo'
                    body={(rowData) => (
                        <img src={`http://localhost:4000/uploads/${rowData.IsoTipo}`} alt="Tipo" width="60" className='border-round-sm' />
                    )}
                />

                <Column field="telefonos" header="Teléfono" />
                <Column field="ruc" header="RUC" />
                <Column field="ubicacion" header="Ubicación" />
                <Column field="direccion" header="Direccion" />
                <Column header='locales' body={actionsLocales} />
                <Column header='Admin-local' body={actionsAdminLocal} />
                <Column header='Cambios' body={actionsTemplate} />
            </CustomDialog>

           

           
            <SubLocalDialog visible={visible} onHide={() => setVisible(false)} />
            <Locales visible={visibleLocal} onHide={() => setVisibleLocal(false)} />

        </div>
    );
}


