class UpdateClinicaAdmin {
    constructor(ClinicaAdminRepository, clinicaAdminValidator) {
        this.ClinicaAdminRepository= ClinicaAdminRepository;
        this.clinicaAdminValidator = clinicaAdminValidator;
    }
    async execute(id,data) {
        let dataResponse = { success: false, data: {}, error: [] }
        console.log("data",id,data)
        let isValid = this.clinicaAdminValidator.validateUserData(data);
        if (isValid?.success) {
            const response = await this.ClinicaAdminRepository.updateUser(data,id);
            
            dataResponse = { success: response?.success, data: response?.data, error: [response?.error] }
        } else {
            console.log("res",isValid)
            dataResponse = { ...dataResponse, success: false, error: isValid?.errors }
        }
        return dataResponse
    }
}

export default UpdateClinicaAdmin