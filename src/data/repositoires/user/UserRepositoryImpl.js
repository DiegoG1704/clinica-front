// src/data/repositories/UserRepositoryImpl.js

import UserRepository from '../../../domain/repositories/auth/UserRepository';
import UserMapper from '../../mappers/user/UserMapper';


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
        console.log("to-dat", userData)
        const createdUserData = await this.adapter.post('CreateUsuario', userData); // Llama a la API
        return UserMapper.toDomain(createdUserData);
    }

    async updateUser(user) {
        const userData = UserMapper.toData(user);
        const updatedUserData = await this.adapter.put(`/users/${user.id}`, userData);
        return UserMapper.toDomain(updatedUserData);
    }

    async deleteUser(userId) {
        await this.adapter.delete(`/users/${userId}`);
    }
    async getUserByClinica(idClinica) {
        let response = { success: false, data: {}, error: [] }
        try {
            const usersData = await this.adapter.get(`GetSubAdmin/${idClinica}}`);
            console.log("olas", usersData)
            response = { success: true, data: UserMapper.toDomain(usersData?.[0]), error: [] }

        } catch (error) {
            response = { ...response, error: [error?.response?.message] }

        }
        return response


    }
    async me() {
        let response = { success: false, data: {}, error: [] }
        try {
            const usersData = await this.adapter.get(`me`);
        
           
            response = { success: true, data: UserMapper.toDomain(usersData), error: [] }

        } catch (error) {
            response = { ...response, error: [error?.response?.message] }

        }
        return response


    }
}

export default UserRepositoryImpl;
