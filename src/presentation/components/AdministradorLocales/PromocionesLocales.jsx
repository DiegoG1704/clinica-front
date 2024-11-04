import axios from 'axios';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext/AuthContext';

export default function PromocionesLocales({ IdUsuario }) {
  const [promociones, setPromociones] = useState([]);
  const [agregar, setAgregar] = useState(false);
  const [editar, setEditar] = useState(false);
  const [eliminar, setEliminar] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const{user}=useAuth()
  useEffect(() => {
    const fetchPromociones = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getPromociones/${user?.id}`);
        setPromociones(response.data);
      } catch (error) {
        console.error('Error al obtener las promociones:', error);
      }
    };
    fetchPromociones();
  }, [user]);

  const actionsTemplate = (rowData) => (
    <div className='flex gap-2'>
      <Button
        icon="pi pi-pencil"
        className="bg-white border-none shadow-none"
        style={{ color: "#85C226" }}
        onClick={() => {
          setSelectedPromotion(rowData);
          setEditar(true);
        }}
      />
      <Button
        icon="pi pi-trash"
        className="bg-white border-none shadow-none"
        style={{ color: "#DB2423" }}
        onClick={() => {
          setSelectedPromotion(rowData);
          setEliminar(true);
        }}
      />
    </div>
  );

  return (
    <>
      <div className='flex'>
        <div className='flex-1 p-2'>
          <h1>Lista de Promociones</h1>
          <Divider />
        </div>
        <div className='flex justify-content-end align-items-center'>
          <Button
            label='Agregar Promocion' 
            style={{ backgroundColor: "#85C226", borderColor: "#85C226", width: "200px", height: "60px" }}
            onClick={() => setAgregar(true)}
          />
        </div>
      </div>
      <InputText
        placeholder='Buscar nombre de Promociones...'
        style={{ width: '50%' }}
      />
      <DataTable value={promociones} rowClassName="my-2">
        <Column
          header='Foto'
          body={(rowData) => (
            <img src={`http://localhost:4000/uploads/${rowData.imagen}`} alt="Tipo" width="60" className='border-round-sm' />
          )}
        />
        <Column field="area" header="Area" />
        <Column field="descuento" header="Descuento" />
        <Column field="descripcion" header="Descripción" />
        <Column field="calificacion" header="Calificación(1-5)" />
        <Column header="Estado" />
        <Column header='Acciones' body={actionsTemplate} />
      </DataTable>
      <Dialog visible={agregar} onHide={() => setAgregar(false)} header='Agregar nueva Promocion' style={{ width: '800px' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '20px' }}>
            <input type="file" accept="image/*" style={{ display: 'none' }} id="imageUpload" />
            <label htmlFor="imageUpload" style={{ cursor: 'pointer' }}>
              <div
                style={{
                  width: '220px',
                  height: '220px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px dashed #ccc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
              >Ingresar imagen de promoción
              </div>
            </label>
          </div>
          <div style={{ flex: 1 }}>
            <div className="field flex flex-column">
              <label>Área</label>
              <InputText placeholder="Ingresar área..." required />
            </div>
            <div className="field flex flex-column">
              <label>Descuento</label>
              <InputText placeholder="Ingresar descuento..." required />
            </div>
            <div className="field flex flex-column">
              <label>Descripción</label>
              <InputText placeholder="Ingresar descripción..." required />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button label="Cancelar" style={{ marginRight: '10px' }} onClick={() => setAgregar(false)} />
          <Button label="Crear" />
        </div>
      </Dialog>
      <Dialog visible={editar} onHide={() => setEditar(false)} header='Editar Promocion' style={{ width: '800px' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '20px' }}>
            <input type="file" accept="image/*" style={{ display: 'none' }} id="imageUploadEdit" />
            <label htmlFor="imageUploadEdit" style={{ cursor: 'pointer' }}>
              <div
                style={{
                  width: '220px',
                  height: '220px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px dashed #ccc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
              >
                {selectedPromotion && (
                  <img
                    src={`http://localhost:4000/uploads/${selectedPromotion.imagen}`}
                    alt="Promoción"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                )}
                {!selectedPromotion && "Ingresar imagen de promoción"}
              </div>
            </label>
          </div>
          <div style={{ flex: 1 }}>
            <div className="field flex flex-column">
              <label>Área</label>
              <InputText
                value={selectedPromotion?.area || ''}
                placeholder="Ingresar área..."
                required
                onChange={(e) => setSelectedPromotion({ ...selectedPromotion, area: e.target.value })}
              />
            </div>
            <div className="field flex flex-column">
              <label>Descuento</label>
              <InputText
                value={selectedPromotion?.descuento || ''}
                placeholder="Ingresar descuento..."
                required
                onChange={(e) => setSelectedPromotion({ ...selectedPromotion, descuento: e.target.value })}
              />
            </div>
            <div className="field flex flex-column">
              <label>Descripción</label>
              <InputText
                value={selectedPromotion?.descripcion || ''}
                placeholder="Ingresar descripción..."
                required
                onChange={(e) => setSelectedPromotion({ ...selectedPromotion, descripcion: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button label="Cancelar" style={{ marginRight: '10px' }} onClick={() => setEditar(false)} />
          <Button label="Guardar" />
        </div>
      </Dialog>
      <Dialog visible={eliminar} onHide={() => setEliminar(false)} style={{ width: '400px' }}>
        {selectedPromotion && (
          <>
            <h2 style={{textAlign:'center'}}>¿Desea Eliminar el área de {selectedPromotion.area}?</h2>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Button label="Cancelar" style={{ marginRight: '10px', background:'#6EAFDB', borderColor:'#6EAFDB' }} onClick={() => setEliminar(false)} />
              <Button label="Confirmar" style={{background:'#DB2423',borderColor:'#DB2423'}}/>
            </div>
          </>
        )}
      </Dialog>
    </>
  );
}
