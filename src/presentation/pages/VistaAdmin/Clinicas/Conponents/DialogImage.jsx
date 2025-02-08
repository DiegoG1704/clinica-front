import React, { useState, useEffect, useRef } from 'react';
import fotoUser from '../../../../img/sinImg.png'; // Imagen por defecto si no hay foto
import { FileUpload } from 'primereact/fileupload'; // Componente de carga de archivos
import { Button } from 'primereact/button'; // Componente de botón
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast'; // Importar el componente Toast
import { apiAdapter } from '../../../../../core/adapters/apiAdapter';
import CustomDialog from '../../../../components/Dialog/CustomDialog';

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
    const handleCloseDialog = () => {
        close()
        setSelectedImage(null)
        setSelectedImageTipo(null)
    }
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

    const handleImageUpload = async () => {
        // Validar si ambas imágenes están seleccionadas y son archivos válidos
        if (
            !selectedImage ||
            !(selectedImage instanceof File) ||
            !selectedImageTipo ||
            !(selectedImageTipo instanceof File)
        ) {
            toast.current.show({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe seleccionar ambas imágenes válidas.',
                life: 3000,
            });
            return;
        }

        // Crear FormData
        const formData = new FormData();
        formData.append('ImagoTipo', selectedImage); // Imagen de perfil
        formData.append('IsoTipo', selectedImageTipo); // Imagen tipo

        try {
            // Realizar la llamada a la API
            const response = await apiAdapter.post(
                `Clinica/${datos?.id}/SubirImagenes`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            // Limpiar imágenes seleccionadas y mostrar éxito
            setSelectedImage(null);
            setSelectedImageTipo(null);

            toast.current.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Imágenes subidas con éxito',
                life: 3000,
            });
            recarga(); // Recargar datos
            close(); // Cerrar diálogo
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al subir las imágenes',
                life: 3000,
            });
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


    const footerTemplate = () => (<div style={{ marginTop: '20px', display: 'flex', justifyContent: 'end' }}>
        {/* Botón para subir las dos imágenes */}
        <Button
            style={{ margin: '5px', background: '#85C226', borderColor: '#85C226' }}
            label="Subir imágenes" onClick={handleImageUpload} />
        <Button
            style={{ margin: '5px', background: '#85C226', borderColor: '#85C226' }}
            label="Cerrar" onClick={handleCloseDialog} />
    </div>)

    return (
        <CustomDialog visible={visible} onhide={handleCloseDialog} footer={footerTemplate} title={"Subir imágenes"} iconClassName={"pi pi-camera"}>
            <Toast ref={toast} /> {/* Componente Toast */}
            <div className='flex p'>
                <div className='flex flex-column align-items-center' >
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
                        uploadHandler={() => { }} // No hace falta un manejador aquí, se sube con el botón
                        accept="image/*"
                        maxFileSize={1000000}
                        onSelect={handleImageSelect}
                        chooseLabel={imageName ? imageName : "Cargar ImagoTipo"} // Etiqueta personalizada con el nombre recortado
                    />
                </div>

                <div className='flex flex-column align-items-center' >
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
                    <div className='flex'>
                        <FileUpload
                            mode="basic"
                            customUpload
                            uploadHandler={() => { }} // No hace falta un manejador aquí, se sube con el botón
                            accept="image/*"
                            maxFileSize={1000000}
                            onSelect={handleImageSelectTipo}
                            chooseLabel={imageNameTipo ? imageNameTipo : "Cargar IsoTipo"} // Etiqueta personalizada con el nombre recortado
                        />
                    </div>

                </div>
            </div>



        </CustomDialog>
    );
}
