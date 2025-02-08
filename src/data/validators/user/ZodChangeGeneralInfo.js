import { z } from 'zod';
import UserValidator from '../../../domain/validators/user/UserValidator';



export default class ZodChangeGeneralInfo extends UserValidator {
    constructor() {
        super();
        this.userSchema = z.object({
            correo: z.string().email({ message: 'Correo no es válido' }),

            telefono: z
                .string({ message: 'Ingresar teléfono' })
                .refine((value) => value.trim().length > 0, { message: 'El teléfono no puede estar vacío o solo tener espacios' }),
            direccion: z
                .string({ message: 'Ingresar dirección' })
                .refine((value) => value.trim().length > 0, { message: 'La dirección no puede estar vacía o solo tener espacios' }),

        });
    }
    // Método que valida todos los datos del usuario
    validateUserData(data) {

        try {
            let resultvalidate = this.userSchema.parse(data);
            if (resultvalidate) {
                return { success: true }
            }
        } catch (error) {
            return { success: false, errors: error?.issues }

        }

        // Si hay un error de validación, Zod lanza una excepción
    }

}
