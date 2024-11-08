

export default class ApisPeruAdapter   {
    constructor({fetcher,token}) {
        this.fetcher = fetcher;
        this.token=token
    }
    async get(dni) {
        let uriRequest=`dni/${dni}?token=${this.token}`
        const response = await this.fetcher.get(uriRequest);
      
        return response;
    }
    async getRUC(ruc) {
        let uriRequest=`ruc/${ruc}?token=${this.token}`
        const response = await this.fetcher.get(uriRequest);
        return response;
    }
}
