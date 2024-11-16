import { createContext, useContext, useEffect, useState } from 'react';
import { AuthRepositoryImpl } from '../../../data/repositoires/user/AuthRepositoryImpl';
import { apiAdapter } from '../../../core/adapters/apiAdapter';
import { LoginUseCase } from '../../../domain/useCases/user/LoginUseCase';
import ZodAuthValidator from '../../../data/validators/auth/ZodAuthValidator';
import PersonaApiRepositoryImpl from '../../../data/repositoires/user/PersonaApiRepositoryImpl';
import { apiPeruAdapter } from '../../../core/adapters/apiPeru';
import FindDataByDoc from '../../../domain/useCases/user/FindDataByDoc';
import ZodDniValidator from '../../../data/validators/user/ZodDniValidator';
import VerifyGeneralData from '../../../domain/useCases/user/VerifyGeneralData';
import ZodGeneralDataValidatorImpl from '../../../data/validators/user/ZodGeneralDataValidator';
import ZodUserValidator from '../../../data/validators/user/ZodUserValidator';
import UserRepositoryImpl from '../../../data/repositoires/user/UserRepositoryImpl';
import CreateUser from '../../../domain/useCases/user/CreateUser';

// Crear el contexto
const AuthContext = createContext();

// Hook para acceder al contexto
export const useAuth = () => useContext(AuthContext);


// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    //STATES PARA EL LOGIN
   
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const LoginValidator = new ZodAuthValidator()
    const authRepository = new AuthRepositoryImpl(apiAdapter);
    const loginUseCase = new LoginUseCase(authRepository, LoginValidator);
    const [Datos, setDatos] = useState({})
    //STATES PARA EL REGISTER FIRS PAGE
    const DocumentValidator = new ZodDniValidator()
    const PersonaApiRepository = new PersonaApiRepositoryImpl(apiPeruAdapter)
    const FindDataByDocUseCase = new FindDataByDoc(PersonaApiRepository, DocumentValidator)
    const verifyGeneralDataValidator = new ZodGeneralDataValidatorImpl()
    const verifyGeneralData = new VerifyGeneralData(verifyGeneralDataValidator)
    //STATES PARA EL FINAL REGISTER
    const RegisterValidator = new ZodUserValidator()
    const RegisterApiRepository = new UserRepositoryImpl(apiAdapter)
    const RegisterUseCase = new CreateUser(RegisterApiRepository, RegisterValidator)

    const login = async (correo, contraseña) => {
        try {
            const loggedInUser = await loginUseCase.execute({ correo, contraseña });
            if (loggedInUser.success) {
                console.log("data",loggedInUser)
                setUser(loggedInUser?.data);
                localStorage.setItem('user', JSON.stringify(loggedInUser?.data));
                localStorage.setItem('token', (loggedInUser?.token));
           

                setIsAuthenticated(true); 
            }
            return loggedInUser
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };
    const autenticate = () => {
        const storedUser =(localStorage.getItem('token'));
        
        // Verifica si storedUser existe y no es nulo
        return storedUser !== null; // Devuelve true si hay un usuario almacenado, false de lo contrario
    };
    
    

    useEffect(() => {
        
        const storedUser = localStorage.getItem('user');
        console.log("dass",storedUser)
        if (storedUser) {
            console.log("qii",setDatos)
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true); 
        }
    }, []);

    const FindPersonWithDni = async (dni) => {
        try {
            const response = await FindDataByDocUseCase.execute(dni);
            return response
        } catch (error) {
            console.error('Error during login:', error);
        }
    }


    const validateGeneralData = (data) => {
        try {
            const response = verifyGeneralData.execute(data)
            return response
        } catch (error) {
            console.error('Error during login:', error);
        }
    }
    const RegisterUser = async (data) => {
        try {
            const loggedInUser = await RegisterUseCase.execute(data);
            return loggedInUser
        } catch (error) {
            console.error('Error during login:', error);
        }

    }


    return (
        <AuthContext.Provider value={{ user, login, logout,  isAuthenticated, Datos, setDatos, FindPersonWithDni, validateGeneralData ,RegisterUser,autenticate}}>
            {children}
        </AuthContext.Provider>
    );
};
