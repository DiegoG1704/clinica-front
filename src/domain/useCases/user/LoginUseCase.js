export class LoginUseCase {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async execute({ correo, contraseña }) {
        try {
            const user = await this.authRepository.login(correo, contraseña);
            return user;
        } catch (error) {
            throw new Error('Login failed');
        }
    }
}
