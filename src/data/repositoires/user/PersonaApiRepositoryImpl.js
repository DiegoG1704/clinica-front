import PersonaApiRepository from "../../../domain/repositories/auth/PersonaApiRepository";
import PersonByDocumentMapper from "../../mappers/user/personByDocumentMapper";

export default class PersonaApiRepositoryImpl extends PersonaApiRepository{
    constructor(adapter) {
        super();
        this.adapter = adapter;
    }
    async consultarPorDNI(dni) {
        try {
            const response = await this.adapter.get(dni);
            if (response.success) {
                return PersonByDocumentMapper.toData(response)
            }else{
                throw new  Error(response?.message)
            }
            
        } catch (error) {
            console.error('Error al consultar datos por DNI:', error);
            throw error;
        }
    }
}