import { z } from 'zod';
import DniValidator from '../../../domain/validators/user/DniValidator';
export default class ZodDniValidator extends DniValidator {
    constructor() {
        super();
        this.dniSchema = z.string()
            .min(1, 'El DNI no puede estar vacío.') // Verifica que no esté vacío
            .length(8, 'El DNI debe tener exactamente 8 caracteres.') // Verifica la longitud
            .regex(/^\d+$/, 'El DNI debe contener solo números.'); // Verifica que sea solo numérico
    }
    // Método que valida el dni 
    validateDniData(data) {
        try {
            let resultvalidate = this.dniSchema.parse(data); // Si hay un error de validación, Zod lanza una excepción
            if (resultvalidate) {
                return { success: true }
            }
        } catch (error) {
            return { success: false,errors:error?.issues }

        }
    
    }
}
