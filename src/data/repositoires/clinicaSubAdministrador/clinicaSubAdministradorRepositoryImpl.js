// src/data/repositories/UserRepositoryImpl.js

import { date } from 'zod';
import UserRepository from '../../../domain/repositories/auth/UserRepository';
import UserMapper from '../../mappers/user/UserMapper';


class ClinicaSubAdministradorRepositoryImpl extends UserRepository {
    constructor(adapter) {
        super();
        this.adapter = adapter;
    }

    async fetchUsers(id) {
        const usersData = await this.adapter.get(`/GetSubAdministrador/${id}`);
        return usersData.map(UserMapper.toDomain); // Convierte los datos a entidades de User
    }

    async createUser(user) {
        const userData = UserMapper.toData(user); // Convierte el User a formato de datos
        console.log("to-dat", userData)
        const createdUserData = await this.adapter.post('CreateUsuario', userData); // Llama a la API
        return UserMapper.toDomain(createdUserData);
    }

    async updateUser(data, id) {
        const userData = UserMapper.toData(data);
        try {
            const updatedUserData = await this.adapter.put(`user/edit/${id}`, userData);
            return { success: true }

        } catch (error) {

            return { success: false, error: error?.response?.data }

        }



    }

    async deleteUser(user_id) {
        let data_response = { success: false, data: {}, error: [] }
        try {
            const response = await this.adapter.delete(`user/delete/${user_id}`);
            data_response = { ...data_response, success: true }
        } catch (error) {
            data_response = { ...data_response, success: false, error: error.response.data }

        }
        return data_response


    }
    // async getUserByClinica(idClinica) {
    //     let response = { success: false, data: {}, error: [] }
    //     try {
    //         const usersData = await this.adapter.get(`GetSubAdmin/${idClinica}}`);

    //         response = { success: true, data: UserMapper.toDomain(usersData?.[0]), error: [] }

    //     } catch (error) {
    //         response = { ...response, error: [error?.response?.message] }

    //     }
    //     return response


    // }
    // async me() {
    //     let response = { success: false, data: {}, error: [] }
    //     try {
    //         const usersData = await this.adapter.get(`me`);


    //         response = { success: true, data: UserMapper.toDomain(usersData), error: [] }

    //     } catch (error) {
    //         response = { ...response, error: [error?.response?.message] }

    //     }
    //     return response


    // }
    // async logout() {
    //     let response = { success: false, data: {}, error: [] }
    //     try {
    //         const data = await this.adapter.post(`logout`);

    //         response = { success: true, data: { message: "Saliendo" }, error: [] }

    //     } catch (error) {
    //         response = { ...response, error: [error?.response?.message] }

    //     }
    //     return response


    // }
    // async changePassword(datos,id) {
    //     let response = { success: false, data: {}, error: [] }
    //     try {
    //         const data = await this.adapter.put(`NewPasword/${id}`,datos);
    //         console.log("staabaa",data)
    //         response = { success: true, data: { message: "success" }, error: [] }

    //     } catch (error) {
    //         console.log("esto es",error)
    //         response = { ...response, error: [{message:error?.response?.data?.message}] }

    //     }
    //     return response

    // }
}

export default ClinicaSubAdministradorRepositoryImpl;
