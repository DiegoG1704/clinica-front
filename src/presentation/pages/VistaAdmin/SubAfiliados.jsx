import axios from 'axios';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext'; // Importar InputText
import React, { useEffect, useState } from 'react';

export default function SubAfiliados({ UserId }) {
  const [afiliados, setAfiliados] = useState([]); // Cambiar a un array vacío
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [visible,setVisible] = useState(false);
  const [editar,setEditar] = useState(false);

  const estadosCiviles = [
    { label: 'Soltero', value: 'Soltero' },
    { label: 'Casado', value: 'Casado' },
    { label: 'Divorciado', value: 'Divorciado' },
    { label: 'Viudo', value: 'Viudo' },
    { label: 'Separado', value: 'Separado' },
];

  const [formData, setFormData] = useState({
    correo: '',
    contraseña: '',
    nombres: '',
    apellidos: '',
    dni: '',
    estado_civil: '',
    rol_id: 4, 
    afiliador_id: UserId 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulario enviado:', formData);
        // Aquí puedes agregar la lógica para enviar los datos a tu API
    };
  useEffect(() => {
    const fetchAfiliados = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/usuarios/${UserId?.id}/afiliados`);
        setAfiliados(response.data);
      } catch (error) {
        console.error('Error al obtener los afiliados:', error);
      }
    };

    fetchAfiliados();
  }, [UserId]); // Añadir UserId como dependencia

  // Filtrar afiliados según el término de búsqueda
  const filteredAfiliados = afiliados.filter(afiliado =>
    afiliado.nombres.toLowerCase().includes(searchTerm.toLowerCase()) || 
    afiliado.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
    afiliado.dni.includes(searchTerm) // Filtrar por DNI
  );

  const actionsTemplate = (rowData) => (
    <div className='flex gap-2'>
      <Button icon="pi pi-pencil" className="bg-white border-none shadow-none" style={{ color: "#85C226" }} onClick={() => {
        setFormData({
          nombres: rowData.nombres,
          apellidos: rowData.apellidos,
          dni: rowData.dni,
          estado_civil: rowData.estado_civil, // Asegúrate de que este campo existe
          rol_id: rowData.rol_id, // Este también debe existir si es necesario
          afiliador_id: UserId,
        });
        setEditar(true);
      }}/>
      <Button icon="pi pi-trash" className="bg-white border-none shadow-none" style={{ color: "#85C226" }} />
    </div>
  );

  return (
    <>
      <div className='flex'>
        <div className='flex-1 p-2'>
          <h1>Lista de Afiliados</h1>
          <Divider />
        </div>
        <div className='flex justify-content-end align-items-center'>
          <Button
            label='Afiliar Usuarios'  
            style={{ backgroundColor: "#85C226", borderColor: "#85C226", width: "200px", height: "60px" }} 
            onClick={()=>setVisible(true)}
          />
        </div>
      </div>
      <div className="flex justify-content-center">
        <Card style={{ width: '80%', height: '7rem'}}>
          <InputText
            placeholder='Buscar afiliado...'
            style={{ width: '50%', height: '4rem', borderRadius: '15px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex justify-content-left"
          />
        </Card>
      </div>
      <div className="flex justify-content-center">
        <Card style={{ width: '80%', marginTop:'15px' }}>
          <DataTable value={filteredAfiliados} rowClassName="my-2" dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
            <Column field="nombres" header="Nombres" />
            <Column field="apellidos" header="Apellidos" />
            <Column field="dni" header="DNI" />
            <Column field="rol_id" header="Rol ID" />
            <Column header='Acciones' body={actionsTemplate} />
          </DataTable>
        </Card>
      </div>
      <Dialog visible={visible} onHide={()=>setVisible(false)} style={{width:'700px'}}>
        <div>
          <h2>Formulario de Usuario</h2>
          <Divider />
            <div className="field flex flex-column">
                <label htmlFor="correo">Correo:</label>
                <InputText id="correo" name="correo" value={formData.correo} onChange={handleChange} required />
            </div>
            <div className="field flex flex-column">
                <label htmlFor="contraseña">Contraseña:</label>
                <InputText type="password" id="contraseña" name="contraseña" value={formData.contraseña} onChange={handleChange} required />
            </div>
            <div className="field flex flex-column">
                <label htmlFor="nombres">Nombres:</label>
                <InputText id="nombres" name="nombres" value={formData.nombres} onChange={handleChange} required />
            </div>
            <div className="field flex flex-column">
                <label htmlFor="apellidos">Apellidos:</label>
                <InputText id="apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange} required />
            </div>
            <div className="field flex flex-column">
                <label htmlFor="dni">DNI:</label>
                <InputText id="dni" name="dni" value={formData.dni} onChange={handleChange} required />
            </div>
            <div className="field flex flex-column">
                <label htmlFor="estado_civil">Estado Civil:</label>
                <Dropdown id="estado_civil" name="estado_civil" value={formData.estado_civil} options={estadosCiviles} onChange={handleChange} placeholder="Selecciona un estado civil" />
            </div>
            <Button label="Cancelar" style={{ marginTop: '20px' }} onClick={()=>setVisible(false)}/>
            <Button label="Enviar" style={{ marginTop: '20px' }} onClick={handleSubmit}/>
        </div>
      </Dialog>
      <Dialog visible={editar} onHide={()=>setEditar(false)} style={{width:'700px'}}>
        <div>
          <h2>Formulario de Usuario</h2>
          <Divider />
            <div className="field flex flex-column">
                <label htmlFor="nombres">Nombres:</label>
                <InputText id="nombres" name="nombres" value={formData.nombres} onChange={handleChange} required />
            </div>
            <div className="field flex flex-column">
                <label htmlFor="apellidos">Apellidos:</label>
                <InputText id="apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange} required />
            </div>
            <div className="field flex flex-column">
                <label htmlFor="dni">DNI:</label>
                <InputText id="dni" name="dni" value={formData.dni} onChange={handleChange} required />
            </div>
            <div className="field flex flex-column">
                <label htmlFor="estado_civil">Estado Civil:</label>
                <Dropdown id="estado_civil" name="estado_civil" value={formData.estado_civil} options={estadosCiviles} onChange={handleChange} placeholder="Selecciona un estado civil" />
            </div>
            <Button label="Cancelar" style={{ marginTop: '20px' }} onClick={()=>setVisible(false)}/>
            <Button label="Enviar" style={{ marginTop: '20px' }} onClick={handleSubmit}/>
        </div>
      </Dialog>
    </>
  );
}
