
import { AuthRepository } from '../../../domain/repositories/auth/AuthRepository';
import UserMapper from '../../mappers/user/UserMapper';
export class AuthRepositoryImpl extends AuthRepository {
    constructor(adapter) {
        super();
        this.adapter = adapter;
    }
    async login(data) {
        try {
            const response = await this.adapter.post('/login', data);
            if (response.success) {

                let user = UserMapper.toDomain(response?.usuario)
                let dataResponse = { success: true, user: user, token: response?.token }
                return dataResponse
            }
        } catch (error) {
            throw Error(error?.response?.data?.message)
        }
    }
    async logout() {
        return await this.apiService.post('/logout');
    }
    async sendEmailToRecovery({ ...email }) {
        try {
            const response = await this.adapter.post('/solicitar-recuperacion', { correo: email.email });
            if (response.success) {
                return { success: true, message: response?.message };
            } else {
                return { success: false, message: response?.message };
            }
        } catch (error) {
            console.log("error",error)
            throw Error(error?.response?.data?.error)
        }
    }
    async resetPassword(data) {
        try {
            const response = await this.adapter.post('/cambiar-contrasena', data);
            
            if (response.success) {
                
                return { success: true, message: response?.message };
            } else {
                return { success: false, message: response?.message };
            }
        } catch (error) {
          
            throw Error(error?.response?.data?.error)
           
        }


    }
    async verifyTokenToResetPassword(token){
        try {
            const response = await this.adapter.post('/verificar-codigo-recuperacion', {token:token});
            
            if (response.success) {
                
                return { success: true, message: response?.message };
            } else {
                return { success: false, message: response?.message };
            }
        } catch (error) {
          
            throw Error(error?.response?.data?.error)
           
        }

    }
}
