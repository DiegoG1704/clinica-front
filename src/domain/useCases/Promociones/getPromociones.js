
class GetAllPromociones {
    constructor(promocionesRepository) {
        this.promocionesRepository = promocionesRepository;
    }
    async execute() {
        const promociones = await this.promocionesRepository.fetchClinicasy();
        return { success: true, data: promociones };
    }
}

export default GetAllPromociones