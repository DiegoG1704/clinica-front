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
        const createdUserData = await this.adapter.post('UserCode', userData); // Llama a la API
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
    async logout() {
        let response = { success: false, data: {}, error: [] }
        try {
            const data = await this.adapter.post(`logout`);

            response = { success: true, data: { message: "Saliendo" }, error: [] }

        } catch (error) {
            response = { ...response, error: [error?.response?.message] }

        }
        return response


    }
    async changePassword(datos, id) {
        let response = { success: false, data: {}, error: [] }
        try {
            const data = await this.adapter.put(`NewPasword/${id}`, datos);
            console.log("staabaa", data)
            response = { success: true, data: { message: "success" }, error: [] }

        } catch (error) {
            console.log("esto es", error)
            response = { ...response, error: [{ message: error?.response?.data?.message }] }

        }
        return response

    }
    async updateGeneralData(datos, id) {
        const userData = UserMapper.toData(datos);
        try {
            const updatedUserData = await this.adapter.put(`configUser/${id}`, userData);
            return { success: true }

        } catch (error) {

            return { success: false, error: error?.response?.data }

        }

    }
    async verifyCodeUser(code) {
        try {
            const response = await this.adapter.post(`verificarCodigo`, code);
            console.log("res",response)
            return { success: response?.success }
        } catch (error) {
            return { success: false, error: error?.response?.data }
        }

    }


}

export default UserRepositoryImpl;
