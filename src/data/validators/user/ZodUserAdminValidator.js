import { z } from 'zod';
import UserValidator from '../../../domain/validators/user/UserValidator';


export default class ZodUserAdminValidator extends UserValidator {
    constructor() {
        super();
        // Esquema de Zod para validar todos los datos del usuario
        this.userSchema = z.object({
            correo: z.string().email({ message: 'Correo no es válido' }),
            contraseña: z.string({ message: 'Ingresar contraseña' }).min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
            nombres: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
            apellidos: z.string().min(3, { message: 'El apellido debe tener al menos 3 caracteres' }),
            dni: z.string().length(8, { message: 'El DNI debe tener 8 dígitos' }),
            estadoCivil: z.string().min(1, { message: "Seleccionar estado civil" }),
            rol_id: z.number().int({ message: 'El rolId debe ser un número entero' }),
            afiliadorId: z.number().int().optional().nullable(),
            clinicaId: z.number().int().optional().nullable(),
            fechNac: z.date({ message: 'La fecha de nacimiento debe ser válida' }),
            telefono: z.string().min(9, { message: "El teléfono debe tener al menos 9 dígitos" }).max(12, { message: "El teléfono no puede tener más de 12 dígitos" }),
            direccion: z.string().optional(),
            rutas: z.array(z.string()).optional(),
            confirmarContraseña: z.string().min(8, { message: 'Ingresar contraseña de confirmación' }),
        }).refine((data) => data.contraseña === data.confirmarContraseña, {
            message: 'Las contraseñas no coinciden',
            path: ['confirmarContraseña'],
        });
    }

    // Método que valida todos los datos del usuario
    validateUserData(data) {
        console.log("data-validar", data)
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
