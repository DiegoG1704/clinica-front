import ClinicaSubLocalRepository from "../../../domain/repositories/ClinicaSubLocal/ClinicaSubLocal";
import ClinicaSubLocalMapper from "../../mappers/clinicaSubLocales/ClinicaSubLocalMapper";


export class ClinicaSubLocalesRepositoryImpl extends ClinicaSubLocalRepository {
    constructor(adapter) {
        super();
        this.adapter = adapter;
    }
    async fetchClinicas(idClinica) {
        try {
            const response = await this.adapter.get(`locales/clinica/${idClinica}`);
            return ClinicaSubLocalMapper.toDomainArray(response)
        } catch (error) {
            throw Error(error?.response?.data?.message)
        }
    }
    async createSubLocal(data) {
        try {
            const response = await this.adapter.post(`/CreateLocal`,data);
            return {success:true,data:response?.message}
        } catch (error) {
            return {success:false,error:error?.response?.data?.message}
        }
    }
    async updateSubLocal(data,id) {
        try {
            // const subLocal = ClinicaSubLocalMapper.toData(data)
            const response = await this.adapter.put(`/EditLocal/${id}`,data);
            return {success:true,data:response?.message}
        } catch (error) {
            console.error("sa",error)
            return {success:false,error:error?.response?.data?.message}
        }
    }
    async deleteSubLocal(id) {
        try {
            // const subLocal = ClinicaSubLocalMapper.toData(data)
            const response = await this.adapter.delete(`/Deletelocales/${id}`);
            return {success:true,data:response?.message}
        } catch (error) {
        
            return {success:false,error:{"message":error?.response?.data?.message}}
        }
    }

}
