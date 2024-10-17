
import { Divider } from 'primereact/divider';
import "./style/Configuraciones.css"
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';


export default function Configuraciones() {
  return (
    <div className="container-page">
      <header>
        <h2 className='header__title'>Configuración de usuario</h2>
        <Divider />
      </header>
      <main className=' flex justify-content-center'>
        <div className='container-card-config-user flex justify-content-between mt-6 gap-4'>
          <div className="user-profile flex flex-column align-items-center p-4" style={{ flexBasis: '30%', maxWidth: '300px' }}>
            <header className='flex flex-column align-items-center'>
              <div className="user-profile__image mb-3">
                <img
                  src='https://s3-alpha-sig.figma.com/img/11db/cb98/2f9ba115c7d5cc790cc48a457815fb67?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FZ4KhdPL8nKP7G5HcZN4qrbPbCUzHx7jbnrKR6~ykQjnEsYbdKukovguNKj8n7hvJbuMRv5WxKsPLQNQf3erYOIqPdFTSf~v2SN3i3tldPgu4F~f5ubIrwr3dzCAlYjloqww4x5URAnIBxPU7U-Uys9PDuoX7XyegRiapbrXI8stnmL44Z-SESrfWYCV3UXvyBNg7mKEZe58Vt3NfdrSJ2roFrJ4VVVjRv8LloQJnfjDni-4BEb0EACRY5GIsRfjNjJQ-T7rfjGWykeyeu~Za8N9ewg1lugNtmyQVQ3LgokxrTZwb8sg1mIIuC6mI-lr5XIeyD4sWWMuAhthcT-Ffg__'
                  className='border-circle'

                />
              </div>
              <div className="user-profile__info text-center">
                <p className="user-profile__info__name">Rosa Montecarlo</p>
                <p className="user-profile__info__role">Administrador local</p>
              </div>
            </header>

            <main className=''>
              <div className='flex justify-content-center '>
                <div className="user__profile__record flex gap-2 text-center ">
                  <div className="user_profile__record__id">
                    <p>004</p>
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
                    <InputText id="username" aria-describedby="username-help" />
                  </div>
                  <div className="flex flex-column gap-2 flex-1">
                    <label htmlFor="username">Apellidos</label>
                    <InputText id="username" aria-describedby="username-help" />
                  </div>
                </div>

                <div className="flex flex-column gap-2 mt-3">
                  <label htmlFor="cargo">Cargo</label>
                  <InputText id="cargo" />
                </div>

                <div className="flex flex-column gap-2 mt-3">
                  <label htmlFor="email">Correo Electrónico</label>
                  <InputText id="email" />
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
        {/* Columna izquierda: Perfil de usuario */}

      </main>
      


    </div>
  )
}
