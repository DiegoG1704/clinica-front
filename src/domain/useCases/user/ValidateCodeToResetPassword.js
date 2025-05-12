export class ValidateCodeToResetPassword {
    constructor(userRepository, codeValidator) {
        this.userRepository = userRepository;
        this.codeValidator = codeValidator;
    }
    async execute(data) {
      
        try {
            let isValid = this.codeValidator?.validateUserData(data)
     
            if (isValid?.success) {
                const user = await this.userRepository.verifyTokenToResetPassword(data?.token);
   
                return { success: user?.success };
            } else {
                return { success: false, error: isValid?.errors };
            }
        } catch (error) {
            return { success: false, error: [error] };
        }
    }
}
