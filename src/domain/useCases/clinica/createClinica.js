class CreateClinica {
    constructor(clinicaRepository, clinicaValidator) {
        this.clinicaRepository = clinicaRepository;
        this.clinicaValidator = clinicaValidator;
    }
    async execute(data) {
        let dataResponse = { success: false, data: {}, error: [] }
        let isValid = this.clinicaValidator.validateClinicaData(data);
        if (isValid?.success) {
            const response = await this.clinicaRepository.createClinica(data);
            dataResponse = { success: response?.success, data: response?.data, error: [response?.error] }
        } else {
            console.log("res",isValid)
            dataResponse = { ...dataResponse, success: false, error: isValid?.error }
        }
        return dataResponse
    }
}

export default CreateClinica