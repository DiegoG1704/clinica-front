// src/data/repositories/UserRepositoryImpl.js
import { UserRepository } from '../../../domain/repositories/UserRepository';
import UserMapper from '../../mappers/UserMapper';


class UserRepositoryImpl extends UserRepository {
    constructor(adapter) {
        super();
        this.adapter = adapter;
    }

    async fetchUsers() {
        const usersData = await this.adapter.get('/users');
        return usersData.map(UserMapper.toDomain); // Convierte los datos a entidades de User
    }

    async createUser(user) {
        const userData = UserMapper.toData(user); // Convierte el User a formato de datos
        const createdUserData = await this.adapter.post('CreateUsuario', userData); // Llama a la API
        return UserMapper.toDomain(createdUserData); // Devuelve el User como entidad
    }

    async updateUser(user) {
        const userData = UserMapper.toData(user);
        const updatedUserData = await this.adapter.put(`/users/${user.id}`, userData);
        return UserMapper.toDomain(updatedUserData);
    }

    async deleteUser(userId) {
        await this.adapter.delete(`/users/${userId}`);
    }
}

export default UserRepositoryImpl;
