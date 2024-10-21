// src/domain/useCases/CreateUser.js
import UserRepositoryImpl from "../../../data/repositoires/user/UserRepositoryImpl";

class CreateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(user) {
        return await this.userRepository.createUser(user);
    }
}

export default CreateUser;
