import { InputText } from 'primereact/inputtext';


const InputInteger = ({ style, className, name, value, onChange, keyfilter, autoComplete, maxLength=11, minLength, valueError, placeholder, containerClass }) => {
    const validateValue = (value) => {
        const regex = /^[1-9]\d*$|^0$|^$/; // Permite enteros positivos, "0", o una cadena vacía
        return regex.test(value);
    };
    
    const removeLeadingZero = (value) => {
        return value.length > 1 && value.startsWith('0') ? value.substring(1) : value;
    };
    
    const createNewEvent = (originalEvent, newValue) => {
        return { ...originalEvent, target: { ...originalEvent.target, value: newValue } };
    };
    
    const handleChange = (e) => {
        let value = e.target.value;
        
        if (value === "") { // Permite que el campo esté vacío
            const newEvent = createNewEvent(e, value);
            onChange(newEvent);
            return;
        }
    
        value = removeLeadingZero(value);
    
        if (validateValue(value)) {
            const newEvent = createNewEvent(e, value);
            onChange(newEvent);
        }
    };
    
    return (
        <div className={`${containerClass} relative`} >
            <InputText
                style={style}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={handleChange}
                keyfilter="int"
                autoComplete={autoComplete}
                maxLength={maxLength}
                className={`${className}`}
                minLength={minLength}
            />
        </div>
    );
}

export default InputInteger
