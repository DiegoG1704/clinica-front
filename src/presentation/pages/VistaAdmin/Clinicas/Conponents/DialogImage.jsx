import React, { useState, useEffect, useRef } from 'react';
import fotoUser from '../../../../img/sinImg.png'; // Imagen por defecto si no hay foto
import { FileUpload } from 'primereact/fileupload'; // Componente de carga de archivos
import { Button } from 'primereact/button'; // Componente de botón
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast'; // Importar el componente Toast
import { apiAdapter } from '../../../../../core/adapters/apiAdapter';

export default function DialogImage({ visible, close, recarga, datos }) {
    const [selectedImage, setSelectedImage] = useState(null);  // Estado para la imagen seleccionada
    const [selectedImageTipo, setSelectedImageTipo] = useState(null);  // Estado para la imagen tipo seleccionada
    const [fotoPerfil, setFotoPerfil] = useState(datos?.logo);  // Foto de perfil desde los datos
    const [fotoPerfilTipo, setFotoPerfilTipo] = useState(datos?.imagenTipo);  // Foto de tipo desde los datos
    const [imageName, setImageName] = useState("");  // Estado para almacenar el nombre de la imagen (recortado)
    const [imageNameTipo, setImageNameTipo] = useState("");  // Estado para almacenar el nombre de la imagen tipo (recortado)

    const toast = useRef(null); // Crear referencia para el Toast

    // Efecto para actualizar las imágenes cada vez que los datos cambien
    useEffect(() => {
        if (datos) {
            setFotoPerfil(datos.logo);
            setFotoPerfilTipo(datos.imagenTipo);
        }
    }, [datos]);

    // Función para seleccionar la imagen de perfil (vista previa)
    const handleImageSelect = (e) => {
        const file = e.files && e.files[0];
        if (file && file instanceof Blob) {
            setSelectedImage(file); // Guardamos el archivo real

            // Extraemos el nombre del archivo y recortamos a los primeros 10 caracteres
            const name = file.name;
            setImageName(name.length > 10 ? name.substring(0, 10) : name);  // Recorta el nombre a 10 caracteres
        } else {
            console.error("El archivo seleccionado no es válido.");
        }
    };

    // Función para seleccionar la imagen de tipo (vista previa)
    const handleImageSelectTipo = (e) => {
        const file = e.files && e.files[0];
        if (file && file instanceof Blob) {
            setSelectedImageTipo(file); // Guardamos el archivo real

            // Extraemos el nombre del archivo y recortamos a los primeros 10 caracteres
            const name = file.name;
            setImageNameTipo(name.length > 10 ? name.substring(0, 10) : name);  // Recorta el nombre a 10 caracteres
        } else {
            console.error("El archivo seleccionado no es válido.");
        }
    };

    // Subir ambas imágenes con un solo botón
    const handleImageUpload = async () => {
        const formData = new FormData();

        // Añadir ambas imágenes al formData
        if (selectedImage) {
            formData.append('ImagoTipo', selectedImage);  // Imagen de perfil
        }
        if (selectedImageTipo) {
            formData.append('IsoTipo', selectedImageTipo);  // Imagen tipo
        }

        try {
            // Realiza la llamada a la API para subir ambas imágenes
            const response = await apiAdapter.post(
                `Clinica/${datos?.id}/SubirImagenes`, // Endpoint para subir ambas imágenes
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Especifica que es multipart
                    },
                }
            );

            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Imágenes subidas con éxito', life: 3000 }); // Mostrar Toast de éxito
            recarga(); // Recargar la página o los datos
            close();  // Cerrar el diálogo
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al subir las imágenes', life: 3000 }); // Mostrar Toast de error
            console.error('Error al subir las imágenes:', error);
        }
    };

    // Función para generar una URL para la vista previa solo si el archivo existe
    const createObjectURLIfFile = (file) => {
        if (file && file instanceof Blob) {
            return URL.createObjectURL(file);
        } else {
            return null;
        }
    };

    const headerTemplate = () => {
        return (
            <div className='flex flex-row gap-2'>
                <span className="pi pi-building" style={{fontSize:"40px",fontWeight:"500",color:"#85C226"}}></span>
                <span style={{fontSize:"24px",fontWeight:"700"}}>Subir imágenes</span>
            </div>
        )
    }

    return (
        <Dialog visible={visible} onHide={close} header={headerTemplate}>
            <Toast ref={toast} /> {/* Componente Toast */}

            <div style={{ display: 'inline-block', margin: '10px',textAlign:'center' }}>
                {/* Imagen de perfil */}
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
                        src={createObjectURLIfFile(selectedImage) || fotoPerfil || fotoUser}
                        alt="Imagen de perfil"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </div>
                <FileUpload
                    mode="basic"
                    customUpload
                    uploadHandler={() => {}} // No hace falta un manejador aquí, se sube con el botón
                    accept="image/*"
                    maxFileSize={1000000}
                    onSelect={handleImageSelect}
                    chooseLabel={imageName ? imageName : "Cargar ImagoTipo"} // Etiqueta personalizada con el nombre recortado
                />
            </div>

            <div style={{ display: 'inline-block',textAlign:'center',margin:'10px' }}>
                {/* Imagen tipo */}
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
                        src={createObjectURLIfFile(selectedImageTipo) || fotoPerfilTipo || fotoUser}
                        alt="Imagen tipo"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </div>
                <FileUpload
                    mode="basic"
                    customUpload
                    uploadHandler={() => {}} // No hace falta un manejador aquí, se sube con el botón
                    accept="image/*"
                    maxFileSize={1000000}
                    onSelect={handleImageSelectTipo}
                    chooseLabel={imageNameTipo ? imageNameTipo : "Cargar IsoTipo"} // Etiqueta personalizada con el nombre recortado
                />
            </div>

            <div style={{marginTop: '20px',display:'flex',justifyContent:'end' }}>
                {/* Botón para subir las dos imágenes */}
                <Button 
                style={{margin:'5px',background:'#85C226',borderColor:'#85C226'}}
                label="Subir imágenes" onClick={handleImageUpload} />
                <Button
                style={{margin:'5px',background:'#85C226',borderColor:'#85C226'}}
                label="Cerrar" onClick={close} />
            </div>
        </Dialog>
    );
}
