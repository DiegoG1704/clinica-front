class CreateUser {
    constructor(userRepository, userValidator) {
        this.userRepository = userRepository;
        this.userValidator = userValidator
    }

    async execute(userData) {

        try {
            let isValid = this.userValidator.validateUserData(userData);
            let isValidPassword = this.userValidator.validarContraseñasIguales(userData.contraseña, userData.confirmarContraseña);
            if (isValid?.success) {
                if (isValidPassword?.success) {
                    const user = await this.userRepository.createUser(userData);
                    return { success: true, data: user };
                }
                return { success: false, otherError: isValidPassword?.errors };

            } else {
                return { success: false, error: isValid?.errors };
            }
        } catch (error) {
            console.error("error",error)
            if(error?.status){
                return { success: false, otherError: [error?.response?.data] };
            }
            return { success: false, otherError: [error] };
        }
    }
}

export default CreateUser;
