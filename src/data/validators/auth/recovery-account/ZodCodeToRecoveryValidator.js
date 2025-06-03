import { z } from 'zod';

export default class ZodCodeToRecoveryValidator {
    constructor() {

        // Esquema de Zod para validar todos los datos del usuario
        this.userSchema = z.object({
            token: z
              .string()
              .length(9, "El código debe tener exactamente 9 caracteres")
              
          });
    }
    validateUserData(data) {
       
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