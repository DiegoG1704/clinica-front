import { z } from 'zod';
import RucValidator from '../../../domain/validators/user/RucValidator';

export default class ZodRucValidator extends RucValidator {
    constructor() {
        super();
        this.rucSchema = z.string()
            .min(1, 'El DNI no puede estar vacío.') // Verifica que no esté vacío
            .length(11, 'El RUC debe tener exactamente 11 caracteres.') // Verifica la longitud
            .regex(/^\d+$/, 'El DNI debe contener solo números.'); // Verifica que sea solo numérico
    }
    // Método que valida el dni 
    validateRucData(data) {
        try {
            let resultvalidate = this.rucSchema.parse(data); // Si hay un error de validación, Zod lanza una excepción
            if (resultvalidate) {
                return { success: true }
            }
        } catch (error) {
            return { success: false,errors:error?.issues }

        }
    
    }
}
