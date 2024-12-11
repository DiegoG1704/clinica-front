import { z } from 'zod';


export default class ZodValidateChangePassword {
    constructor() {

        this.changePasswordSchema = z.object({
            contraseña: z
                .string()
                .trim()
                .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
                .refine((val) => !/\s/.test(val), { message: "La contraseña no debe contener espacios" }),
            newcontraseña: z
                .string()
                .trim()
                .min(6, { message: "La nueva contraseña debe tener al menos 6 caracteres" })
                .refine((val) => !/\s/.test(val), { message: "La nueva contraseña no debe contener espacios" }),
        })
            .refine(
                (data) => data.contraseña !== data.newcontraseña,
                { message: "La nueva contraseña no debe ser igual a la anterior", path: ["newcontraseña"] }
            );

    }
    // Método que valida el dni 
    validateDataUser(data) {
        try {
            let resultvalidate = this.changePasswordSchema.parse(data); // Si hay un error de validación, Zod lanza una excepción
            if (resultvalidate) {
                return { success: true }
            }
        } catch (error) {
            console.log("enrttt")
            return { success: false, errors: error?.issues }

        }

    }
}
