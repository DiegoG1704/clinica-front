export class LoginUseCase {
    constructor(authRepository, authValidator) {
        this.authRepository = authRepository;
        this.authValidator = authValidator;
    }
    async execute({ correo, contraseña }) {
        try {
            let isValid = this.authValidator?.validateUserData({ correo, contraseña })
            if (isValid?.success) {
                const user = await this.authRepository.login(correo, contraseña);
                return { success: true, data: user };
            } else {
                return { success: false, error: isValid?.errors };
            }
        } catch (error) {
            return { success: false, error: [error] };
        }
    }
}
