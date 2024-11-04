import axios from 'axios';

export default class AxiosAdapter  {
    constructor({ baseUrl, params }) {
        this.axiosInstance = axios.create({ baseURL: baseUrl, params });
    }

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
