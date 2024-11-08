import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ClinicaRepositoryImpl } from '../../../data/repositoires/clinica/ClinicaRepositoryImpl';
import { apiAdapter } from '../../../core/adapters/apiAdapter';
import GetAllClinicas from '../../../domain/useCases/clinica/getAllClinicas';
import ZodDniValidator from '../../../data/validators/user/ZodDniValidator';
import PersonaApiRepositoryImpl from '../../../data/repositoires/user/PersonaApiRepositoryImpl';
import FindDataByDoc from '../../../domain/useCases/user/FindDataByDoc';
import ZodGeneralDataValidatorImpl from '../../../data/validators/user/ZodGeneralDataValidator';
import VerifyGeneralData from '../../../domain/useCases/user/VerifyGeneralData';
import { apiPeruAdapter } from '../../../core/adapters/apiPeru';
import ZodRucValidator from '../../../data/validators/user/ZodRucValidator';
import FindDataByRUC from '../../../domain/useCases/user/FindDataByRUC';
import CreateClinica from '../../../domain/useCases/clinica/createClinica';
import ZodCreateClinicalValidator from '../../../data/validators/clinica/ZodCreateClinicaValidator';

import ValidateCreateClinica from '../../../domain/useCases/clinica/validateCreateClinica';
import VerifyUserData from '../../../domain/useCases/user/VerifyUserData';
import ZodUserAdminValidator from '../../../data/validators/user/ZodUserAdminValidator';
import ZodUserValidator from '../../../data/validators/user/ZodUserValidator';
import CreateUser from '../../../domain/useCases/user/CreateUser';
import UserRepositoryImpl from '../../../data/repositoires/user/UserRepositoryImpl';


// Crear el contexto
const ClinicaContext = createContext();

// Hook para acceder al contexto
export const useClinica = () => useContext(ClinicaContext);

// Proveedor del contexto
export const ClinicaProvider = ({ children }) => {
    const [clinicas, setClinicas] = useState([])

    const [clinica, setClinica] = useState({
        nombre: "",
        direccion: "",
        ruc: "",
        ubicacion: "",
        telefono: "",
    })
    const [clinicaAdministrador, setClinicaAdministrador] = useState({

        nombres: "",
        apellidos: "",
        dni: "",
        estadoCivil: "",
        fechNac: "",
        direccion: "",
        correo: "",
        contraseña: "",
        rol_id: 2,
        afiliadorId: null,
        clinicaId: null,
        confirmarContraseña: "",

    })
    const DocumentValidator = new ZodRucValidator()
    const PersonaApiRepository = new PersonaApiRepositoryImpl(apiPeruAdapter)
    const FindDataByDocUseCase = new FindDataByRUC(PersonaApiRepository, DocumentValidator)
    const verifyGeneralDataValidator = new ZodGeneralDataValidatorImpl()
    const verifyGeneralData = new VerifyGeneralData(verifyGeneralDataValidator)

    const ClinicaRepository = new ClinicaRepositoryImpl(apiAdapter)
    const getAllClinicasUseCase = new GetAllClinicas(ClinicaRepository)
    //createClinica
    const createClinicaValidator = new ZodCreateClinicalValidator()
    const createClinicaUseCase = new CreateClinica(ClinicaRepository, createClinicaValidator)
    const validateClinicaDataUseCase = new ValidateCreateClinica(createClinicaValidator)

    //Find DNI
    const DniValidator = new ZodDniValidator()
    const FindDataByDNIUseCase = new FindDataByDoc(PersonaApiRepository, DniValidator)

    //ValidateUser
    const userAdminValidator = new ZodUserAdminValidator()
    const verifyUserData = new VerifyUserData(userAdminValidator)
    // CreateUser
    const userRepository = new UserRepositoryImpl()
    const userValidatorUseCase = new ZodUserValidator()
    const createUserUseCase = new CreateUser(userRepository, userValidatorUseCase)


    //Function GetAllClinicas
    const getAllClinicas = async () => {
        const data = await getAllClinicasUseCase.execute()
        setClinicas(data)
    }
    //Funtion ChangeDataCLinica
    const handleChangeClinica = (e) => {
        setClinica({ ...clinica, [e.target.name]: e.target.value })
    }

    const handleChangeUserAdmin = (e) => {
        console.log("e", clinicaAdministrador)
        setClinicaAdministrador({ ...clinicaAdministrador, [e.target.name]: e.target.value })
    }

    const findDataByRuc = async () => {
        const response = await FindDataByDocUseCase.execute(clinica?.ruc)
        if (response?.success) {
            setClinica({ ...clinica, nombre: response?.data?.nombres, direccion: response?.data?.direccion })
        }
    }
    const createClinica =async () => {
        const response = await createClinicaUseCase.execute(clinica)
        console.log("dta", response)
        return response
    }
    const createUser = async() => {
        const response = await createUserUseCase.execute(clinicaAdministrador)
        return response

    }

    const validateClininicaData = () => {

        let response = validateClinicaDataUseCase.execute(clinica)
        return response
    }
    const findDataByDni = async () => {
        const response = await FindDataByDNIUseCase.execute(clinicaAdministrador?.dni)
        console.log("wwww", response)
        if (response?.success) {
            setClinicaAdministrador({ ...clinicaAdministrador, nombres: response?.data?.nombres, apellidos: response?.data?.apellidos })
        }
    }
    const [currentStep, setCurrentStep] = useState(0);

    const totalSteps = 3; // Total de paneles en el Stepper

    const goNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep((prev) => prev + 1);
            stepperRef.current.nextCallback();
        }
    };


    const goBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
            stepperRef.current.prevCallback();
        }
    };
    const stepperRef = useRef(null);

    const handleNextPanel = () => {
        const isValid = currentStep === 0 ? validateClininicaData() :
            currentStep === 1 ? validateAdminData() :
                validateUserData(); // Último paso

        if (isValid?.success && currentStep < 2) { // Solo avanza si no es el último paso
            goNext();
        }
        console.log("esta", isValid)
        return isValid;
    };

    const createClinicaWithAdmin = async () => {
        const dataClinica = await createClinica()
        if(dataClinica?.success){
            setClinicaAdministrador({...clinicaAdministrador,clinicaId:dataClinica?.data?.id})
            const dataUsuario = await createUser()
            return dataUsuario
        }else{
            return dataClinica
        }
        

    }


    const validateAdminData = () => {
        const response = verifyGeneralData.execute(clinicaAdministrador)
        console.log("xxx", response)
        return response
    }
    const validateUserData = () => {
        const response = verifyUserData.execute(clinicaAdministrador)
        return response
    }



    return (
        <ClinicaContext.Provider value={{
            clinicas, setClinicas,
            clinica, setClinica,
            getAllClinicas, handleChangeClinica,
            handleChangeUserAdmin
            , clinicaAdministrador,
            findDataByRuc,
            createClinica, setCurrentStep
            , goNext, goBack, stepperRef,
            totalSteps, currentStep,
            handleNextPanel, findDataByDni,
            validateAdminData,
            validateUserData

        }}>
            {children}
        </ClinicaContext.Provider>
    );
};
