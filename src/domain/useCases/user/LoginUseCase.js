export class LoginUseCase {
    constructor(authRepository, authValidator) {
        this.authRepository = authRepository;
        this.authValidator = authValidator;
    }
    async execute(data) {
        try {
            let isValid = this.authValidator?.validateUserData(data)
            if (isValid?.success) {
                const user = await this.authRepository.login({dni:data?.dni,contraseña:data?.contraseña});
                return { success: true, data: user?.user, token: user?.token };
            } else {
                return { success: false, error: isValid?.errors };
            }
        } catch (error) {
            return { success: false, error: [error] };
        }
    }
}
