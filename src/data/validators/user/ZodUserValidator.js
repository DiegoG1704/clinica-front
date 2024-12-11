import { optional, z } from 'zod';
import UserValidator from '../../../domain/validators/user/UserValidator';

const agruparErrores = (error) => {
  const grouped = error.errors.reduce((acc, curr) => {
    const campo = curr.path.join(".");
    if (!acc[campo]) {
      acc[campo] = [];
    }
    acc[campo].push(curr.message);
    return acc;
  }, {});

  return Object.entries(grouped).map(([campo, mensajes]) => ({
    campo,
    message: mensajes.join(" y ").replace(/y\s(?=[^y]*$)/, " y además "),
  }));
};
export default class ZodUserValidator extends UserValidator {
  constructor() {
    super();
    // Esquema de Zod para validar todos los datos del usuario
    this.userSchema = z.object({
      correo: z.string().email({ message: "Correo no es válido" }),
      contraseña: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
      nombres: z.string()
        .refine((value) => value.trim().length > 0, { message: "El nombre no puede estar vacío o lleno de espacios" }),
      apellidos: z.string()
        .refine((value) => value.trim().length > 0, { message: "El apellido no puede estar vacío o lleno de espacios" }),
      dni: z.string().length(8, { message: "El DNI debe tener 8 dígitos" }),
      estadoCivil: z.string().min(1, { message: "Seleccionar estado civil" }),
      rol_id: z.number().int({ message: "El rol_id debe ser un número entero" }),
      fechNac: z.date({ message: "La fecha de nacimiento debe ser válida" }),
      telefono: z.string().min(9, { message: "El teléfono debe tener al menos 9 caracteres" }),
      direccion: z.string()
        .refine((value) => value.trim().length > 0, { message: "La dirección no puede estar vacía o llena de espacios" }),
      confirmarContraseña: z.string().min(8, { message: "La confirmación de contraseña debe tener al menos 8 caracteres" }),
      acceptTermns: z.boolean().refine((value) => value === true, { message: "Debe aceptar las políticas" }),
      codigoPromotor: z.string()
        .min(4, { message: "El código de promotor debe tener al menos 4 caracteres" })
        .refine((value) => value.trim().length > 0, { message: "El código de promotor no puede estar lleno de espacios" })
        .optional()
        .or(z.literal(''))
      ,
    });
  }


  // Método que valida todos los datos del usuario
  validateUserData(data) {
    console.log("data", data)
    try {
      let resultvalidate = this.userSchema.parse(data);
      if (resultvalidate) {
        return { success: true }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, errors: agruparErrores(error) };
      }
      throw error;

    }

    // Si hay un error de validación, Zod lanza una excepción
  }

}

