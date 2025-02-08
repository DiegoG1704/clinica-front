import PersonaApiRepository from "../../../domain/repositories/auth/PersonaApiRepository";
import PersonByRucMapper from "../../mappers/user/personaByRucMapper";
import PersonByDocumentMapper from "../../mappers/user/personByDocumentMapper";

export default class PersonaApiRepositoryImpl extends PersonaApiRepository {
    constructor(adapter) {
        super();
        this.adapter = adapter;
    }
    async consultarPorDNI(dni) {
        try {
            const response = await this.adapter.get(dni);
            if (response.estado) {
                
                return { success: true, data: PersonByDocumentMapper.toData(response?.resultado)}

            } else {
                return { success: false, error: { message: "RUC no encontrado" } }
            }

        } catch (error) {
            console.error('Error al consultar datos por DNI:', error);
            throw error;
        }
    }
    async consultarPorRUC(ruc) {
        let dataResponse = { data: "", success: false, error: {} }
        try {
            const response = await this.adapter.getRUC(ruc);
            if (response?.estado) {
                dataResponse = { success: true, data: PersonByRucMapper.toData(response?.resultado) }
            } else {
                dataResponse = { ...dataResponse, error: { message: "RUC no encontrado" } }
            }
            return dataResponse

        } catch (error) {
            console.error('Error al consultar datos por DNI:', error);
            throw error;
        }
    }
}