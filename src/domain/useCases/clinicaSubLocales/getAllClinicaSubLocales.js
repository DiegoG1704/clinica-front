
class GetAllClinicaSubLocales {
    constructor(subLocalRepository) {
        this.subLocalRepository = subLocalRepository;
    }
    async execute(id) {
        console.log("shla")
        const subLocal = await this.subLocalRepository.fetchClinicas(id);
        console.log("las",subLocal)
        return { success: true, data: subLocal };
    }
}

export default GetAllClinicaSubLocales