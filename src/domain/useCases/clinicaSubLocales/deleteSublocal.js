
class DeleteSubLocal {
    constructor(subLocalRepository) {
        this.subLocalRepository = subLocalRepository;
    }
    async execute(id) {
        let dataResponse = { success: false, data: {}, error: [] }
            const response = await this.subLocalRepository.deleteSubLocal(id);
            dataResponse = { success: response?.success, data: response?.data, error: [response?.error] }    
        return dataResponse
    }
}

export default DeleteSubLocal 