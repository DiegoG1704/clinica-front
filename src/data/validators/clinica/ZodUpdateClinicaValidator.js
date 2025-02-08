import { z } from "zod"


export default class ZodUpdateClinicalValidator {
    constructor() {
        
        // Esquema de Zod para validar todos los datos del usuario
        this.subLocalSchema = z.object({
            id: z.number()
                .refine((value) => value !== 0, { message: 'El id de la clinica no puede estar vacio' }),
            nombre: z.string()
                .refine((value) => value.trim().length > 0, { message: 'El nombre no puede estar vacío' }),
            direccion: z.string()
                .refine((value) => value.trim().length > 0, { message: 'La dirección no puede estar vacía' }),
            ruc: z.string()
                .regex(/^\d+$/, { message: 'El RUC debe no puede estar vacía y solo debe contener dígitos' }), // Solo dígitos en el RUC como cadena de texto
            ubicacion: z.string()
                .refine((value) => value.trim().length > 0, { message: 'La ubicación no puede estar vacía' })
            ,
            telefono: z.string()
                .min(9, { message: 'Ingresar telefono valido' })

        });
    }
    // Método que valida todos los datos del usuario
    validateClinicaData(data) {
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