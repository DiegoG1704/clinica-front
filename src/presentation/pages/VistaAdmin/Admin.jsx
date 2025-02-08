
import { TabPanel, TabView } from 'primereact/tabview';
import React from 'react';
import ListAfiliados from './ListaGeneral/ListAfiliados';
import ListFamiliares from './ListaGeneral/ListFamiliares';

export default function Admin() {

  return (
    <>
      <TabView>
        <TabPanel header="Lista de Usuarios">
          <ListAfiliados/>
        </TabPanel>
        <TabPanel header="Lista de Familiares">
          <ListFamiliares/>
        </TabPanel>
    </TabView>

    </>
  );
}
