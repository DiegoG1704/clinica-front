import PhotoPerfilValidator from '@/domain/validators/user/PhotoPerfilValidator';
import { z } from 'zod';

export default class ZodPhotoPerfilValidatorImpl extends PhotoPerfilValidator {
    constructor() {
        super();
        // Esquema de Zod para validar la imagen de perfil
        this.userSchema = z.object({
            image: z.instanceof(File, { message: "Debe ser un archivo válido" })
                .refine(file => file.size > 0, { message: "El archivo no puede estar vacío" })
                .refine(file => file.size <= 5 * 1024 * 1024, { message: "El archivo no debe superar los 5MB" }) // Límite de 5MB
                .refine(file => ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type), { 
                    message: "Formato de imagen no válido (solo JPG, PNG, GIF o WEBP)" 
                })
        });
    }

    // Método que valida la imagen de perfil
    validate(data) {
        console.log("archivo",data)
        try {
            const resultValidate = this.userSchema.parse(data);
            return { success: true };
        } catch (error) {
            return { success: false, errors: error?.issues };
        }
    }
}
