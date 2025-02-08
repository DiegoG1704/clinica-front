
class GetAllClinicas {
    constructor(clinicaRepository) {
        this.clinicaRepository = clinicaRepository;
    }
    async execute() {
        let response = await this.clinicaRepository.fetchClinicas();
        return response

    }
}

export default GetAllClinicas