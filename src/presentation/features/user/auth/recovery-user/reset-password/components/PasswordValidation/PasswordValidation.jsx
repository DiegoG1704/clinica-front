"use client"

import { useState } from "react"
import { Password } from "primereact/password"
import { CheckIcon, XIcon, ShieldIcon } from "lucide-react"
import styles from "./PasswordValidation.module.css"

const PasswordValidation = ({label,value,onChange,name}) => {
    const [password, setPassword] = useState("")

    const requirements = [
        { label: "Al menos una letra minúscula", test: (pw) => /[a-z]/.test(pw) },
        { label: "Al menos una letra mayúscula", test: (pw) => /[A-Z]/.test(pw) },
        { label: "Al menos un número", test: (pw) => /\d/.test(pw) },
        { label: "Mínimo 8 caracteres", test: (pw) => pw.length >= 8 },
    ]

   


    const passwordFooter = (
        <div className={styles.validationContainer}>
            <div className={styles.requirementsHeader}>
                <ShieldIcon size={16} className={styles.shieldIcon} />
                <p className={styles.requirementsTitle}>Requisitos:</p>
            </div>

       

            <ul className={styles.requirementsList}>
                {requirements.map((req, index) => {
                    const passed = req.test(value)
                    return (
                        <li key={index} className={styles.requirementItem}>
                            <div className={passed ? styles.iconContainerSuccess : styles.iconContainerError}>
                                {value ? (
                                    <CheckIcon className={styles.checkIcon} size={14} />
                                ) : (
                                    <XIcon className={styles.xIcon} size={14} />
                                )}
                            </div>
                            <span className={passed ? styles.requirementTextSuccess : styles.requirementText}>{req.label}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )

    return (
        <div className={styles.container}>
            <div className={styles.formGroup}>
             

                <Password
                    id="password"
                    value={value}
                    onChange={onChange}
                    name={name}

                   

                    promptLabel="Ingresa una contraseña"
                    weakLabel="Débil"
                    mediumLabel="Media"
                    strongLabel="Fuerte"

                    footer={passwordFooter}
                    className={styles.passwordInput}



                />
            </div>
        </div>
    )
}

export default PasswordValidation
