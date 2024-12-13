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
import UpdateClinica from '../../../domain/useCases/clinica/updateClinica';
import ZodUpdateClinicalValidator from '../../../data/validators/clinica/ZodUpdateClinicaValidator';
import DeleteClinica from '../../../domain/useCases/clinica/deleteClinica';
import getUserByClinica from '../../../domain/useCases/user/GetUserByClinica';


// Crear el contexto
const ClinicaContext = createContext();

// Hook para acceder al contexto
export const useClinica = () => useContext(ClinicaContext);

// Proveedor del contexto
export const ClinicaProvider = ({ children }) => {
    const [clinicas, setClinicas] = useState([])
    const [visibleDialogCreate, setVisibleDialogCreate] = useState(false)
    const [editar, setEditar] = useState(false)
    const [clinica, setClinica] = useState({
        id: 0,
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
        telefono: "",

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
    const userRepository = new UserRepositoryImpl(apiAdapter)

    // const createUserUseCase = new CreateUser(userRepository, userAdminValidator)
    //update CLinica
    const updateValidator = new ZodUpdateClinicalValidator()
    const updateClinicaUseCase = new UpdateClinica(ClinicaRepository, updateValidator)
    const deleteClinica = new DeleteClinica(ClinicaRepository)

    //objects in clinica getUserByClinicaID

    const getUserByClinicaIdUseCase=new getUserByClinica(userRepository)
    const [currentUser,setCurrentUser]=useState({})


    //Delete CLinica
    const [visibleDelete, setVisibleDelete] = useState(false)
    const handleClickDeleteClinica=(rowData)=>{
        
        setClinica(rowData)
        setVisibleDelete(true)

    }

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
        
        console.log("daa",response)
        if (response?.success) {
            setClinica({ ...clinica, nombre: response?.data?.nombres, direccion: response?.data?.direccion,distrito:response?.data?.distrito })
        }
    }
    const createClinica = async () => {
        const response = await createClinicaUseCase.execute({ ...clinica, clinicaAdministrador })
        console.log("response", response)
        if (response?.success) {
            // setClinica({ ...clinica, id: response?.data })
            cleanData()
        }

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
    const handleNextPanel = async () => {
        let isValid;
        if (currentStep === 0) {
            isValid = validateClininicaData();
        } else if (currentStep === 1) {
            isValid = validateAdminData();
        } else {
            isValid = validateUserData(); // Último paso
        }
        console.log("cur", isValid)
        if (isValid?.success && currentStep < 3) { // Solo avanza si no es el último paso

            if (currentStep === 2) {
                // Llamamos a createClinicaWithAdmin después de la validación de usuario
                const result = await createClinicaWithAdmin();
                console.log("holaaasaasas", result)
                if (result?.success) {
                    // Si la creación de la clínica y el usuario fue exitosa, avanzar al siguiente paso
                    hideDialogCreate()
                    cleanData()
                    await getAllClinicas()

                }
                return result
            } else {
                goNext();
            }
        }

        return isValid;
    };

    const createClinicaWithAdmin = async () => {
        const dataClinica = await createClinica();
        return dataClinica
    };
    const updateClinica = async () => {
        const dataResponse = await updateClinicaUseCase.execute(clinica)
        if (dataResponse?.success == true) {
            setEditar(false)
            cleanDataClinica()
            await getAllClinicas()
        }
        return dataResponse

    }
    const handleClickEditClinica = (rowData) => {
        console.log("data", rowData)
        setClinica(rowData)
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
    const hideDialogCreate = () => {
        setVisibleDialogCreate(false)
    }
    const showDialogCreate = () => {
        setVisibleDialogCreate(true)
    }
    const cleanDataAdministrador = () => {
        setClinicaAdministrador({
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
            telefono: "",
        })
    }
    const cleanDataClinica = () => {
        setClinica({
            id: 0,
            nombre: "",
            direccion: "",
            ruc: "",
            ubicacion: "",
            telefono: "",
        })
    }
    const cleanData = () => {
        cleanDataAdministrador()
        cleanDataClinica()
        setCurrentStep(0)
    }
    const handleDeleteClinica = async () => {
        
        const response = await deleteClinica.execute(clinica?.id)
        if(response.success){
            await getAllClinicas()
        }
        return response
    }

    const closeEditar = () => {
        setEditar(false);
        cleanDataClinica()
    }
    const handleCLickAdminUser=async(id)=>{
        console.log("esta",id)
        const response=await getUserByClinicaIdUseCase.execute(id)
        console.log("esta es la respuesta",response)
        if(response?.success){
            setCurrentUser(response?.data)
        }
        

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
            validateUserData,
            visibleDialogCreate,
            setVisibleDialogCreate, hideDialogCreate,
            showDialogCreate,
            handleClickEditClinica,
            updateClinica,
            editar, setEditar,
            visibleDelete, setVisibleDelete,
            handleClickDeleteClinica,handleDeleteClinica,closeEditar,
            handleCLickAdminUser,currentUser,setCurrentUser

        }}>
            {children}
        </ClinicaContext.Provider>
    );
};
