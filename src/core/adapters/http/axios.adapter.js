import axios from 'axios';

export default class AxiosAdapter {
    constructor({ baseUrl, params, getToken }) {
        this.axiosInstance = axios.create({ baseURL: baseUrl, params });
        this.axiosInstance.interceptors.request.use(
            (config) => {
                const token = getToken?.();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
    }
    async request(method, url, data = null) {
        const response = await this.axiosInstance({ method, url, data });
        return response.data;
    }

    get(url) {
        return this.request('get', url);
    }

    post(url, data) {
        return this.request('post', url, data);
    }

    put(url, data) {
        return this.request('put', url, data);
    }

    delete(url) {
        return this.request('delete', url);
    }
}
