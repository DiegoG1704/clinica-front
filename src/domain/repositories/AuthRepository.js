export class AuthRepository {
    async login(correo, contraseña) {
        throw new Error('AuthRepository.login must be implemented');
    }

    async logout() {
        throw new Error('AuthRepository.logout must be implemented');
    }
}
