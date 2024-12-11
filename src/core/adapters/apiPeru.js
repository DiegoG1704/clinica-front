import ApisPeruAdapter from "./http/ApisPeruAdapter";
import AxiosAdapter from "./http/axios.adapter";
import AxiosFetcher from "./http/AxiosFetcher";


export const fetcher = new AxiosAdapter({
    baseUrl: process.env.REACT_APP_API_APIS_PERU,
    params: {}
});
const apiPeruFetcher = new AxiosFetcher({
    baseUrl: process.env.REACT_APP_API_APIS_PERU,
    params: {}
})
export const apiPeruAdapter = new ApisPeruAdapter({
    fetcher: apiPeruFetcher,
    token: process.env.REACT_APP_API_TOKEN,
});