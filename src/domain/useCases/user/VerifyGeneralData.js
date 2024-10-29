export default class VerifyGeneralData {
    constructor(Validator) {
        this.Validator = Validator
    }

    execute(data) {
        try {
            let isValid = this.Validator.validateData(data);
            if (isValid?.success) {
                return { success: true };
            } else {
                return { success: false, error: isValid?.errors };
            }
        } catch (error) {
            return { success: false, error: [error] };
        }
    }
}



