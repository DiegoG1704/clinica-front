import { Divider } from 'primereact/divider';
import "./style/Configuraciones.css";
import { Button } from 'primereact/button';
import photoDefault from "../../../img/photo-default.png"; 
import { useAuth } from '../../../context/AuthContext/AuthContext';
import { useEffect, useRef, useState } from 'react'; 
import ChangePassword from './Components/ChangePassword';
import { useConfiguracionPloc } from '../../../context/ConfiguracionContext/ConfiguracionContext';
import { usePlocState } from '../../../hooks/ploc/usePlocState';
import { Toast } from 'primereact/toast';
import { showToast, showToastWithErrors } from '../../../utils/showToast';
import EditProfile from './Components/EditProfile';
import ConfirmacionCorreo from './Components/ConfirmacionCorreo';
import { SelectButton } from 'primereact/selectbutton';
import ChangePhoto from './Components/ChangePhoto/ChangePhoto';

export default function Configuraciones() {
  const [visibleDialogPhoto, setVisibleDialogPhoto] = useState(false)
  const { user, setUser, getUser } = useAuth();
  const toast = useRef(null)

  const ploc = useConfiguracionPloc()
  const state = usePlocState(ploc)

  const [confirmar, setConfirmar] = useState(false)
  const [selectedImage, setSelectedImage] = useState(user?.fotoPerfil ? `${process.env.REACT_APP_API_BASE_URL}uploads/${user.fotoPerfil}` : null);
  // Estado para la imagen seleccionada
  const [fotoPerfil, setFotoPerfil] = useState(user?.fotoPerfil);  // Estado local para la foto de perfil

  const [datos, setDatos] = useState({
    nombres: user?.nombres || '',  // Asegúrate de que siempre haya un valor (vacío por defecto)
    apellidos: user?.apellidos || '',  // Igual para apellidos
    correo: user?.correo || '',
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    if (user) {
      setDatos({
        nombres: user?.nombres || '',  // Asegura que los valores no sean undefined
        apellidos: user?.apellidos || '',
        correo: user?.correo || ''
      });
    }
  }, [user]);


  // Handler para subir la imagen
  const handleImageUpload = async (file) => {
    const response = await ploc?.updatePhoto(user?.id, file)
    if (response?.success) {
      showToast("success", "Foto perfil actualizada", "Se ha actualizado la foto perfil correctamente", toast)
      setUser(prevState => ({
        ...prevState,
        fotoPerfil: response?.data
      }));
      setSelectedImage(`${process.env.REACT_APP_API_BASE_URL}uploads/${response?.data}`);
      

    } else {
      showToast("error", "Error al actulizar", "Hubo un error al actualizar la foto perfil", toast)
    }
    return response
  };

  const handleChangePassword = async () => {
    const response = await ploc.changePassword(user?.id);
    if (!response.success) {
      showToastWithErrors("error", "Error al actualizar", response?.error, toast)
    } else {
      showToast("success", "Actulizado correctamente", "Se ha actualizado su contraseña correctamente", toast)
      ploc.hideDialogChangePassword()
    }
  }
  const openDialogEditPhoto = () => {
    setVisibleDialogPhoto(true)
    setImage(`${process.env.REACT_APP_API_BASE_URL}uploads/${user.fotoPerfil}`)
  }

  return (
    <div className="container-page">
      <Toast ref={toast} />
      <div className={` container-module`}>
        <header className="flex">
          <div className="flex-1 py-2 gap-0">
            <h1 className='header__title'>Configuracion de Perfil</h1>
          </div>
        </header>


        <main className='flex justify-content-center profile '>
          <div className='container-card-config-user flex sm:flex-column lg:flex-row   justify-content-between gap-4  flex-1 p-3'>
            <div className="user-profile flex flex-column align-items-center px-2  lg:w-4" >
              <header className='flex  justify-content-center align-items-center header-profile  flex-column'>

                <div className="user-profile__image mb-3 relative ">
                  {/* Mostrar la imagen seleccionada o la imagen de perfil predeterminada */}
                  <div className='user-profile-shadow'></div>
                  <div className='flex align-items-center flex-column relative  '>
                    <img
                      src={selectedImage || (fotoPerfil ? fotoPerfil : photoDefault)}
                      alt="Imagen de perfil"
                      className='border-circle'
                    />
                    <span className='edit-photo  absolute bottom-0 right-0' onClick={openDialogEditPhoto}><i className='pi pi-camera ' style={{ marginLeft: "10px", marginTop: "8px" }}></i></span>

                  </div>
                </div>
                <div className="user-profile__info text-center  ">
                  <p className="user-profile__info__name">{user?.nombres}</p>
                  <p className="user-profile__info__role mt-2">{user?.rol}</p>
                </div>
                <div className="user-profile__info text-center  ">
                  <p className="user-profile__info__address mt-2"> <span className='pi pi-map-marker'></span>{user?.direccion}</p>
                </div>
                <div className="user-profile__container-action-button">
                  <SelectButton options={state?.configListSection} className='user-profile__action-button' value={ploc.state?.configSectionIndexActive} optionValue='id' onChange={(e) => { ploc?.handleChangeSectionIndex(e.value) }} />
                </div>
              </header>
            </div>

            {state?.configSectionIndexActive == 1 ? (
              <div className="user-form-profile p-4 flex flex-column lg:w-8">
                <header className='mb-3'>
                  <div className='flex justify-content-between align-items-center '>
                    <h2 className='title-general-info'>Información Personal</h2>
                    <div className='flex gap-2'>
                      <Button className='user-form__btn-save' onClick={() => { ploc.openDialogGeneralInfo(user) }} ><span>Editar</span></Button>

                    </div>
                  </div>
                  <Divider />

                </header>


                <main className='h-full'>
                  <div className="user-form__general-info h-full  ">
                    <div className='flex flex-column  h-full'>
                      <div className="flex flex-column gap-2 flex-1 general-info ">

                        <div className="flex align-items-center  py-2 general-info__row">
                          <div>
                            <i className='pi pi-id-card general-info__icon '></i>
                          </div>
                          <div>
                            <label htmlFor="username"> Nombre Completo</label>
                            <p className='general-info__data'>{datos.nombres}{" "}{datos.apellidos}</p>
                          </div>
                        </div>

                      </div>
                      <div className="flex flex-column gap-2 flex-1 general-info">
                        <div className="flex general-info__row py-2">
                          <div className="flex align-items-center">
                            <div><i className='pi pi-building general-info__icon'></i></div>
                          </div>
                          <div>
                            <label htmlFor="cargo">Cargo</label>
                            <p className='general-info__data'>{user?.rol}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-column gap-2 flex-1 general-info">
                        <div className="flex general-info__row py-2">
                          <div className="flex align-items-center">
                            <i className='pi pi-envelope general-info__icon'></i>
                          </div>
                          <div>
                            <label htmlFor="username"> Correo</label>
                            <div className='flex'>
                              <p className='general-info__data'>{user?.correo}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-column gap-2 flex-1 general-info">
                        <div className="flex general-info__row py-2">
                          <div className="flex align-items-center">
                            <i className='pi pi-phone general-info__icon'></i>
                          </div>
                          <div>
                            <label htmlFor="cargo">Télefono</label>
                            <p className='general-info__data'>{user?.telefono}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                  </div>
                </main>
              </div>
            ) : (<div className="user-form-password p-4 flex flex-column lg:w-8">
              <header className='mb-3'>
                <div className='flex justify-content-between align-items-center '>
                  <h2 className='title-general-info'>Seguridad de la Cuenta</h2>
                  <div className='flex gap-2'>
                    <Button className='user-form__btn-save' onClick={ploc.showDialogChangePassword} ><span>Cambiar Contraseña</span></Button>

                  </div>
                </div>
                <Divider />

              </header>
              <main >
                <div className="user-form__general-info">
                  <div className='flex flex-column  '>
                    <div className="flex flex-column gap-2  general-info ">

                      <div className="flex align-items-center  py-2 general-info__row">
                        <div>
                          <i className='pi pi-lock general-info__icon '></i>
                        </div>
                        <div>
                          <label htmlFor="username"> Contraseña</label>
                          <p className='general-info__data'>Última actualización hace -</p>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
                <div>


                </div>


              </main>
            </div>)}


          </div>
        </main>

      </div>

      <ChangePassword visibleChangePassword={state?.visibleDialogChangePassword}
        setVisibleChangePassword={ploc.hideDialogChangePassword}
        showDialogChangePassword={ploc.showDialogChangePassword}
        handleChangeData={ploc.handlechange}
        changePassword={handleChangePassword}
      />
      <EditProfile
        user={user}
        getUser={getUser}
      >

      </EditProfile>
      <ConfirmacionCorreo
        Cerrar={() => setConfirmar(false)}
        Abrir={confirmar}
      />
      <ChangePhoto fnUpdatePhoto={handleImageUpload} visible={visibleDialogPhoto} setVisible={setVisibleDialogPhoto} image={image} setImage={setImage} />
    </div>
  );
}
