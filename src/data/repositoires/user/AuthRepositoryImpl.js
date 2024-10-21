
import { AuthRepository } from '../../../domain/repositories/AuthRepository';
import UserMapper from '../../mappers/UserMapper';

export class AuthRepositoryImpl extends AuthRepository {
    constructor(adapter) {
        super();
        this.adapter = adapter;
    }
    async login(correo, contraseña) {
        const response = await this.adapter.post('/login', { correo, contraseña });
        console.log("data",response)
        if (response.success) {
            console.log("success",UserMapper.toDomain(response?.usuario))
            return   UserMapper.toDomain(response?.usuario)
        } else {
            throw new Error('Invalid credentials');
        }
    }
    async logout() {
        return await this.apiService.post('/logout');
    }
}
