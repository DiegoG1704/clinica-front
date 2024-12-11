import { apiAdapter } from "../../core/adapters/apiAdapter";
import { ClinicaRepositoryImpl } from "../../data/repositoires/clinica/ClinicaRepositoryImpl";
import { ClinicaSubLocalesRepositoryImpl } from "../../data/repositoires/clinicaSubLocales/ClinicaSubLocalesRepositoryImpl";
import { PromocionesRepositoryImpl } from "../../data/repositoires/promociones/PromocionesRepositoryImpl";
import UserRepositoryImpl from "../../data/repositoires/user/UserRepositoryImpl";
import ZodSelectFileValidator from "../../data/validators/promociones/ZodSelectFile";
import ZodCreateSubLocalValidator from "../../data/validators/subLocal/ZodSubLocalValidator";
import ZodValidateChangePassword from "../../data/validators/user/ZodValidateChangePassword";
import GetAllClinicas from "../../domain/useCases/clinica/getAllClinicas";
import GetAllPromociones from "../../domain/useCases/clinica/getAllClinicas";
import UploadTarifario from "../../domain/useCases/clinica/uploadTarifa";
import CreateSubLocal from "../../domain/useCases/clinicaSubLocales/createSubLocal";
import DeleteSubLocal from "../../domain/useCases/clinicaSubLocales/deleteSublocal";
import GetAllClinicaSubLocales from "../../domain/useCases/clinicaSubLocales/getAllClinicaSubLocales";
import UpdateSubLocal from "../../domain/useCases/clinicaSubLocales/updateSubLocal";
import ValidateFilePromocion from "../../domain/useCases/Promociones/validateFilePromocion";
import { changePassword } from "../../domain/useCases/user/ChangePassword";
import { ClinicaPloc } from "../../presentation/ploc/Clinica/ClinicaPloc";
import { ConfiguracionPloc } from "../../presentation/ploc/Configuracion/ConfiguracionPloc";

import { PromocionesPloc } from "../../presentation/ploc/Promociones/ploc/PromocionesPloc";
import { SubLocalPloc } from "../../presentation/ploc/SubLocal/SubLocalPloc";
import { SubAdminPloc } from "../../presentation/ploc/SubAdministradores/SubAdministradorPloc";
import createSubAdmin from "../../domain/useCases/user/CreateSubAdmin";
import ZodSubAdminValidator from "../../data/validators/user/SubAdministrador/ZodSubAdminValidator";
import GetAllSubAdministradores from "../../domain/useCases/ClinicaAdministrador/ClinicaAdministrador";
import ClinicaSubAdministradorRepositoryImpl from "../../data/repositoires/clinicaSubAdministrador/clinicaSubAdministradorRepositoryImpl";
import ZodDniValidator from "../../data/validators/user/ZodDniValidator";
import PersonaApiRepositoryImpl from "../../data/repositoires/user/PersonaApiRepositoryImpl";
import FindDataByDoc from "../../domain/useCases/user/FindDataByDoc";
import { apiPeruAdapter } from "../../core/adapters/apiPeru";
import UpdateClinicaAdmin from "../../domain/useCases/ClinicaAdministrador/updateClinicaAdministrador";
import ZodUpdateSubAdminValidator from "../../data/validators/user/SubAdministrador/ZodUpdateSubAdminValidator";
import DeleteClinicaAdminUseCase from "../../domain/useCases/ClinicaAdministrador/DeleteClinicaAdministrador";
import DeleteClinicaAdmin from "../../domain/useCases/ClinicaAdministrador/DeleteClinicaAdministrador";
import UpdateGeneralData from "../../domain/useCases/user/UpdateGeneralData";
import ZodChangeGeneralInfo from "../../data/validators/user/ZodChangeGeneralInfo";






function providePromocionesPloc(ClinicaPloc) {
    const PromocionesRepository = new PromocionesRepositoryImpl(apiAdapter)
    const getPromocionesUseCase = new GetAllPromociones(PromocionesRepository)
    const validateFilePromocion = new ZodSelectFileValidator()
    const validateFilePromocionUseCase = new ValidateFilePromocion(validateFilePromocion)

    const PromocionPloc = new PromocionesPloc(
        getPromocionesUseCase,
        ClinicaPloc?.getClinicaUseCase,
        validateFilePromocionUseCase,
        ClinicaPloc?.uploadTarifarioUseCase
    );
    return PromocionPloc;
}
function provideLocalesPloc(clinica_id) {
    const SubLocalValidator = new ZodCreateSubLocalValidator()
    const SubLocalRepository = new ClinicaSubLocalesRepositoryImpl(apiAdapter)
    const getSubLocalUseCase = new GetAllClinicaSubLocales(SubLocalRepository)
    const createSubLocalUseCase = new CreateSubLocal(SubLocalRepository, SubLocalValidator)
    const updateSubLocalUseCase = new UpdateSubLocal(SubLocalRepository, SubLocalValidator)
    const deleteSubLocalUseCase = new DeleteSubLocal(SubLocalRepository)

    const subLocalPloc = new SubLocalPloc(
        getSubLocalUseCase,
        createSubLocalUseCase,
        updateSubLocalUseCase,
        deleteSubLocalUseCase

    );
    return subLocalPloc;
}
function provideClinicaPloc() {
    const ClinicaRepository = new ClinicaRepositoryImpl(apiAdapter)
    const getAllClinicasUseCase = new GetAllClinicas(ClinicaRepository)
    const validateFilePromocion = new ZodSelectFileValidator()
    const uploadTarifarioUseCase = new UploadTarifario(ClinicaRepository, validateFilePromocion)
    const Clinica = new ClinicaPloc(
        getAllClinicasUseCase,
        uploadTarifarioUseCase

    );
    return Clinica;
}
function provideUserPloc() {
    const userRepository = new UserRepositoryImpl(apiAdapter)
    const DocumentValidator = new ZodDniValidator()
    const PersonaApiRepository = new PersonaApiRepositoryImpl(apiPeruAdapter)
    const FindDataByDocUseCase = new FindDataByDoc(PersonaApiRepository, DocumentValidator)
    return {userRepository,FindDataByDocUseCase}
}
function provideConfiguracionPloc(userRepository) {
    const changePasswordValidator = new ZodValidateChangePassword()
    const changePasswordUseCase = new changePassword(userRepository, changePasswordValidator)
    const changeGeneralDataValidator= new ZodChangeGeneralInfo()
    const updateGeneralDataUseCase=new UpdateGeneralData(userRepository,changeGeneralDataValidator)
    const configuracion = new ConfiguracionPloc(changePasswordUseCase,updateGeneralDataUseCase)

    return configuracion

}
function provideSubAdminPloc(provideLocales,FindDataByDoc) {
    const subAdminValidator = new ZodSubAdminValidator();
    const SubAdminRepository= new ClinicaSubAdministradorRepositoryImpl(apiAdapter);
    const updateSubAdminValidator=new  ZodUpdateSubAdminValidator()
    const createSubAdminUseCase = new createSubAdmin(SubAdminRepository, subAdminValidator);
    const getAllSubAdminUseCase=new GetAllSubAdministradores(SubAdminRepository);
    const UpdateClinicaAdminUseCase=new UpdateClinicaAdmin(SubAdminRepository,updateSubAdminValidator)
    const DeleteClinicaAdminUseCase= new  DeleteClinicaAdmin(SubAdminRepository)
    const subAdmin = new SubAdminPloc(getAllSubAdminUseCase,createSubAdminUseCase,provideLocales?.getLocalUseCase,FindDataByDoc, UpdateClinicaAdminUseCase,DeleteClinicaAdminUseCase)


    return subAdmin

}

const clinicaProvide = provideClinicaPloc();
const userProvide = provideUserPloc();
const localProvides=provideLocalesPloc();

export const dependenciesLocator = {
    clinicaProvide,
    providePromocionesPloc: () => providePromocionesPloc(clinicaProvide),
    provideLocalesPloc,
    provideUserPloc,
    provideConfiguracionPloc: () => provideConfiguracionPloc(userProvide?.userRepository),
    provideSubAdminPloc: () => provideSubAdminPloc(localProvides,userProvide?.FindDataByDocUseCase)
};