
class DeleteClinicaAdmin {
    constructor(SubAdminRepository) {
        this.SubAdminRepository = SubAdminRepository;
    }
    async execute(id) {
        let dataResponse = { success: false, data: {}, error: [] }
        let response = await this.SubAdminRepository.deleteUser(id);
        dataResponse = { success: response?.success, data: response?.data, error: [response?.error] }

        

        return dataResponse

    }
}

export default DeleteClinicaAdmin