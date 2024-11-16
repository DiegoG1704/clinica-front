import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import CustomDialog from '../../../../components/Dialog/CustomDialog';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import ClinicaItem from './ClinicaStopperItems/ClinicaItem';
import "./CreateClinica.css"
import CreateAdmin from './CreateAdmin';
import CreateUsuario from './CreateUsuario';
import { Clinica } from '../../../../../domain/entities/Clinica';
import { useClinica } from '../../../../context/ClinicaContext/ClinicaContext';
import { Toast } from 'primereact/toast';
import { showToast, showToastWithErrors } from '../../../../utils/showToast';

export default function CreateClinica({ Next, onNext }) {
  const { currentStep,
    goBack, stepperRef, totalSteps
    , handleNextPanel, visibleDialogCreate, hideDialogCreate } = useClinica()

  const toast = useRef(null); // Para notificaciones

  const handleNext = async () => {
    const responseValidate = await handleNextPanel();
    console.log("response-error", responseValidate);
  
    if (responseValidate?.success === false) {
      showToastWithErrors("error", "Error al registrar", responseValidate?.error, toast);
    } else {
      if (responseValidate?.create === true) {
        console.log("Entro al toast", responseValidate?.create);
        toast.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Se ha creado la clínica correctamente',
          life: 3000
        });
      }
    }
  };
  const footerTemplate = () => {
    return (

      <div className="flex py-4  justify-content-between  w-full">
        {currentStep > 0 && (
          <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={goBack} />
        )}
        <Button
          label={currentStep === totalSteps - 1 ? "Finish" : "Next"}
          icon={currentStep === totalSteps - 1 ? "pi pi-check" : "pi pi-arrow-right"}
          iconPos="right"
          onClick={handleNext}
        />
      </div>
    )
  }


  return (
    <CustomDialog visible={visibleDialogCreate} title={"Crear Clínica"} iconClassName={"pi pi-building"} footer={footerTemplate} onhide={hideDialogCreate} width='700px' className="overflow-y-hidden" >
      <div className="card flex justify-content-center  ">
        <Toast ref={toast} />
        <Stepper style={{ flexBasis: '50rem' }} ref={stepperRef} className="" linear>

          <StepperPanel key="Clinica" headerPosition="bottom" header={"Clínica"} >
            {/* <CreateClinica
              Next={() => stepperRef.current.nextCallback()}
              onNext={handleDatos} // Pasa el id de la clínica aquí
            /> */}
            <ClinicaItem Next={() => stepperRef.current.nextCallback()}
            />
          </StepperPanel>

          <StepperPanel key="admin" header={"Administrador"} >
            <CreateAdmin

            // idClinica={idClinica}
            // onNext={handleDatosPer} // Asegúrate de pasar el idClinica y avanzar al siguiente paso
            />
          </StepperPanel>

          <StepperPanel header="Usuario" className="header-stepper"  >
            <CreateUsuario

            // DatosPer={datosPer}
            // Close={() => setVisible(false)} // Pasa los datos del administrador aquí si es necesario
            />
          </StepperPanel>

        </Stepper>
      </div>

    </CustomDialog>

  );
}
