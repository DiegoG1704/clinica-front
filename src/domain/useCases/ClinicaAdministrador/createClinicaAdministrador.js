class CreateClinicaAdmin {
    constructor(createClinicaAdminRepository, clinicaAdminValidator) {
        this.createClinicaAdminRepository = createClinicaAdminRepository;
        this.clinicaAdminValidator = clinicaAdminValidator;
    }
    async execute(data) {
        let dataResponse = { success: false, data: {}, error: [] }
        let isValid = this.subLocalValidator.validateSubLocalData(data);
        if (isValid?.success) {
            const response = await this.subLocalRepository.createSubLocal(data);
            
            dataResponse = { success: response?.success, data: response?.data, error: [response?.error] }
        } else {
            console.log("res",isValid)
            dataResponse = { ...dataResponse, success: false, error: isValid?.error }
        }
        return dataResponse
    }
}

export default CreateClinicaAdmin