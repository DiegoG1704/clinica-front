import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import React, { useEffect, useRef, useState } from 'react'
import ClinicasList from './Conponents/ClinicasList'
import { useClinica } from '../../../context/ClinicaContext/ClinicaContext'
import { Dialog } from 'primereact/dialog'
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import CreateClinica from './Conponents/CreateClinica'
import CreateAdmin from './Conponents/CreateAdmin'
import CreateUsuario from './Conponents/CreateUsuario'
import CustomDialog from '../../../components/Dialog/CustomDialog'

const ClinicaPage = () => {
    const { clinicas, getAllClinicas,
      showDialogCreate } = useClinica();
    useEffect(() => {
      getAllClinicas();
    }, []);
    
    const [visible, setVisible] = useState(false);
    const [idClinica, setIdClinica] = useState(null);
    const [datosPer, setDatosPer] = useState(null);
    const stepperRef = useRef(null);
  
    const handleDatos = (idClinica) => {
        setIdClinica(idClinica); 
      };
      
  
    const handleDatosPer = (userData) => {
      setDatosPer(userData);
    };
  
    return (
      <div>
        <div>
          <header className="flex">
            <div className="flex-1 p-2">
              <h1>Lista de Clínicas</h1>
              <Divider />
            </div>
            <div className="flex justify-content-end align-items-center">
              <Button
                label="Añadir clínica"
                style={{ backgroundColor: "#85C226", borderColor: "#85C226", height: "60px", borderRadius: "6px" }}
                icon="pi pi-plus"
                onClick={showDialogCreate}
              />
            </div>
          </header>
  
          <main>
            <ClinicasList data={clinicas} />
            <CreateClinica/>
            
          </main>
          
        </div>
        
  
        {/* <CustomDialog visible={visible} onHide={() => setVisible(false)} header="Crear Clínica" style={{ width: '600px' }}>

          // <div className="card flex justify-content-center">
          //   <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
          //     <StepperPanel header="Clínica">
          //       <CreateClinica
          //         Next={() => stepperRef.current.nextCallback()}
          //         onNext={handleDatos} // Pasa el id de la clínica aquí
          //       />
          //     </StepperPanel>
  
          //     <StepperPanel header="Administrador">
          //       <CreateAdmin
          //         Next={() => stepperRef.current.nextCallback()}
          //         Prev={() => stepperRef.current.prevCallback()}
          //         idClinica={idClinica}
          //         onNext={handleDatosPer} // Asegúrate de pasar el idClinica y avanzar al siguiente paso
          //       />
          //     </StepperPanel>
  
          //     <StepperPanel header="Usuario">
          //       <CreateUsuario
          //         Prev={() => stepperRef.current.prevCallback()}
          //         DatosPer={datosPer}
          //         Close={() => setVisible(false)} // Pasa los datos del administrador aquí si es necesario
          //       />
          //     </StepperPanel>
          //   </Stepper>
          // </div>
        </CustomDialog> */}
      </div>
    );
  };
  
  export default ClinicaPage;
  
