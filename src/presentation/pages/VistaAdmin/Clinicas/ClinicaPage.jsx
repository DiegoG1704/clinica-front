import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import React, { useEffect, } from 'react'
import ClinicasList from './Conponents/ClinicasList'
import { useClinica } from '../../../context/ClinicaContext/ClinicaContext'

import CreateClinica from './Conponents/CreateClinica'
import styles from "@/presentation/features/admin/admin-general/clinica/pages/main/styles/ClinicaPage.module.css"


const ClinicaPage = () => {
  const { clinicas, getAllClinicas,
    showDialogCreate } = useClinica();
  useEffect(() => {
    getAllClinicas();
  }, []);



  return (
    <div>
      <div>
        <header className={`flex header-module`}>
          <div className="flex-1 py-2 gap-0">
            <h1 className={"title-module "}>Lista de Clínicas</h1>
            <p className={"description-module "}>Gestiona y administra tus centros médicos</p>
            {/* <Divider /> */}
          </div>
          <div className="flex justify-content-end align-items-center">
            <Button
              label="Añadir clínica"
              icon="pi pi-plus"
              onClick={showDialogCreate}
              className={`${styles?.["button-create"]} `}
            />
          </div>
        </header>

        <main>
          <ClinicasList data={clinicas} />
          <CreateClinica />

        </main>

      </div>

    </div>
  );
};

export default ClinicaPage;

