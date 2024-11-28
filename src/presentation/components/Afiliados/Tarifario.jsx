import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { apiAdapter } from '../../../core/adapters/apiAdapter';
import ClinicaCards from '../../pages/AdminUsuario/Afiliados/ClinicaCards';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useAuth } from '../../context/AuthContext/AuthContext';

export default function Tarifario() {
    const {user,logout} =useAuth()
    const [tarifario, setTarifario] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [codigo, setCodigo] = useState('');
    const [datos, setDatos] = useState({
        codigo: '',
        rol_id: 3,
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'codigo') {
            setCodigo(value);
        }
        setDatos({ ...datos, [name]: value });
    };

    const generarCodigoUnico = () => {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let codigoGenerado = '';
        for (let i = 0; i < 10; i++) {
            const indice = Math.floor(Math.random() * caracteres.length);
            codigoGenerado += caracteres.charAt(indice);
        }
        setCodigo(codigoGenerado);
        setDatos({ ...datos, codigo: codigoGenerado });
    };

    const submit = async () => {
        try {
            const response = await apiAdapter.put(`${process.env.REACT_APP_API_BASE_URL}Afiliador/${user?.id}`,datos)
            console.log('Datos enviados:', response);
            await logout()
        } catch (error) {
            console.log('error cambio',error)
        }
        
    };

    if (loading) {
        return <div>Cargando datos...</div>;
    }

    return (
        <>
            <div className="flex">
                <div className="flex-1 p-2">
                    <h1>Tarifario de las Clínicas</h1>
                    <Divider />
                </div>
                {user?.rol_id === "Afiliado" && (  // Asumiendo que 3 es el ID de afiliador
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
            <Dialog visible={open} onHide={() => setOpen(false)} header="Mejorar Plan">
                <div className='flex'>
                    <div className="flex flex-column">
                        <span>Ingrese un código o genere uno:</span>
                        <InputText
                            id="codigo"
                            name="codigo"
                            value={codigo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <Button
                        label="Generar Código"
                        style={{
                            backgroundColor: "#85C226",
                            borderColor: "#85C226",
                            width: "200px",
                            height: "45px",
                            marginTop: "25px",
                        }}
                        onClick={generarCodigoUnico}
                    />
                </div>
                <div className="flex justify-content-end mt-5">
                    <Button
                        style={{
                            backgroundColor: "#85C226",
                            borderColor: "#85C226",
                            width: "200px",
                            height: "45px",
                        }}
                        label="Volverse Promotor"
                        onClick={submit}
                    />
                </div>
            </Dialog>
        </>
    );
}
