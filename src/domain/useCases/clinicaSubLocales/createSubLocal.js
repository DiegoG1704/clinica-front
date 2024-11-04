class CreateSubLocal {
    constructor(subLocalRepository, subLocalValidator) {
        this.subLocalRepository = subLocalRepository;
        this.subLocalValidator = subLocalValidator
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

export default CreateSubLocal 