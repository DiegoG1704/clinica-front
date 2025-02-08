import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios'; // Importar axios

export default function SubLocalDialog({ visible, onHide}) {
  const [dni, setDni] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [newSL, setNewSL] = useState(false);
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://dniruc.apisperu.com/api/v1/dni/${dni}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRnc3QxNzA0QGdtYWlsLmNvbSJ9.4MWOq0VPNPDODZpUXh3p2MoG55I6hSBLSMzEFvT7es0`);
      const data = response.data;

      // Asumiendo que la API devuelve 'nombres' y 'apellidoPaterno' y 'apellidoMaterno'
      setNombres(data.nombres);
      setApellido(`${data.apellidoPaterno} ${data.apellidoMaterno}`);

      console.log("Datos recibidos:", data);
    } catch (error) {
      console.error("Error al buscar el DNI:", error);
    }
  };

  const actionsTemplate = (rowData) => (
    <div className='flex gap-2'>
      <Button icon="pi pi-pencil" className="bg-white border-none shadow-none" style={{ color: "#85C226" }} />
      <Button icon="pi pi-trash" className="bg-white border-none shadow-none" style={{ color: "#85C226" }} />
    </div>
  );

  const handleGenerate = () => {
    console.log("Generating user with:", { nombres, apellido, correo, contrasena });
  };

  const actionsFooter = () => (
    <div className='flex gap-2'>
      <Button icon="pi pi-trash" severity="secondary" outlined label='Cancelar' style={{ color: "#607d8b" }} onClick={() => setNewSL(false)} />
      <Button icon="pi pi-save" severity="secondary" label='Guardar' style={{ color: "#fff" }} />
    </div>
  );

  return (
    <div>
      <Dialog header='Crear Administrador local' visible={newSL} onHide={() => setNewSL(false)} footer={actionsFooter} style={{ width: '1000px' }}>
        <div className='flex'>
          <div className='flex-1 p-2'>
            <h2>Información General</h2>

            <div className='field flex flex-column'>
              <label style={{ fontWeight: 'bold' }}>DNI</label>
              <div>
                <InputText 
                  value={dni} 
                  onChange={(e) => setDni(e.target.value)} 
                  placeholder='Introduce DNI...' 
                />
                <Button 
                  label='Buscar' 
                  onClick={handleSearch} 
                  style={{ backgroundColor: "#85C226", borderColor: "#85C226", marginTop: '10px' }} 
                />
              </div>
            </div>
            <div className='field flex flex-column'>
              <label style={{ fontWeight: 'bold' }}>Nombres</label>
              <InputText 
                value={nombres} 
                onChange={(e) => setNombres(e.target.value)} 
                placeholder='Introduce Nombres...' 
              />
            </div>

            <div className='field flex flex-column'>
              <label style={{ fontWeight: 'bold' }}>Apellido</label>
              <InputText 
                value={apellido} 
                onChange={(e) => setApellido(e.target.value)} 
                placeholder='Introduce Apellido...' 
              />
            </div>

            <div className='field flex flex-column'>
              <label style={{ fontWeight: 'bold' }}>Telefono</label>
              <InputText 
                value={telefono} 
                onChange={(e) => setTelefono(e.target.value)} 
                placeholder='Introduce Telefono...' 
              />
            </div>

            <div className='field flex flex-column'>
              <label style={{ fontWeight: 'bold' }}>Direccion</label>
              <InputText 
                value={direccion} 
                onChange={(e) => setDireccion(e.target.value)} 
                placeholder='Introduce Direccion...' 
              />
            </div>

            <div className='field flex flex-column'>
              <label style={{ fontWeight: 'bold' }}>Estado Civil</label>
              <InputText 
                value={estadoCivil} 
                onChange={(e) => setEstadoCivil(e.target.value)} 
                placeholder='Introduce Estado Civil...' 
              />
            </div>

            <div className='field flex flex-column'>
              <label style={{ fontWeight: 'bold' }}>Fecha de Nacimiento</label>
              <InputText 
                value={fechaNacimiento} 
                onChange={(e) => setFechaNacimiento(e.target.value)} 
                placeholder='Introduce Fecha de Nacimiento...' 
              />
            </div>
          </div>

          <div className='flex-1 p-2'>
            <h2>Información de Usuario</h2>

            <div className='field flex flex-column'>
              <label style={{ fontWeight: 'bold' }}>Correo</label>
              <InputText 
                value={correo} 
                onChange={(e) => setCorreo(e.target.value)} 
                placeholder='Introduce Correo...' 
                style={{ marginTop: '10px' }} 
              />
            </div>

            <div className='field flex flex-column'>
              <label style={{ fontWeight: 'bold' }}>Contraseña</label>
              <div>
                <InputText 
                  value={contrasena} 
                  onChange={(e) => setContrasena(e.target.value)} 
                  placeholder='Introduce Contraseña' 
                  type='password' 
                />
                <Button 
                  label='Generar' 
                  onClick={handleGenerate} 
                  style={{ backgroundColor: "#85C226", borderColor: "#85C226" }} 
                />
              </div>
            </div>

            <h2>Seleccionar Sub-Local</h2>
            <div className='field flex flex-column'>
              <label style={{ fontWeight: 'bold' }}>Sub locales</label>
              <InputText 
                value={correo} 
                onChange={(e) => setCorreo(e.target.value)} 
                placeholder='Introduce Correo...' 
                style={{ marginTop: '10px' }} 
              />
            </div>
            <div className='field flex flex-column'>
              <label style={{ fontWeight: 'bold' }}>Agregar Sub-local</label>
              <InputText 
                value={correo} 
                onChange={(e) => setCorreo(e.target.value)} 
                placeholder='Introduce Correo...' 
                style={{ marginTop: '10px' }} 
              />
            </div>
            <Button label='Agregar' />
          </div>
        </div>
      </Dialog>

      <Dialog header='Lista de Sub-Locales' visible={visible} onHide={onHide}>
        <div className='flex'>
          <div className='flex-1 p-2'>
            <h1>Lista de Sub-Locales</h1>
            <Divider />
          </div>
          <div className='flex justify-content-end align-items-center'>
            <Button 
              label='Añadir Sub-Local' 
              style={{ backgroundColor: "#85C226", borderColor: "#85C226", width: "200px", height: "60px" }} 
              onClick={() => setNewSL(true)} 
            />
          </div>
        </div>

        <DataTable rowClassName="my-2" dataKey="id">
          <Column field="nombres" header="Nombres" />
          <Column field="apellidos" header="Apellidos" />
          <Column field="Telefonos" header="Telefono" />
          <Column header="Acciones" body={actionsTemplate} />
        </DataTable>
      </Dialog>
    </div>
  );
}
