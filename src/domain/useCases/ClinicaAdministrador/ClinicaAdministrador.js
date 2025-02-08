
class GetAllSubAdministradores {
    constructor(SubAdminRepository) {
        this.SubAdminRepository = SubAdminRepository;
    }
    async execute(id) {
        let response = await this.SubAdminRepository.fetchUsers(id);
        return response
    }
}

export default GetAllSubAdministradores