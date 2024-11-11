import React, { useState } from 'react';
import fotoUser from '../../../../img/photo-default.png'; // Imagen por defecto si no hay foto
import { FileUpload } from 'primereact/fileupload'; // Componente de carga de archivos
import { Button } from 'primereact/button'; // Componente de botón
import { Dialog } from 'primereact/dialog';
import { apiAdapter } from '../../../../../core/adapters/apiAdapter';

export default function DialogImage({ visible, close, recarga, datos }) {
    console.log('datos', datos);

    const [selectedImage, setSelectedImage] = useState(null);  // Estado para la imagen seleccionada
    const [selectedImageTipo, setSelectedImageTipo] = useState(null);  // Estado para la imagen tipo seleccionada
    const [fotoPerfil, setFotoPerfil] = useState(datos?.logo);  // Foto de perfil
    const [fotoPerfilTipo, setFotoPerfilTipo] = useState(datos?.imagenTipo);  // Foto de tipo
    const [imageName, setImageName] = useState("");  // Estado para almacenar el nombre de la imagen (recortado)
    const [imageNameTipo, setImageNameTipo] = useState("");  // Estado para almacenar el nombre de la imagen tipo (recortado)

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

            console.log('Imagenes subidas con éxito:', response);
            // Aquí puedes hacer algo después de la carga, como recargar la página o cerrar el diálogo
            recarga();
            close();  // Cerrar el diálogo
        } catch (error) {
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

    return (
        <Dialog visible={visible} onHide={close} header={'Subir imágenes'}>
            <div style={{ display: 'inline-block', marginRight: '20px' }}>
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
                        src={createObjectURLIfFile(selectedImage) || (fotoPerfil ? `${fotoPerfil}` : fotoUser)}
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
                    chooseLabel={imageName ? imageName : "Seleccionar imagen de perfil"} // Etiqueta personalizada con el nombre recortado
                />
            </div>

            <div style={{ display: 'inline-block' }}>
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
                        src={createObjectURLIfFile(selectedImageTipo) || (fotoPerfilTipo ? `${fotoPerfilTipo}` : fotoUser)}
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
                    chooseLabel={imageNameTipo ? imageNameTipo : "Seleccionar imagen tipo"} // Etiqueta personalizada con el nombre recortado
                />
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                {/* Botón para subir las dos imágenes */}
                <Button label="Subir imágenes" onClick={handleImageUpload} />
            </div>
        </Dialog>
    );
}
