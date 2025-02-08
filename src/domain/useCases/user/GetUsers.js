import UserRepository from "../../repositories/UserRepository";
class GetUsers {
    constructor(UserRepository) {
        this.userRepository = UserRepository;
    }

    async execute() {
        return await this.userRepository.fetchUsers();
    }
}

export default GetUsers;
