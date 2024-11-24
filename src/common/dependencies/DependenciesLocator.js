import { apiAdapter } from "../../core/adapters/apiAdapter";
import { ClinicaRepositoryImpl } from "../../data/repositoires/clinica/ClinicaRepositoryImpl";
import { ClinicaSubLocalesRepositoryImpl } from "../../data/repositoires/clinicaSubLocales/ClinicaSubLocalesRepositoryImpl";
import { PromocionesRepositoryImpl } from "../../data/repositoires/promociones/PromocionesRepositoryImpl";
import ZodSelectFileValidator from "../../data/validators/promociones/ZodSelectFile";
import ZodCreateSubLocalValidator from "../../data/validators/subLocal/ZodSubLocalValidator";
import GetAllClinicas from "../../domain/useCases/clinica/getAllClinicas";
import GetAllPromociones from "../../domain/useCases/clinica/getAllClinicas";
import UploadTarifario from "../../domain/useCases/clinica/uploadTarifa";
import CreateSubLocal from "../../domain/useCases/clinicaSubLocales/createSubLocal";
import DeleteSubLocal from "../../domain/useCases/clinicaSubLocales/deleteSublocal";
import GetAllClinicaSubLocales from "../../domain/useCases/clinicaSubLocales/getAllClinicaSubLocales";
import UpdateSubLocal from "../../domain/useCases/clinicaSubLocales/updateSubLocal";
import ValidateFilePromocion from "../../domain/useCases/Promociones/validateFilePromocion";
import { ClinicaPloc } from "../../presentation/ploc/Clinica/ClinicaPloc";

import { PromocionesPloc } from "../../presentation/ploc/Promociones/ploc/PromocionesPloc";
import { SubLocalPloc } from "../../presentation/ploc/SubLocal/SubLocalPloc";




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
    const uploadTarifarioUseCase = new UploadTarifario(ClinicaRepository,validateFilePromocion)
    const Clinica = new ClinicaPloc(
        getAllClinicasUseCase,
        uploadTarifarioUseCase

    );
    return Clinica;
}
const clinicaProvide = provideClinicaPloc();

export const dependenciesLocator = {
    clinicaProvide,
    providePromocionesPloc: () => providePromocionesPloc(clinicaProvide),
    provideLocalesPloc
};