import { Divider } from 'primereact/divider';
import "./style/Configuraciones.css";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import photoDefault from "../../../img/photo-default.png";  // Imagen predeterminada

import { useAuth } from '../../../context/AuthContext/AuthContext';
import { FileUpload } from 'primereact/fileupload';
import { useEffect, useState } from 'react';  // Asegúrate de que useState esté importado

import { apiAdapter } from '../../../../core/adapters/apiAdapter';
import ChangePassword from './Components/ChangePassword';

export default function Configuraciones() {
  const { user, setUser } = useAuth();
  const [visibleChangePassword,setVisibleChangePassword]=useState(false)
  console.log('user', user)
  const [selectedImage, setSelectedImage] = useState(user?.fotoPerfil ? `${process.env.REACT_APP_API_BASE_URL}uploads/${user.fotoPerfil}` : null);
  // Estado para la imagen seleccionada
  const [fotoPerfil, setFotoPerfil] = useState(user?.fotoPerfil);  // Estado local para la foto de perfil

  const [datos, setDatos] = useState({
    nombres: user?.nombres || '',  // Asegúrate de que siempre haya un valor (vacío por defecto)
    apellidos: user?.apellidos || '',  // Igual para apellidos
    correo: user?.correo || '',
  });

  useEffect(() => {
    if (user) {
      setDatos({
        nombres: user?.nombres || '',  // Asegura que los valores no sean undefined
        apellidos: user?.apellidos || '',
        correo: user?.correo || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSutmit = async () => {
    console.log('datos', datos)
  }
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
        setSelectedImage(`${process.env.REACT_APP_API_BASE_URL}uploads/${newFotoPerfil}`);  // Actualiza la vista previa

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

  const chooseOptions = {
    icon: 'pi pi-camera', // Cambia el ícono
    iconOnly: true,       // Elimina el texto, solo muestra el ícono
    className: 'edit-photo' // Clase CSS opcional para estilos adicionales
  };

  return (
    <div className="container-page">
      <header>
        <h2 className='header__title'>Configuraciones</h2>

      </header>
      <main className='flex justify-content-center'>
        <div className='container-card-config-user flex  flex-column justify-content-between gap-4'>
          <div className="user-profile flex flex-column align-items-center " >
            <header className='flex  justify-content-center align-items-center header-profile  flex-column'>
              <div className="user-profile__info text-center  ">
                <p className="user-profile__info__name">{user?.nombres}</p>
                <p className="user-profile__info__role mt-2">Usuario</p>
              </div>
              <div className="user-profile__image mb-3 ">
                {/* Mostrar la imagen seleccionada o la imagen de perfil predeterminada */}

                <div className='flex align-items-center flex-column relative '>
                  <img
                    src={selectedImage || (fotoPerfil ? fotoPerfil : photoDefault)}
                    alt="Imagen de perfil"
                    className='border-circle'
                  />

                  <FileUpload
                    mode="basic"
                    customUpload
                    uploadHandler={handleImageUpload}
                    accept="image/*"
                    className='edit-photo  absolute bottom-0 right-0'
                    maxFileSize={1000000}
                    onSelect={handleImageSelect}
                    onUpload={handleImageUploadReset}  // Restablecer la opción de seleccionar otra imagen
                    chooseOptions={chooseOptions}


                  />
                </div>


              </div>
              <div className="user-profile__info text-center  ">

                <p className="user-profile__info__role mt-2"> <span className='pi pi-map-marker'></span>{user?.direccion}</p>
              </div>

            </header>


          </div>

          {/* Columna derecha: Formulario */}
          <div className="user-form-profile p-4 flex-1">
            <header className='flex justify-content-between align-items-center mb-3'>
              <h2 className='title-general-info'>Información general</h2>
              <div className='flex gap-2'>
                <Button tooltip='Cambiar contraseña' icon="pi pi-key"  rounded  className='user-form__btn-cancel' onClick={()=>{setVisibleChangePassword(true)}} />
                <Button tooltip='Editar datos generales' icon=' pi pi-pencil'  className='user-form__btn-save'rounded  onClick={handleSutmit}  />
              </div>
            </header>

            <main>
              <div className="user-form__general-info">
                {/* <div className='flex gap-4'>
                  <div className="flex flex-column gap-2 flex-1">
                    <label htmlFor="username">Nombres</label>
                    <InputText
                      id="nombre"
                      name='nombre'
                      value={datos.nombres}
                      onChange={handleChange}
                      aria-describedby="username-help"
                      className='input-config'
                    />
                  </div>
                  <div className="flex flex-column gap-2 flex-1">
                    <label htmlFor="username">Apellidos</label>
                    <InputText
                      id="apellidos"
                      name='apellidos'
                      value={datos.apellidos}
                      onChange={handleChange}
                      aria-describedby="username-help"
                      className='input-config'
                    />
                  </div>
                </div>

                <div className="flex flex-column gap-2 mt-3">
                  <label htmlFor="cargo">Cargo</label>
                  <InputText value={user?.rolId} id="cargo"
                    className='input-config'
                  />
                </div>

                <div className="flex flex-column gap-2 mt-3">
                  <label htmlFor="email">Correo Electrónico</label>
                  <InputText
                    id="correo"
                    name='correo'
                    value={datos.correo}
                    onChange={handleChange}
                    className='input-config'
                  />
                </div> */}

                <div className='flex gap-4'>
                  <div className="flex flex-column gap-2 flex-1 general-info">
                    <label htmlFor="username"> <i className='pi pi-id-card general-info__icon'></i>Nombre Completo</label>
                    <p className='general-info__data'>{datos.nombres}{" "}{datos.apellidos}</p>

                  </div>
                  <div className="flex flex-column gap-2 flex-1 general-info">
                    <label htmlFor="cargo"><i className='pi pi-user general-info__icon'></i>Cargo</label>
                    <p className='general-info__data'>{user?.rolId}</p>
                  </div>
                </div>

                <div className="flex flex-column gap-2 mt-3 general-info">


                </div>

                <div className="flex flex-column gap-2 mt-3 general-info">
                  <label htmlFor="email"><i className='pi pi-user general-info__icon'></i>Correo Electrónico</label>
                  <p className='general-info__data'>{datos.correo}</p>

                </div>
              </div>


            </main>
          </div>
        </div>
      </main>
      <ChangePassword visibleChangePassword={visibleChangePassword} setVisibleChangePassword={()=>{setVisibleChangePassword(false)}}/>
    </div>
  );
}
