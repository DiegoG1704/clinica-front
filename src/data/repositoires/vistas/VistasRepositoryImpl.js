import VistasRepository from "../../../domain/repositories/vistas/VistasRepository";

export default class VistaRepositoryImpl extends VistasRepository {
    constructor(adapter) {
        super();
        this.adapter = adapter;

    }
    async fetchVistas(id) {
        let response = { success: false, data: {}, error: [] }
        try {
            const vistasData = await this.adapter.get(`/Rutas/${id}`);
       
            response = { success: true, data:vistasData, error: [] }

        } catch (error) {
            response = { ...response, error: [error?.response?.message] }
        }
        return response

    }


}