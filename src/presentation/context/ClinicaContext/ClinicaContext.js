import { createContext, useContext, useEffect, useState } from 'react';
import { ClinicaRepositoryImpl } from '../../../data/repositoires/clinica/ClinicaRepositoryImpl';
import { apiAdapter } from '../../../core/adapters/apiAdapter';
import GetAllClinicas from '../../../domain/useCases/clinica/getAllClinicas';


// Crear el contexto
const ClinicaContext = createContext();

// Hook para acceder al contexto
export const useClinica = () => useContext(ClinicaContext);

// Proveedor del contexto
export const ClinicaProvider = ({ children }) => {
    const [clinicas, setClinicas] = useState([])
    const [clinica, setClinica] = useState({
    })

    const ClinicaRepository = new ClinicaRepositoryImpl(apiAdapter)
    const getAllClinicasUseCase = new GetAllClinicas(ClinicaRepository)

    const getAllClinicas =async () => {
        const data =await getAllClinicasUseCase.execute()
        setClinicas(data)
    }
   

    return (
        <ClinicaContext.Provider value={{ clinicas, setClinicas, clinica, setClinica, getAllClinicas }}>
            {children}
        </ClinicaContext.Provider>
    );
};
