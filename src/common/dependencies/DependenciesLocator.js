import { apiAdapter } from "../../core/adapters/apiAdapter";
import { ClinicaSubLocalesRepositoryImpl } from "../../data/repositoires/clinicaSubLocales/ClinicaSubLocalesRepositoryImpl";
import { PromocionesRepositoryImpl } from "../../data/repositoires/promociones/PromocionesRepositoryImpl";
import ZodCreateSubLocalValidator from "../../data/validators/subLocal/ZodSubLocalValidator";
import GetAllPromociones from "../../domain/useCases/clinica/getAllClinicas";
import CreateSubLocal from "../../domain/useCases/clinicaSubLocales/createSubLocal";
import DeleteSubLocal from "../../domain/useCases/clinicaSubLocales/deleteSublocal";
import GetAllClinicaSubLocales from "../../domain/useCases/clinicaSubLocales/getAllClinicaSubLocales";
import UpdateSubLocal from "../../domain/useCases/clinicaSubLocales/updateSubLocal";
import { PromocionesPloc } from "../../presentation/ploc/Promociones/ploc/PromocionesPloc";
import { SubLocalPloc } from "../../presentation/ploc/SubLocal/SubLocalPloc";




function providePromocionesPloc(){
    const PromocionesRepository=new PromocionesRepositoryImpl(apiAdapter)
    const getPromocionesUseCase=new GetAllPromociones(PromocionesRepository)
    const PromocionPloc = new PromocionesPloc (
        getPromocionesUseCase
    );
    return PromocionPloc;
}
function provideLocalesPloc(clinica_id){
    const SubLocalValidator=new ZodCreateSubLocalValidator()
    const SubLocalRepository=new ClinicaSubLocalesRepositoryImpl(apiAdapter)
    const getSubLocalUseCase=new GetAllClinicaSubLocales(SubLocalRepository)
    const createSubLocalUseCase=new CreateSubLocal(SubLocalRepository,SubLocalValidator)
    const updateSubLocalUseCase=new UpdateSubLocal(SubLocalRepository,SubLocalValidator)
    const deleteSubLocalUseCase=new DeleteSubLocal(SubLocalRepository)

    const subLocalPloc = new SubLocalPloc(
        getSubLocalUseCase,
        createSubLocalUseCase,
        updateSubLocalUseCase,
        deleteSubLocalUseCase

    );
    return subLocalPloc;
}


export const dependenciesLocator = {
    providePromocionesPloc,
    provideLocalesPloc
};