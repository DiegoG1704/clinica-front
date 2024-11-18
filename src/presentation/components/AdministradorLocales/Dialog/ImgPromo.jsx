import React, { useState, useEffect, useRef } from 'react';
import { FileUpload } from 'primereact/fileupload'; // Componente de carga de archivos
import { Toast } from 'primereact/toast'; // Componente Toast de PrimeReact
import { apiAdapter } from '../../../../core/adapters/apiAdapter'; // Adaptador de API
import fotoUser from '../../../img/photo-default.png'; // Imagen por defecto si no hay foto

export default function ImgPromo({ datos, Actualizar, setImagenSeleccionada }) {
    const toast = useRef(null); // Referencia para el Toast
    const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen seleccionada
    const [fotoPerfil, setFotoPerfil] = useState(datos?.imagen); // Foto de perfil actual

    const handleImageSelect = (e) => {
        const file = e.files && e.files[0];  // Asegúrate de que files no esté vacío

        if (file && file instanceof Blob) {
            const fileType = file.type.split('/')[0];  // Extraemos el tipo (image/video/etc.)

            if (fileType === 'image') {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImagenSeleccionada(file);  // Actualizamos el estado con la imagen seleccionada
                };
                reader.readAsDataURL(file);
            } else {
                // Si no es una imagen, mostrar un mensaje de error
                toast.current.show({ severity: 'error', summary: 'Tipo de archivo inválido', detail: 'Por favor, selecciona una imagen.', life: 3000 });
            }
        }
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <Toast ref={toast} />
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
                }}
            >
                <img
                    src={
                        selectedImage
                        || (fotoPerfil
                            ? `${process.env.REACT_APP_API_BASE_URL || ''}uploads/${fotoPerfil}`
                            : fotoUser)
                    } // Usar imagen predeterminada si no hay imagen cargada
                    alt="Imagen de promoción"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
            <FileUpload
                mode="basic"
                name="file"
                accept="image/*"
                customUpload
                onSelect={handleImageSelect}  // Usamos la función para manejar la selección de imágenes
                chooseLabel="Seleccionar Imagen"
                uploadHandler={() => { }}  // No subimos la imagen automáticamente
            />
        </div>
    );
}
