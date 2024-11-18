import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Toast } from 'primereact/toast' // Importar el Toast
import React, { useRef, useState, useEffect } from 'react'
import { apiAdapter } from '../../../../core/adapters/apiAdapter'
import { useAuth } from '../../../context/AuthContext/AuthContext'

export default function CreatePromo({visible,close,recargar}) {
  const toast = useRef(null);
  const [clinicas, setClinicas] = useState([]);
  const { user } = useAuth();
    const [datos,setDatos]= useState({
        area:'',
        descuento:'',
        descripcion:'',
        clinica_id:user?.clinica_id
      })

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
      console.log('Datos Ingresados', datos);
      try {
        const response = await apiAdapter.post('CreatePromocion', datos);
        console.log('Datos ingresados', response);
  
        // Mostrar un Toast de éxito
        toast.current.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'La promoción se ha creado correctamente.',
          life: 3000 // Duración del Toast
        });
  
        // Limpiar los datos y cerrar el diálogo
        setDatos({
          area: '',
          descuento: '',
          descripcion: '',
          clinica_id: ''
        });
        close();
        recargar(); // Llamar a la función recargar después de crear la promoción
      } catch (error) {
        console.log('Problemas al crear la promoción', error);
  
        // Mostrar un Toast de error
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Hubo un problema al crear la promoción. Intenta nuevamente.',
          life: 3000 // Duración del Toast
        });
      }
    };
    const headerTemplate = () => {
      return (
          <div className='flex flex-row gap-2'>
              <span className="pi pi-building" style={{fontSize:"40px",fontWeight:"500",color:"#85C226"}}></span>
              <span style={{fontSize:"24px",fontWeight:"700"}}>Agregar nueva Promocion</span>
          </div>
      )
  }
  
  return (
    <>
    <Toast ref={toast} />
    <Dialog visible={visible} onHide={close} header={headerTemplate} style={{ width: '800px' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <div className="field flex flex-column">
              <label>Área</label>
              <InputText 
              id='area'
              name='area'
              placeholder="Ingresar área..." 
              value={datos.area}
              onChange={handleChange}
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
            {/* <div className="field flex flex-column">
              <label>Clinica</label>
              <Dropdown
              placeholder="Seleccione clinica...." 
              options={clinicas.map((clinica) => ({
                label: clinica.nombre,  // Muestra el nombre
                value: clinica.id // Solo envía el ID
              }))} 
              onChange={handleLocalChange}
              value={datos.clinica_id}   
              required />
            </div> */}
            <div className="field flex flex-column">
              <label>Descripción</label>
              <InputTextarea
              id='descripcion'
              name='descripcion'
              placeholder="Ingresar descripción..." 
              value={datos.descripcion}
              onChange={handleChange}
              required />
            </div>
            
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button 
          label="Cancelar" 
          style={{ backgroundColor: "#85C226", borderColor: "#85C226", height: "40px", borderRadius: "6px",margin:'5px' }}
          onClick={close} />
          <Button 
          label="Crear" 
          style={{ backgroundColor: "#85C226", borderColor: "#85C226", height: "40px", borderRadius: "6px",margin:'5px' }}
          onClick={handleSubmit}/>
        </div>
      </Dialog>
      </>
  )
}
