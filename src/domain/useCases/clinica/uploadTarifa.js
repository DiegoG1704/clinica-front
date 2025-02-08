class UploadTarifario {
    constructor(clinicaRepository, clinicaValidator) {
        this.clinicaRepository = clinicaRepository;
        this.clinicaValidator = clinicaValidator;
    }
    async execute(data) {
        console.log("enreeee",data)
        let dataResponse = { success: false, data: {}, error: [] }
        let isValid = this.clinicaValidator.validateFileData(data);
        console.log("enreeee",isValid)
        if (isValid?.success) {
            const response = await this.clinicaRepository.uploadTarifario(data);
            dataResponse = { success: response?.success, data: response?.data, error: [response?.error],update:true }
        } else {
            console.log("res",isValid)
            dataResponse = { ...dataResponse, success: false, error: isValid?.errors }
        }
        return dataResponse
    }
}

export default  UploadTarifario