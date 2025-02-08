export class LogoutUser {
    constructor(authRepository) {
        this.authRepository = authRepository;

    }
    async execute() {

        try {
            const response = await this.authRepository.logout();
            return response
        } catch (error) {
            return { success: false, error: [error] };
        }


    }
}