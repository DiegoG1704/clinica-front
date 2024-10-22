import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function Locales({ visible, onHide }) {
    const [correo, setCorreo] = useState('');
    const [showUserInfo, setShowUserInfo] = useState(false);

    const handleAddSubLocal = () => {
        setShowUserInfo(true);
    };

    const handleCloseUserInfo = () => {
        setShowUserInfo(false);
        setCorreo(''); // Clear input on close
    };

    return (
        <div>
            <Dialog style={{ width: '900px' }} visible={visible} onHide={onHide}>
                <div className='flex'>
                    <div className='flex-1 p-2'>
                        <h1>Lista de Locales</h1>
                        <Divider />
                    </div>
                    <div className='flex justify-content-end align-items-center'>
                        <Button
                            label='Añadir Sub-Local'
                            style={{ backgroundColor: "#85C226", borderColor: "#85C226", width: "200px", height: "60px" }}
                            onClick={handleAddSubLocal}
                        />
                    </div>
                </div>

                <DataTable rowClassName="my-2" dataKey="id">
                    <Column field="nombres" header="Nombres" />
                    <Column field="apellidos" header="Apellidos" />
                    <Column field="Telefonos" header="Telefono" />
                    <Column header="Acciones" />
                </DataTable>
            </Dialog>

            <Dialog style={{width:'500px'}} visible={showUserInfo} onHide={handleCloseUserInfo}>
                <div>
                    <h2>Nuevo Local</h2>

                    <div className='field flex flex-column'>
                        <label style={{ fontWeight: 'bold' }}>Nombre</label>
                        <InputText
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            placeholder='Introduce Correo...'
                            style={{ marginTop: '10px' }}
                        />
                    </div>
                    <div className='field flex flex-column'>
                        <label style={{ fontWeight: 'bold' }}>Dirección</label>
                        <InputText
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            placeholder='Introduce Dirección...'
                            style={{ marginTop: '10px' }}
                        />
                    </div>
                    <Button label='Agregar' onClick={() => {/* handle add action */}} />
                    <Button label='Cancelar' onClick={() => setShowUserInfo(false)} />
                </div>
            </Dialog>
        </div>
    );
}
