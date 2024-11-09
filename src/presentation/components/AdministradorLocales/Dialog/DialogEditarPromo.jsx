import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Toast } from 'primereact/toast' // Importar el Toast
import React, { useRef, useState, useEffect } from 'react'
import { apiAdapter } from '../../../../core/adapters/apiAdapter'
import { Dropdown } from 'primereact/dropdown'

export default function EditarPromo({visible, close, recarga,datos1,datos2}) {
  const toast = useRef(null);
  const [clinicas, setClinicas] = useState([]);
    const [datos,setDatos]= useState({
        area:'',
        descuento:'',
        descripcion:'',
        clinica_id:''
      })

      useEffect(() => {
        if (datos1) {
          setDatos({
            ...datos,
            ...datos1, // Asegúrate de que editData no tenga valores undefined
          });
        }
      }, [datos1]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatos({ ...datos, [name]: value });
      };
      
      const handleLocalChange = (e) => {
        setDatos({ ...datos, clinica_id: e.value }); // Guardar solo el id del local
      };

      useEffect(() => {
        const fetchClinicas = async () => {
            try {
                const response = await apiAdapter.get('listaClinicas');
                setClinicas(response); // Asegúrate de que este acceso sea correcto
            } catch (error) {
                console.error('Error fetching clinic data:', error);
            } 
        };
    
        fetchClinicas();
    }, []);
    const handleSubmit = async () => {
      console.log('Datos ingresados:', datos);
  
      try {
        const response = await apiAdapter.put(`editPromocion/${datos1.id}`, datos);
        console.log('Respuesta de la API:', response);
  
        // Mostrar mensaje de éxito con Toast
        toast.current.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'La promoción se ha actualizado correctamente.',
          life: 3000, // Tiempo que el Toast estará visible
        });
  
        // Limpiar los datos y cerrar el diálogo
        setDatos({
          area: '',
          descuento: '',
          descripcion: '',
          clinica_id: ''
        });
        close();
        recarga();
      } catch (error) {
        console.log('Error:', error);
  
        // Mostrar mensaje de error con Toast
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Hubo un problema al actualizar la promoción. Intenta nuevamente.',
          life: 3000, // Tiempo que el Toast estará visible
        });
      }
    };
  return (
    <>
    <Toast ref={toast} />
    <Dialog visible={visible} onHide={close} header='Editar Promocion' style={{ width: '800px' }}>
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
                {datos1 && (
                  <img
                    src={`http://localhost:4000/uploads/${datos1.imagen}`}
                    alt="Promoción"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                )}
                {!datos1 && "Ingresar imagen de promoción"}
              </div>
            </label>
          </div>
          <div style={{ flex: 1 }}>
            <div className="field flex flex-column">
              <label>Área</label>
              <InputText
                value={datos.area}
                placeholder="Ingresar área..."
                required
                onChange={handleChange}
              />
            </div>
            <div className="field flex flex-column">
              <label>Clinicas</label>
              <Dropdown
              placeholder="Seleccione clinica...." 
              options={clinicas.map((clinica) => ({
                label: clinica.nombre,  // Muestra el nombre
                value: clinica.id // Solo envía el ID
              }))} 
              onChange={handleLocalChange}
              value={datos.clinica_id}   
              required />
            </div>
            <div className="field flex flex-column">
              <label>Descuento</label>
              <InputText
              id='descuento'
              name='descuento'
              placeholder="Ingresar descuento..."
              value={datos.descuento} 
              onChange={handleChange}
              required />
            </div>
            <div className="field flex flex-column">
              <label>Descripción</label>
              <InputTextarea
                value={datos.descripcion}
                placeholder="Ingresar descripción..."
                required
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button label="Cancelar" style={{ marginRight: '10px' }} onClick={close} />
          <Button label="Guardar" onClick={handleSubmit}/>
        </div>
      </Dialog>
      </>
  )
}
