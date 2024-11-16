
import { AuthRepository } from '../../../domain/repositories/auth/AuthRepository'; 
import UserMapper from '../../mappers/user/UserMapper';
export class AuthRepositoryImpl extends AuthRepository {
    constructor(adapter) {
        super();
        this.adapter = adapter;
    }
    async login(correo, contraseña) {
        try {
            const response = await this.adapter.post('/login', { correo, contraseña });
            if (response.success) {
              
                let user=UserMapper.toDomain(response?.usuario)
                let dataResponse={success:true,user:user,token:response?.token}
                return dataResponse
            }
        } catch (error) {
            throw Error(error?.response?.data?.message)
        }
    }
    async logout() {
        return await this.apiService.post('/logout');
    }
}
