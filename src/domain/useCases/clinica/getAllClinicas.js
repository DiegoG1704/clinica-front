
class GetAllClinicas {
    constructor(clinicaRepository) {
        this.clinicaRepository = clinicaRepository;
    }
    async execute() {
        return this.clinicaRepository.fetchClinicas();
    }
}

export default GetAllClinicas