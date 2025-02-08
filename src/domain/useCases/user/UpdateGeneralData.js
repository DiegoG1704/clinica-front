class UpdateGeneralData {
    constructor(userRepository, userValidator) {
        this.userRepository = userRepository;
        this.userValidator = userValidator
    }

    async execute(userData, id) {

        try {
            let isValid = this.userValidator.validateUserData(userData);

            if (isValid?.success) {
                const user = await this.userRepository.updateGeneralData(userData, id);
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

export default UpdateGeneralData;
