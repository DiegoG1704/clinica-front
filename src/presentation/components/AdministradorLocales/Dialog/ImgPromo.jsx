import React, { useState, useEffect } from 'react';
import fotoUser from '../../../img/photo-default.png'; // Imagen por defecto si no hay foto
import { FileUpload } from 'primereact/fileupload'; // Componente de carga de archivos
import { Button } from 'primereact/button'; // Componente de botón
import { apiAdapter } from '../../../../core/adapters/apiAdapter'; // Adaptador de API

export default function ImgPromo({ datos }) {
    console.log('user',datos)
    // Estados locales para manejar la imagen seleccionada, carga y éxito
    const [selectedImage, setSelectedImage] = useState(null);  // Estado para la imagen seleccionada
    const [fotoPerfil, setFotoPerfil] = useState(datos?.imagen);  // Estado local para la foto de perfil
  
    // Handler para subir la imagen
    // Handler para subir la imagen
    const handleImageUpload = async ({ files }) => {
        const file = files[0];  // Seleccionamos el archivo
        if (!file) {
          console.error("No se ha seleccionado ningún archivo.");
          return;
        }
      
        const formData = new FormData();
        formData.append('imagen', file);  // Agregar el archivo al formData
      
        // Mostrar el contenido de formData para depuración
        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value);  // Esto debería mostrar 'image' y el archivo
        }
      
        try {
          const response = await apiAdapter.post(
            `Promociones/${datos?.id}/uploadProfileImage`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',  // Especifica que es multipart
              },
            }
          );
      
          // Aquí puedes manejar la respuesta, si la imagen se subió con éxito
          console.log('Imagen subida con éxito:', response);
        } catch (error) {
          console.error('Error al subir la imagen:', error);
        }
      };
      
  
  
    // Handler para seleccionar la imagen antes de cargarla (solo para vista previa)
    // Handler para seleccionar la imagen antes de cargarla (solo para vista previa)
  const handleImageSelect = (e) => {
    const file = e.files && e.files[0];  // Asegúrate de que files no esté vacío
    if (file && file instanceof Blob) {  // Verificar que el archivo sea del tipo Blob
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);  // Establece la URL de la imagen en base64 para la vista previa
      };
      reader.readAsDataURL(file);
    } else {
      console.error("El archivo seleccionado no es válido o no es del tipo Blob.");
    }
  };
  
  // Restaura el valor de selectedImage al cargar la nueva imagen
  const handleImageUploadReset = () => {
    setSelectedImage(null);  // Resetea la vista previa
  };
    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
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
                    textAlign: 'center',
                    position: 'relative',
                }}
            >
                {/* Mostrar la imagen de perfil o una imagen predeterminada */}
                <img 
                    src={selectedImage || (fotoPerfil ? `http://localhost:4000/uploads/${fotoPerfil}` : fotoUser)} 
                    alt="Imagen de perfil" 
                    className="border-circle"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',  // Asegura que la imagen se ajuste correctamente
                    }}
                />
            </div>
            
            {/* Componente de carga de imagen */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '5px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                }}
            >
                <FileUpload
                    mode="basic"
                    customUpload
                    uploadHandler={handleImageUpload}  // Manejador de la subida de la imagen
                    accept="image/*"  // Solo archivos de imagen
                    maxFileSize={1000000}  // Tamaño máximo de archivo (1MB)
                    onSelect={handleImageSelect}  // Maneja la selección del archivo
                    onUpload={handleImageUploadReset}  // Resetea el estado de la carga
                    chooseLabel="Seleccionar imagen"  // Etiqueta del botón
                />
            </div>
        </div>
    );
}
