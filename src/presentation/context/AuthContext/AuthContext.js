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
// import VistaRepositoryImpl from '../../../data/repositoires/vistas/VistasRepositoryImpl';
// import GetAllVistas from '../../../domain/useCases/vistas/GetAllVistas';
import getUserByToken from '../../../domain/useCases/user/getUserByToken';
import Loader from '../../components/Loader/Loader';
import { LogoutUser } from '../../../domain/useCases/user/LogoutUser';
import { VerifyCodeUser } from '../../../domain/useCases/user/VerifyCodeUser';
import ZodValidateUserCode from '../../../data/validators/user/ZodValidateUserCode';
import { set } from 'zod';


// Crear el contexto
const AuthContext = createContext();

// Hook para acceder al contexto
export const useAuth = () => useContext(AuthContext);


// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    // STATE PRIVATE ROUTES
    const [LoaderPrivate, setLoaderPrivate] = useState(false)
    const [LoaderGuest, setLoaderGuest] = useState(false)
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
    //STATES VISTA
    // const VistasRepository = new VistaRepositoryImpl(apiAdapter)
    // const getAllVistasUseCase = new GetAllVistas(VistasRepository)
    //States ME
    const userRepository = new UserRepositoryImpl(apiAdapter)
    const getUserByTokenUseCase = new getUserByToken(userRepository)
    const [loading, setLoading] = useState(true);

    // LogOut
    const userLogoutUseCase = new LogoutUser(userRepository)
    //Validate code
    const validateUserCode = new ZodValidateUserCode()
    const validateUserCodeUseCase = new VerifyCodeUser(userRepository, validateUserCode)
    const login = async (correo, contraseña) => {
        try {
            const loggedInUser = await loginUseCase.execute({ "dni": correo, "contraseña": contraseña });
            if (loggedInUser.success) {

                setUser(loggedInUser?.data);
                // localStorage.setItem('user', JSON.stringify(loggedInUser?.data));
                // localStorage.setItem('token', (loggedInUser?.token));
                setIsAuthenticated(true);
            }
            return loggedInUser
        } catch (error) {
            console.error('Error during login:', error);
        }
    };
    const logout = async () => {
        // Espera 500ms antes de continuar, para evitar que se interrumpa la precarga
        await new Promise(resolve => setTimeout(resolve, 500));

        let response = await userLogoutUseCase.execute();

        if (response?.success) {
            setIsAuthenticated(false);
            setUser(null);
            setDatos(null);
            return true;
        } else {
            return false;
        }
    };

    // const autenticate = () => {
    //     const storedUser =(localStorage.getItem('token'));

    //     // Verifica si storedUser existe y no es nulo
    //     return storedUser !== null; // Devuelve true si hay un usuario almacenado, false de lo contrario
    // };

    const getUser = async () => {
        console.log("Verificando autenticación...");
        let response = await getUserByTokenUseCase.execute();
        if (response?.success) {
            setUser(response?.data);
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }


    };
    const checkAuthStatus = async () => {
        setLoading(true);
        let response = await getUserByTokenUseCase.execute();
        if (response?.success) {
            setUser(response?.data);
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
        setLoading(false);
    };
    const me = async () => {

        let response = await getUserByTokenUseCase.execute();
        if (response?.success) {
            setUser(response?.data);
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
        setLoading(false);
    };

    // Llamamos checkAuthStatus al montar la app

    useEffect(() => {

        checkAuthStatus();
    }, []);

    if (loading) {
        return <Loader isLoading={loading} />
    }






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
    const validateCode = async (data) => {
        const response = await validateUserCodeUseCase.execute(data)
        return response
    }




    return (
        <AuthContext.Provider value={{
            user, setUser, login, logout, isAuthenticated, Datos, setDatos, FindPersonWithDni,
            validateGeneralData, RegisterUser, setIsAuthenticated, getUser, validateCode,
            loading, setLoading, LoaderPrivate, setLoaderPrivate, LoaderGuest, setLoaderGuest, me
        }}>

            {children}
        </AuthContext.Provider>
    );
};
