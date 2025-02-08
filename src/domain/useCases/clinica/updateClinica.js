class UpdateClinica {
    constructor(clinicaRepository, clinicaValidator) {
        this.clinicaRepository = clinicaRepository;
        this.clinicaValidator = clinicaValidator;
    }
    async execute(data) {
        let dataResponse = { success: false, data: {}, error: [] }
        let isValid = this.clinicaValidator.validateClinicaData(data);
        console.log("vlaida",isValid)
        if (isValid?.success) {
            const response = await this.clinicaRepository.updateClinica(data);
            console.log("use-case",response)
            dataResponse = { success: response?.success, data: response?.data, error: [response?.error],update:true }
        } else {
            console.log("res",isValid)
            dataResponse = { ...dataResponse, success: false, error: isValid?.errors }
        }
        return dataResponse
    }
}

export default UpdateClinica