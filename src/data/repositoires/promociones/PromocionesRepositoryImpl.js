import PromocionesRepository from "../../../domain/repositories/promociones/PromocionesRepository";
import { PromocionesMapper } from "../../mappers/promociones/promocionesMapper";

export class PromocionesRepositoryImpl extends PromocionesRepository {
    constructor(adapter) {
        super();
        this.adapter = adapter;
    }
    async fetchClinicas() {
        try {
            const response = await this.adapter.get('/getPromociones');
            return PromocionesMapper.toDomainArray(response)
        } catch (error) {
            throw Error(error?.response?.data?.message)
        }
    }
    

}
