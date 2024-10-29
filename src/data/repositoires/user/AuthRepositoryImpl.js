
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
                console.log("success", UserMapper.toDomain(response?.usuario))
                return UserMapper.toDomain(response?.usuario)
            }
        } catch (error) {
            throw Error(error?.response?.data?.message)
        }
    }
    async logout() {
        return await this.apiService.post('/logout');
    }
}
