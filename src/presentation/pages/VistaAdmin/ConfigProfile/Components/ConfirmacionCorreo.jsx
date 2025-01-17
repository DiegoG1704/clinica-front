import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useAuth } from '../../../../context/AuthContext/AuthContext';
import React, { useRef, useState } from "react";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { apiAdapter } from '../../../../../core/adapters/apiAdapter';

export default function ConfirmacionCorreo({ Cerrar, Abrir }) {
    const { user } = useAuth();
    const stepperRef = useRef(null);
    const [codigo, setCodigo] = useState('');
    const [codigoValido, setCodigoValido] = useState(false); // Estado para saber si el código es válido

    const handleCodigoChange = (e) => {
        setCodigo(e.target.value);
    };

    const handleSubmit = async (e) => {
        try {
            const response = await apiAdapter.post('enviar-codigo', {
                usuario_id: user?.id,
                destinatario: user?.correo
            });
            stepperRef.current.nextCallback(); // Avanzamos al siguiente paso
            console.log('Éxito', response.data.message);
        } catch (error) {
            console.log(error.response?.data?.error);
        }
    };

    const handleSubmitVerificar = async (e) => {

        try {
            const response = await apiAdapter.post('verificar-codigo', {
                usuario_id: user?.id,
                codigo_ingresado: codigo
            });
            stepperRef.current.nextCallback(); // Avanzamos al siguiente paso
            console.log('Éxito', response.data.message);

        } catch (error) {
            console.log(error.response?.data?.error);
        }
    };

    return (
        <Dialog
            visible={Abrir}
            onHide={Cerrar}
            header="Confirmación de Correo"
        >
            <div className="card flex justify-content-center">
                <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
                    <StepperPanel>
                        <div className="flex flex-column h-12rem">
                            <p>Se le va a enviar un código al correo proporcionado.</p>
                            <InputText value={user?.correo} disabled />
                        </div>
                        <div className="flex pt-4 justify-content-between">
                            <Button label="Cancelar" severity="secondary" onClick={Cerrar} />
                            <Button label="Confirmar" icon="pi pi-arrow-right" iconPos="right" onClick={handleSubmit} />
                        </div>
                    </StepperPanel>

                    <StepperPanel>
                        <div className="flex flex-column h-12rem">
                            <p>Se le ha enviado un código.</p>
                            <p>Introduzca el código aquí:</p>
                            <InputText
                                id="codigo"
                                value={codigo}
                                onChange={handleCodigoChange}
                                placeholder="Ingresa el código"
                            />
                        </div>
                        <div className="flex pt-4 justify-content-between">
                            <Button label="Cancelar" severity="secondary" onClick={Cerrar} />
                            <Button
                                label="Siguiente"
                                icon="pi pi-arrow-right"
                                iconPos="right"
                                onClick={handleSubmitVerificar}
                            />
                        </div>
                    </StepperPanel>

                    <StepperPanel>
                        <div className="flex flex-column h-12rem">
                            <p>¡Felicitaciones! Correo confirmado.</p>
                            <p>Gracias por confirmar tu correo.</p>
                        </div>
                        <div className="flex pt-4 justify-content-center">
                            <Button label="Aceptar" onClick={Cerrar} />
                        </div>
                    </StepperPanel>
                </Stepper>
            </div>
        </Dialog>
    );
}
