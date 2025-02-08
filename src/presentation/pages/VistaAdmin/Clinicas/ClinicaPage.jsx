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
import { history } from '../../../utils/history'

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

      </div>
    );
  };
  
  export default ClinicaPage;
  
