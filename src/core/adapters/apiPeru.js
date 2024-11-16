import ApisPeruAdapter from "./http/ApisPeruAdapter";
import AxiosAdapter from "./http/axios.adapter";


export const fetcher = new AxiosAdapter({
    baseUrl: process.env.REACT_APP_API_APIS_PERU,
    params: {}
});
export const apiPeruAdapter = new ApisPeruAdapter({
    fetcher:fetcher,
    token:process.env.REACT_APP_API_TOKEN,
});