import { z } from "zod"
import createSubLocalValidator from "../../../domain/validators/subLocales/createSubLocalValidator";
export default class ZodCreateSubLocalValidator extends createSubLocalValidator {
    constructor() {
        super();
        // Esquema de Zod para validar todos los datos del usuario
        this.subLocalSchema = z.object({
            nombre: z.string()
                .refine((value) => value.trim().length > 0, { message: 'El nombre no puede estar vacío' })
              ,

            direccion: z.string()
                .refine((value) => value.trim().length > 0,{ message: 'La dirección no puede estar vacía' })
                ,

            clinica_id: z.number()
                .int({ message: 'El ID de clínica debe ser un número entero' }) // Asegúrate de que sea un número entero
                .positive({ message: 'El ID de clínica debe ser un número positivo' }), // Asegúrate de que sea positivo
        });

    }

    // Método que valida todos los datos del usuario
    validateSubLocalData(data) {
        console.log("data", data)
        try {
            let resultvalidate = this.subLocalSchema.parse(data);
            if (resultvalidate) {
                return { success: true }
            }
        } catch (error) {
            return { success: false, errors: error?.issues }

        }

        // Si hay un error de validación, Zod lanza una excepción
    }

}