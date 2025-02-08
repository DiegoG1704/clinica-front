import GeneralDataValidator from '../../../domain/validators/user/GeneralDataValidator';
import { z } from 'zod';


export default class ZodGeneralDataValidatorImpl extends GeneralDataValidator {
  constructor() {
    super();
    // Esquema de Zod para validar todos los datos del usuario
    this.userSchema = z.object({
      nombres: z.string().min(3, { message: 'Ingresar nombres' }),
      apellidos: z.string().min(3, { message: 'Ingresar apellidos' }),
      dni: z.string().length(8, { message: 'El DNI debe tener 8 dígitos' }),
      estadoCivil: z.string().min(1,{message:"Seleccionar estado civil"}),
      fechNac: z.date({ message: 'Ingresar la fecha de nacimiento y debe ser válida' }),
      direccion: z.string().min(1,{message:"Ingresar dirección de domicilio"}),
     
    });
  }
  // Método que valida todos los datos del usuario
  validateData(data) {
    try {
      let resultvalidate = this.userSchema.parse(data);
      if (resultvalidate) {
        return { success: true}
      }
    } catch (error) {
      return { success: false, errors: error?.issues }

    }

    // Si hay un error de validación, Zod lanza una excepción
  }
}


