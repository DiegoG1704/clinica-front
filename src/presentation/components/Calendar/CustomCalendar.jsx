import { Calendar } from 'primereact/calendar';
import React from 'react'

const CustomCalendar = ({ value, onChange, minDate, maxDate, yearRange, ...props }) => {
    // Calcular valores predeterminados
    const currentDate = new Date();
    const defaultMinDate = new Date(currentDate.getFullYear() - 100, currentDate.getMonth(), currentDate.getDate());
    const defaultMaxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

    return (
        <Calendar
            value={value}
            onChange={onChange}
            minDate={minDate || defaultMinDate}
            maxDate={maxDate || defaultMaxDate}
            yearRange={yearRange || `${defaultMinDate.getFullYear()}:${defaultMaxDate.getFullYear()}`}
            showButtonBar
            {...props} // Permitir pasar propiedades adicionales al componente Calendar
        />
    );
};


export default CustomCalendar
