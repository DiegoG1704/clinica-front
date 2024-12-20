import AxiosAdapter from "./http/axios.adapter";

export const apiAdapter = new AxiosAdapter({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    params: {},
    getToken: () => localStorage.getItem('token')
});
