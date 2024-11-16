class ValidateCreateClinica {
    constructor(clinicaValidator) {
            
        this.clinicaValidator = clinicaValidator;
    }
    execute(data) {
        let dataResponse = { success: false, data: {}, error: [] }
        let isValid = this.clinicaValidator.validateClinicaData(data);
        console.log("clinica-validator",isValid)
        if (isValid?.success) {
            dataResponse = { success: true }
        } else {
            dataResponse = { ...dataResponse, success: false, error: isValid?.errors }
        }
        return dataResponse
    }
}

export default ValidateCreateClinica