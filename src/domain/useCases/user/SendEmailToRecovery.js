class SendEmailToRecovery {
    constructor(userRepository, validatorToSendEmail) {
        this.userRepository = userRepository;
        this.userValidator = validatorToSendEmail
    }

    async execute(email) {
       
        try {
            let isValid = this.userValidator.validateUserData({email:email});
            console.log("isvalida",isValid)

            if (isValid?.success) {
                const user = await this.userRepository.sendEmailToRecovery({email});
                return { success: true, data: user };

            } else {
                return { success: false, error: isValid?.errors };
            }
        } catch (error) {
            console.error("error", error)
            if (error?.status) {
                return { success: false, error: [error?.response?.data] };
            }
            return { success: false, error: [error] };
        }
    }
}

export default SendEmailToRecovery;
