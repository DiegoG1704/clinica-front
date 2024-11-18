import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Toast } from 'primereact/toast'
import React, { useRef, useState, useEffect } from 'react'
import { apiAdapter } from '../../../../core/adapters/apiAdapter'
import { Dropdown } from 'primereact/dropdown'
import fotoUser from '../../../img/photo-default.png'
import ImgPromo from './ImgPromo'
import { useAuth } from '../../../context/AuthContext/AuthContext'

export default function EditarPromo({ visible, close, recarga, datos1, datos2 }) {
  const toast = useRef(null)
  const [clinicas, setClinicas] = useState([])
  const { user } = useAuth();
  const [datos, setDatos] = useState({
    area: '',
    descuento: '',
    descripcion: '',
    clinica_id: user?.clinica_id
  })
  
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null)  // Almacena la imagen seleccionada

  useEffect(() => {
    if (datos1) {
      setDatos({
        ...datos,
        ...datos1, // Asegúrate de que editData no tenga valores undefined
      })
    }
  }, [datos1])

  const handleChange = (e) => {
    const { name, value } = e.target
    setDatos({ ...datos, [name]: value })
  }

  const handleLocalChange = (e) => {
    setDatos({ ...datos, clinica_id: e.value }) // Guardar solo el id del local
  }

  useEffect(() => {
    const fetchClinicas = async () => {
      try {
        const response = await apiAdapter.get('listaClinicas')
        setClinicas(response)
      } catch (error) {
        console.error('Error fetching clinic data:', error)
      }
    }

    fetchClinicas()
  }, [])

  const handleSubmit = async () => {
    console.log('Datos ingresados:', datos)

    const dataToSend = {
      ...datos,
      imagen: imagenSeleccionada  // Solo enviar la imagen seleccionada cuando se haga el submit
    }

    try {
      // Subir imagen solo si se seleccionó una
      if (imagenSeleccionada) {
        const formData = new FormData()
        formData.append('imagen', imagenSeleccionada)

        const imageResponse = await apiAdapter.post(
          `Promociones/${datos1.id}/uploadProfileImage`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        console.log('Imagen subida con éxito:', imageResponse)
      }

      // Luego, actualizamos la promoción
      const response = await apiAdapter.put(`editPromocion/${datos1.id}`, dataToSend)
      console.log('Respuesta de la API:', response)

      toast.current.show({
        severity: 'success',
        summary: 'Éxito',
        detail: 'La promoción se ha actualizado correctamente.',
        life: 3000,
      })

      setDatos({
        area: '',
        descuento: '',
        descripcion: '',
        clinica_id: ''
      })
      setImagenSeleccionada(null)  // Limpiar la imagen seleccionada
      close()
      recarga()
    } catch (error) {
      console.log('Error:', error)
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Hubo un problema al actualizar la promoción. Intenta nuevamente.',
        life: 3000,
      })
    }
  }

  const headerTemplate = () => {
    return (
      <div className='flex flex-row gap-2'>
        <span className="pi pi-building" style={{ fontSize: "40px", fontWeight: "500", color: "#85C226" }}></span>
        <span style={{ fontSize: "24px", fontWeight: "700" }}>Editar Promocion</span>
      </div>
    )
  }

  return (
    <>
      <Toast ref={toast} />
      <Dialog visible={visible} onHide={close} header={headerTemplate} style={{ width: '800px' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '20px' }}>
            <ImgPromo 
              datos={datos1} 
              Actualizar={recarga} 
              setImagenSeleccionada={setImagenSeleccionada}  // Pasamos la función para actualizar la imagen seleccionada
            />
          </div>
          <div style={{ flex: 1 }}>
            <div className="field flex flex-column">
              <label>Área</label>
              <InputText
                id='area'
                name='area'
                value={datos.area}
                placeholder="Ingresar área..."
                required
                onChange={handleChange}
              />
            </div>
            {/* <div className="field flex flex-column">
              <label>Clinicas</label>
              <Dropdown
                id='id'
                name='id'
                placeholder="Seleccione clinica...."
                options={clinicas.map((clinica) => ({
                  label: clinica.nombre,
                  value: clinica.id
                }))}
                onChange={handleLocalChange}
                value={datos.clinica_id}
                required
              />
            </div> */}
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
                id='descripcion'
                name='descripcion'
                value={datos.descripcion}
                placeholder="Ingresar descripción..."
                required
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button
            label="Cancelar"
            style={{ backgroundColor: "#85C226", borderColor: "#85C226", height: "40px", borderRadius: "6px", margin: '5px' }}
            onClick={close} />
          <Button
            label="Guardar"
            style={{ backgroundColor: "#85C226", borderColor: "#85C226", height: "40px", borderRadius: "6px", margin: '5px' }}
            onClick={handleSubmit} />
        </div>
      </Dialog>
    </>
  )
}
