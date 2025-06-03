import { z } from 'zod';

export default class ZodResetPassword {
  constructor() {
    this.changePasswordSchema = z.object({
      contraseña: z
        .string()
        .trim()
        .min(6, { message: 'La nueva contraseña debe tener al menos 6 caracteres' })
        .refine((val) => !/\s/.test(val), { message: 'La nueva contraseña no debe contener espacios' }),

      nuevaContrasena: z
        .string()
        .trim()
        .min(6, { message: 'La confirmación debe tener al menos 6 caracteres' })
        .refine((val) => !/\s/.test(val), { message: 'La confirmación no debe contener espacios' }),
        token: z.string().min(3, { message: 'Token no valido' }),
    }).refine(
      (data) => data.contraseña === data.nuevaContrasena,
      {
        message: 'Las contraseñas no coinciden',
        path: ['confirmarContrasena'],
      }
    );
  }

  validateDataUser(data) {
    const result = this.changePasswordSchema.safeParse(data);
    if (!result.success) {
      return { success: false, errors: result.error.issues };
    }
    return { success: true };
  }
}
