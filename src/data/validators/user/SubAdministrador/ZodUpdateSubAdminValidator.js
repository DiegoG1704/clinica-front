import { z } from 'zod';
import UserValidator from '../../../../domain/validators/user/UserValidator';

// import UserValidator from '../../../domain/validators/user/UserValidator';


export default class ZodUpdateSubAdminValidator extends UserValidator {
    constructor() {
        super()
        // Esquema de Zod para validar todos los datos del usuario
        this.userSchema = z.object({
            correo: z.string().email({ message: 'Correo no es válido' }),
            contraseña: z.string({ message: 'Ingresar contraseña' }).min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }).optional(),
            nombres: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
            apellidos: z.string().min(3, { message: 'El apellido debe tener al menos 3 caracteres' }),
            dni: z.string().length(8, { message: 'El DNI debe tener 8 dígitos' }),
            // rol_id: z.number({ message: 'Seleccionar rol' }).int({ message: 'Seleccionar rol' }),
            clinicaId: z.number().int().optional(),
            fechNac: z.date({ message: 'La fecha de nacimiento debe ser válida' }),
            telefono: z.string().optional(),
            direccion: z.string().optional(),
            local_id: z.number({ message: 'Seleccionar local' }).int({ message: 'Seleccionar local' })
        });
    }

    // Método que valida todos los datos del usuario
    validateUserData(data) {
        console.log("data-2", data)
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
