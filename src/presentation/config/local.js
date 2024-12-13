// primeReactConfig.js
import { addLocale, locale } from 'primereact/api';

// Definir el idioma español
const configurePrimeReact = () => {
    addLocale('es', {
        firstDayOfWeek: 1,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'Mi', 'J', 'V', 'S'],
        monthNames: [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto',
            'septiembre', 'octubre', 'noviembre', 'diciembre'
        ],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Limpiar',
  
        weekHeader: 'Sm'
    });

    // Aplicar el idioma español globalmente
    locale('es');
};

export default configurePrimeReact;