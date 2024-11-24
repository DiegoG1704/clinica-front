import { z } from "zod";

export default class ZodSelectFileValidator {
    constructor() {
        // Esquema de Zod para validar un archivo
        this.subLocalSchema = z.object({
            archivo: z
                .instanceof(File) // Verifica que sea una instancia de `File`
                .refine(
                    (file) => file.size > 0, // Verifica que el archivo no esté vacío
                    { message: "El archivo no puede estar vacío" }
                )
                .refine(
                    (file) => file.type === "application/pdf", // Verifica que sea un PDF
                    { message: "Solo se permiten archivos PDF" }
                )
                .refine(
                    (file) => file.size <= 5 * 1024 * 1024, // Tamaño máximo de 5 MB
                    { message: "El archivo no debe exceder los 5 MB" }
                ),
        });
    }

    // Método que valida los datos del archivo
    validateFileData(data) {
        try {
            const result = this.subLocalSchema.parse(data);
            return { success: true, data: result };
        } catch (error) {
            return { success: false, errors: error?.issues };
        }
    }
}
