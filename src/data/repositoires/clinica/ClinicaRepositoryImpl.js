import ClinicaRepository from "../../../domain/repositories/clinica/ClinicaRepository";
import ClinicaAdminMapper from "../../mappers/clinica/ClinicaAdminMapper";
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
    async createClinica(data) {
        try {
            const dataClinica = ClinicaAdminMapper.toData(data)
            console.log("ee", dataClinica)
            const response = await this.adapter.post('/crearUsuarioYClinica', dataClinica);
            return { success: true }
        } catch (error) {
            console.log("err", error?.response?.data?.message)
            return { success: false, error: { message: error?.response?.data?.message } }
        }

    }
    async updateClinica(data) {

        try {
            const dataClinica = ClinicaAdminMapper.toUpdateData(data)
            console.log("ee", dataClinica)
            const response = await this.adapter.put(`/editClinica/${dataClinica?.id}`, dataClinica);
            return { success: true }
        } catch (error) {
            console.log("err", error?.response?.data?.message)
            return { success: false, error: { message: error?.response?.data?.message } }
        }

    }
    async deleteClinica(id) {

        try {
            const response = await this.adapter.delete(`/deleteclinica/${id}`);
            return { success: true }
        } catch (error) {
            console.log("err", error?.response?.data?.message)
            return { success: false, error: { message: error?.response?.data?.message } }
        }
    }

}
