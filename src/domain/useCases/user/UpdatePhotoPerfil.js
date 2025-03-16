class UpdatePhotoPerfil {
    constructor(userRepository, photoValidator) {
        this.userRepository = userRepository;
        this.photoValidator = photoValidator
    }

    async execute(userData, id) {

        try {
            let isValid = this.photoValidator.validate({image:userData});
           
            if (isValid?.success) {
                const user = await this.userRepository.updatePhoto(userData, id);
                return { success: true, data: user?.data };

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

export default UpdatePhotoPerfil;
