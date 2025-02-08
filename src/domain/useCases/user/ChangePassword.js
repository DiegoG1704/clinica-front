export class changePassword {
    constructor(Repository, changePasswordValidator) {
        this.userRepository = Repository;
        this.changePasswordValidator = changePasswordValidator;
    }
    async execute(id,{ contraseña, newcontraseña }) {
        try {
            let isValid = this.changePasswordValidator?.validateDataUser({ contraseña, newcontraseña })
            console.log("tsss",isValid)
            console.log("tsss-2",this.userRepository)
            if (isValid?.success) {
                let response=await this.userRepository.changePassword({ contraseña, newcontraseña },id);
                console.log("resss",response)
                return response
            } else {
                return { success: false, error: isValid?.errors };
            }
        } catch (error) {
            return { success: false, error: [error] };
        }
    }
}
