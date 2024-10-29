import ClinicaRepository from "../../../domain/repositories/clinica/ClinicaRepository";
import ClinicaMapper from "../../mappers/clinica/ClinicaMapper";


export class ClinicaRepositoryImpl extends ClinicaRepository {
    constructor(adapter) {
        super();
        this.adapter = adapter;
    }
    async fetchClinicas() {
        try {
            const response = await this.adapter.get('/listaClinicas');
            return ClinicaMapper.toDomainArray(response)
        } catch (error) {
            throw Error(error?.response?.data?.message)
        }
    }

}
