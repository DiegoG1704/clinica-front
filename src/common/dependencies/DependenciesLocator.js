import { apiAdapter } from "../../core/adapters/apiAdapter";
import { PromocionesRepositoryImpl } from "../../data/repositoires/promociones/PromocionesRepositoryImpl";
import GetAllPromociones from "../../domain/useCases/clinica/getAllClinicas";
import { PromocionesPloc } from "../../presentation/ploc/Promociones/ploc/PromocionesPloc";

function providePromocionesPloc(){
    const PromocionesRepository=new PromocionesRepositoryImpl(apiAdapter)
    const getPromocionesUseCase=new GetAllPromociones(PromocionesRepository)
    const PromocionPloc = new PromocionesPloc (
        getPromocionesUseCase
    );
    return PromocionPloc;
}

export const dependenciesLocator = {
    providePromocionesPloc
};