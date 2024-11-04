
class UpdateSubLocal {
    constructor(subLocalRepository, subLocalValidator) {
        this.subLocalRepository = subLocalRepository;
        this.subLocalValidator = subLocalValidator
    }
    async execute(data,id) {
        let dataResponse = { success: false, data: {}, error: [] }
        let isValid = this.subLocalValidator.validateSubLocalData(data);
        if (isValid?.success) {
            
            const response = await this.subLocalRepository.updateSubLocal(data,id);
            console.log("valid",response)
            dataResponse = { success: response?.success, data: response?.data, error: [response?.error] }
        } else {
            console.log("res",isValid)
            dataResponse = { ...dataResponse, success: false, error: isValid?.errors }
        }
        return dataResponse
    }
}

export default UpdateSubLocal