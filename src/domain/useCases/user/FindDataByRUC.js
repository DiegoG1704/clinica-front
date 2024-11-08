export default class FindDataByRUC{
    constructor(Repository,Validator) {
        this.Repository = Repository;
        this.Validator=Validator
    }
  
    async execute(ruc) {
        try {
            let isValid = this.Validator.validateRucData(ruc);
            if (isValid?.success) {
                const response = await this.Repository.consultarPorRUC(ruc);
                return { success: true, data: response?.data ,error:[response?.error]};
            } else {
                console.log("er",isValid);
                return { success: false, error: isValid?.errors };
            }
        } catch (error) {
            
            return { success: false, error: [error] };
        }
    }
}

