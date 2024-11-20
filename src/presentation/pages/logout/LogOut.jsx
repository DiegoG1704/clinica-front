import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { useEffect } from "react";
import { history } from "../../utils/history";

export default function LogoutPage() {
    const { isLoggingOut } = useAuth(); // Accede al estado de logout desde el contexto

    // Limpia el estado de logout y redirige
    useEffect(() => {
        if (isLoggingOut) {
            const timer = setTimeout(() => {
                history.navigate("/login", { replace: true });
            }, 100); // Tiempo breve para evitar flickers
            return () => clearTimeout(timer); // Limpia el timer
        }
    }, [isLoggingOut]);

    // Redirige si no es un logout legítimo
    if (!isLoggingOut) {
        return <Navigate to="/login" replace />;
    }

    return null; // No renderiza nada
}


