import { z } from 'zod';

export default class ZodCodeToRecoveryValidator {
    constructor() {

        // Esquema de Zod para validar todos los datos del usuario
        this.userSchema = z.object({
            token: z
              .string()
              .length(8, "El código debe tener exactamente 8 caracteres")
              
          });
    }
    validateUserData(data) {
        console.log("dta-1",data)
        try {
            let resultvalidate = this.userSchema.parse(data);
            console.log("result", resultvalidate)
            if (resultvalidate) {
                return { success: true }
            }
        } catch (error) {
            return { success: false, errors: error?.issues }

        }


    }
}