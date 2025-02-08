
class DeleteClinica {
    constructor(subLocalRepository) {
        this.subLocalRepository = subLocalRepository;
    }
    async execute(id) {
        let dataResponse = { success: false, data: {}, error: [] }
            const response = await this.subLocalRepository.deleteClinica(id);
            dataResponse = { success: response?.success, data: response?.data, error: [response?.error] }    
        return dataResponse
    }
}

export default DeleteClinica 