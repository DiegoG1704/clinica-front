import { Divider } from 'primereact/divider';
import "./style/Configuraciones.css";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import photoDefault from "../../../img/photo-default.png";  // Imagen predeterminada
import fotoperfil from "../../../img/user.png";  // Imagen de usuario si no hay foto
import { useAuth } from '../../../context/AuthContext/AuthContext';
import { FileUpload } from 'primereact/fileupload';
import { useState } from 'react';  // Asegúrate de que useState esté importado
import axios from 'axios';  // Importar axios para las solicitudes HTTP
import { apiAdapter } from '../../../../core/adapters/apiAdapter';

export default function Configuraciones() {
  const { user, setUser } = useAuth();
  console.log("user", user);  // Imprimir 'user'
  console.log("setUser", setUser);   // Asegúrate de obtener tanto 'user' como 'setUser'
  const [selectedImage, setSelectedImage] = useState(null);  // Estado para la imagen seleccionada
  const [fotoPerfil, setFotoPerfil] = useState(user?.fotoPerfil);  // Estado local para la foto de perfil

  // Handler para subir la imagen
  // Handler para subir la imagen
const handleImageUpload = async ({ files }) => {
  const file = files[0];
  const formData = new FormData();
  formData.append('image', file);

  try {
    // Llamada a la API para subir la imagen
    const response = await apiAdapter.post(
      `Usuario/${user?.id}/uploadProfileImage`, 
      formData, 
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    // Asumiendo que la respuesta contiene la URL de la nueva foto de perfil
    const { fotoPerfil: newFotoPerfil } = response;
    if (typeof newFotoPerfil === 'string') {
      // Actualiza el estado local con la nueva foto
      setFotoPerfil(newFotoPerfil);  
      setSelectedImage(`http://localhost:4000/uploads/${newFotoPerfil}`);  // Actualiza la vista previa

      // Actualiza el estado global de 'user' con la nueva foto de perfil
      setUser(prevState => ({ 
        ...prevState, 
        fotoPerfil: newFotoPerfil 
      }));
    } else {
      console.error('El valor de fotoPerfil no es una cadena de texto:', newFotoPerfil);
    }
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
    <div className="container-page">
      <header>
        <h2 className='header__title'>Configuración de usuario</h2>
        <Divider />
      </header>
      <main className='flex justify-content-center'>
        <div className='container-card-config-user flex justify-content-between mt-6 gap-4'>
          <div className="user-profile flex flex-column align-items-center p-4" style={{ flexBasis: '30%', maxWidth: '300px' }}>
            <header className='flex flex-column align-items-center'>
              <div className="user-profile__image mb-3">
                {/* Mostrar la imagen seleccionada o la imagen de perfil predeterminada */}
                <img 
                  src={selectedImage || (fotoPerfil ? `http://localhost:4000/uploads/${fotoPerfil}` : photoDefault)} 
                  alt="Imagen de perfil" 
                  className='border-circle'
                />
                <FileUpload 
                  mode="basic" 
                  customUpload 
                  uploadHandler={handleImageUpload} 
                  accept="image/*"
                  maxFileSize={1000000}
                  onSelect={handleImageSelect}
                  onUpload={handleImageUploadReset}  // Restablecer la opción de seleccionar otra imagen
                  style={{ marginTop: '20px' }}
                />

              </div>
              <div className="user-profile__info text-center">
                <p className="user-profile__info__name">{user?.nombres}</p>
                <p className="user-profile__info__role">{user?.rolId}</p>
              </div>
            </header>

            <main className=''>
              <div className='flex justify-content-center'>
                <div className="user__profile__record flex gap-2 text-center">
                  <div className="user_profile__record__id">
                    <p>{user?.id}</p>
                    <p>ID</p>
                  </div>
                  <hr className='divider-vertical' />
                  <div className="user_profile__record__quantity-locals">
                    <p>20</p>
                    <p>Sub locales</p>
                  </div>
                </div>
              </div>

              <div className='mt-6'>
                <div className='flex justify-content-center'>
                  <Button label='Agregar sub local' className="btn-add-sub-local" />
                </div>

                <div className="mt-3 text-center">
                  <p className='local-name'>Sanna Chacarilla</p>
                </div>
              </div>
            </main>
          </div>

          {/* Columna derecha: Formulario */}
          <div className="user-form-profile p-4 flex-1">
            <header className='flex justify-content-between align-items-center mb-3'>
              <h2>Información general</h2>
              <div className='flex gap-2'>
                <Button label='Cancelar' className='user-form__btn-cancel' />
                <Button label='Guardar' className='user-form__btn-save' />
              </div>
            </header>
            <Divider />
            <main>
              <div className="user-form__general-info">
                <div className='flex gap-4'>
                  <div className="flex flex-column gap-2 flex-1">
                    <label htmlFor="username">Nombres</label>
                    <InputText value={user?.nombres} id="username" aria-describedby="username-help" />
                  </div>
                  <div className="flex flex-column gap-2 flex-1">
                    <label htmlFor="username">Apellidos</label>
                    <InputText value={user?.apellidos} id="username" aria-describedby="username-help" />
                  </div>
                </div>

                <div className="flex flex-column gap-2 mt-3">
                  <label htmlFor="cargo">Cargo</label>
                  <InputText value={user?.rolId} id="cargo" />
                </div>

                <div className="flex flex-column gap-2 mt-3">
                  <label htmlFor="email">Correo Electrónico</label>
                  <InputText value={user?.correo} id="email" />
                </div>
              </div>

              <div className='user-form__about mt-4'>
                <header>
                  <h2>Sobre mí</h2>
                </header>
                <Divider />
                <main>
                  <InputTextarea className='w-full' rows={5} placeholder="Añade algo sobre ti..." />
                </main>
              </div>
            </main>
          </div>
        </div>
      </main>
    </div>
  );
}
