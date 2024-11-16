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
import VistaRepositoryImpl from '../../../data/repositoires/vistas/VistasRepositoryImpl';
import GetAllVistas from '../../../domain/useCases/vistas/GetAllVistas';
import getUserByToken from '../../../domain/useCases/user/getUserByToken';
import Loader from '../../components/Loader/Loader';

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
    //STATES VISTA
    const VistasRepository = new VistaRepositoryImpl(apiAdapter)
    const getAllVistasUseCase = new GetAllVistas(VistasRepository)
    //States ME
    const userRepository = new UserRepositoryImpl(apiAdapter)
    const getUserByTokenUseCase = new getUserByToken(userRepository)
    const [loading, setLoading] = useState(true);
    const [panel, setPanel] = useState(true)

    const login = async (correo, contraseña) => {
        try {
            const loggedInUser = await loginUseCase.execute({ correo, contraseña });
            if (loggedInUser.success) {
                console.log("data", loggedInUser)
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

    const logout = () => {
        setUser(null);
        // localStorage.removeItem('token');
        // localStorage.removeItem('user');
    };
    // const autenticate = () => {
    //     const storedUser =(localStorage.getItem('token'));

    //     // Verifica si storedUser existe y no es nulo
    //     return storedUser !== null; // Devuelve true si hay un usuario almacenado, false de lo contrario
    // };



    useEffect(() => {

        // const storedToken = localStorage.getItem('token');
        // console.log("dass",storedToken)
        // if (storedToken) {
        //     console.log("qii",setDatos)
        //     getAllVistas()
        //     setUser(JSON.parse(storedToken));
        //     setIsAuthenticated(true); 
        // }
        const checkAuthStatus = async () => {
            console.log("Verificando autenticación...");
            let response = await getUserByTokenUseCase.execute();
            if (response?.success) {
                setUser(response?.data);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
            setTimeout(() => {
                setLoading(false);  // Seteamos loading a false después de un pequeño retraso
            }, 2900);
            // Seteamos loading a false después de la verificación
        };

        checkAuthStatus();



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
    const getAllVistas = () => {
        getAllVistasUseCase.execute(user?.id)
    }
    const me = async () => {
        console.log("entre")
        let response = await getUserByTokenUseCase.execute();
        if (response?.success) {
            setUser(response?.data);
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    };
    const isUserAuthenticated = () => isAuthenticated;
    if (panel) {
        return <Loader isLoading={loading} setPanel={setPanel}></Loader>  // Puedes personalizar esta UI según tu diseño
    }

    return (
        <AuthContext.Provider value={{
            user, setUser, login, logout, isAuthenticated, Datos, setDatos, FindPersonWithDni,
            validateGeneralData, RegisterUser, setIsAuthenticated, isUserAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    );
};
