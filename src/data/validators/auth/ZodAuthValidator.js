import { z } from 'zod';
import LoginValidator from "../../../domain/validators/auth/LoginValidator";
export default class ZodAuthValidator extends LoginValidator {
    constructor() {
        super();
        // Esquema de Zod para validar todos los datos del usuario
        this.userSchema = z.object({
            correo: z.string().email({ message: 'Correo no es válido' }),
            contraseña: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
        });
    }
    validateUserData(data) {
        try {
            let resultvalidate = this.userSchema.parse(data);
            console.log("result",resultvalidate)
            if (resultvalidate) {
                return { success: true }
            }
        } catch (error) {
            return { success: false,errors:error?.issues }

        }


    }
}