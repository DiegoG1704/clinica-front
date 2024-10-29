export default // core/utils/FechaValueObject.js
    class FechaValueObject {
    constructor(fecha) {
        this.fecha = fecha

    }

    // Método para validar que la fecha es válida


    // Método para convertir texto a objeto Date
    convertirADate() {
        if (typeof this.fecha === 'string') {
            const date = new Date(this.fecha);
            if (isNaN(date.getTime())) {
                throw new Error("Formato de fecha de texto no válido");
            }
            return date;
        }
        if (this.fecha instanceof Date) {
            return this.fecha; // Retorna el objeto Date si ya es de tipo Date
        }
        throw new Error("Formato de fecha no válido");
    }

    // Método para convertir objeto Date a texto en un formato específico
    convertirATexto(formato = 'YYYY-MM-DD') {
        const anio = this.fecha.getFullYear();             // Año en formato numérico
        const mes = String(this.fecha.getMonth() + 1).padStart(2, '0');  // Mes (ajustado y con dos dígitos)
        const dia = String(this.fecha.getDate()).padStart(2, '0');       // Día con dos dígitos
        return `${anio}-${mes}-${dia}`; // Formato "YYYY-MM-DD"
    }

    // Método para formatear la fecha a un string
    formatearFecha() {
        return this.convertirATexto();
    }
}
