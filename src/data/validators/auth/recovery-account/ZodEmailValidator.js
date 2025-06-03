import { z } from 'zod';

export default class ZodEmailValidator {
    constructor() {

        // Esquema de Zod para validar todos los datos del usuario
        this.userSchema = z.object({
            email: z.string().email({ message: 'El correo electrónico no es válido' }),
           
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