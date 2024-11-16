
class GetAllVistas {
    constructor(VistaRepository) {
        this.vistaRepository = VistaRepository;
    }
    async execute(id) {
        return await this.vistaRepository.fetchVistas(id);
    }
}
export default GetAllVistas;
