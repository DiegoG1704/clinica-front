import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { history } from '../../../presentation/utils/history';

export default class AxiosAdapter {
    constructor({ baseUrl }) {
        this.axiosInstance = axios.create({
            baseURL: baseUrl,
            withCredentials: true, // Para enviar cookies (accessToken y refreshToken)
        });

        this.navigate = history;

        this.axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => await this.handleResponseError(error)
        );
    }

    // Manejo de errores de respuesta
    async handleResponseError(error) {
        const status = error.response?.status;

        // Caso: refresh token falló y el usuario debe iniciar sesión nuevamente
        if (status === 401 && this.isCriticalError(error)) {
           
            history.navigate("/login")
            window.location.reload();
        }

        return Promise.reject(error);
    }

    // Verificar si el error es crítico (ejemplo: refresh token inválido)
    isCriticalError(error) {
        const errorMessage = error.response?.data?.message || '';
        return (
            errorMessage.includes('Refresh token inválido') || // Define aquí los mensajes clave
            errorMessage.includes('No autorizado, no se pudo renovar el token')
        );
    }

    // async refreshAccessToken() {
    //     // Lógica para refrescar el token, dependiendo de cómo tengas configurado el backend
    //     // Aquí podrías hacer una solicitud al backend para obtener un nuevo accessToken usando el refreshToken
    //     const response = await axios.post('/refresh-token');
    //     return response.data;
    // }
    async get(url) {
        const response = await this.axiosInstance.get(url);
        return response.data;
    }

    async post(url, data) {
        const response = await this.axiosInstance.post(url, data);
        return response.data;
    }

    async put(url, data) {
        const response = await this.axiosInstance.put(url, data);
        return response.data;
    }

    async delete(url) {
        const response = await this.axiosInstance.delete(url);
        return response.data;
    }
}
