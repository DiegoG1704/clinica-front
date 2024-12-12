import { z } from 'zod';


export default class ZodValidateUserCode {
    constructor() {
     
        this.codeSchema = z.object({
            codigo: z.string().min(8, { message: "error" })
        })
    }
    // Método que valida el dni 
    validateCode(data) {
        try {
            let resultvalidate = this.codeSchema.parse(data); // Si hay un error de validación, Zod lanza una excepción
            if (resultvalidate) {
                return { success: true }
            }
        } catch (error) {
            return { success: false, errors: error?.issues }

        }

    }
}
