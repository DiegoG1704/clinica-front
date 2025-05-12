export class ResetPassword {
    constructor(Repository, changePasswordValidator) {
        this.userRepository = Repository;
        this.changePasswordValidator = changePasswordValidator;
    }
    async execute(data) {
        try {
            let isValid = this.changePasswordValidator?.validateDataUser(data)
            console.log("isvalid", isValid)
          
            if (isValid?.success) {
                let response=await this.userRepository?.resetPassword(data);
                
                return response
            } else {
                return { success: false, error: isValid?.errors };
            }
        } catch (error) {
            console.log("errores", error) 
            return { success: false, error: [error] };
        }
    }
}
