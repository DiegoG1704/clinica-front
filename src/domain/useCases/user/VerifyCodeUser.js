export class VerifyCodeUser {
    constructor(userRepository, codeValidator) {
        this.userRepository = userRepository;
        this.codeValidator = codeValidator;
    }
    async execute(data) {
        console.log("entre",this.userRepository)
        try {
            let isValid = this.codeValidator?.validateCode(data)
            console.log("entre22",isValid)
            if (isValid?.success) {
                const user = await this.userRepository.verifyCodeUser(data);
                console.log("user",user)
                return { success: user?.success, data: user?.user, token: user?.token };
            } else {
                return { success: false, error: isValid?.errors };
            }
        } catch (error) {
            return { success: false, error: [error] };
        }
    }
}
