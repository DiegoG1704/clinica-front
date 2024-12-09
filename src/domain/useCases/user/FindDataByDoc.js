export default class FindDataByDoc{
    constructor(Repository,Validator) {
        this.Repository = Repository;
        this.Validator=Validator
    }
  
    async execute(dni) {
        try {
            let isValid = this.Validator.validateDniData(dni);
            if (isValid?.success) {
                const user = await this.Repository.consultarPorDNI(dni);
                return { success: user.success, data: user?.data };
            } else {
                return { success: false, error: isValid?.errors };
            }
        } catch (error) {
            
            return { success: false, error: [error] };
        }
    }
}

