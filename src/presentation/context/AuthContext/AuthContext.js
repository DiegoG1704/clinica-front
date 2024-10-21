import { createContext, useContext, useEffect, useState } from 'react';
import { AuthRepositoryImpl } from '../../../data/repositoires/user/AuthRepositoryImpl';
import { apiAdapter } from '../../../core/adapters/apiAdapter';
import { LoginUseCase } from '../../../domain/useCases/user/LoginUseCase';

// Crear el contexto
const AuthContext = createContext();

// Hook para acceder al contexto
export const useAuth = () => useContext(AuthContext);

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const authRepository = new AuthRepositoryImpl(apiAdapter);
    const loginUseCase = new LoginUseCase(authRepository);
    const [Datos,setDatos]=useState({})
    const login = async (correo, contraseña) => {
        try {
            const loggedInUser = await loginUseCase.execute({ correo, contraseña });
            setUser(loggedInUser);
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            return loggedInUser
        } catch (error) {
            console.error('Error during login:', error);
        }
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Establecer el usuario si existe en localStorage
        }
    }, []);
    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user,Datos,setDatos }}>
            {children}
        </AuthContext.Provider>
    );
};
