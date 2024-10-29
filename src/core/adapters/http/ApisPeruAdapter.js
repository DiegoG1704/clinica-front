

export default class ApisPeruAdapter   {
    constructor({fetcher,token}) {
        this.fetcher = fetcher;
        this.token=token
    }
    async get(dni) {
        let uriRequest=`${dni}?token=${this.token}`
        const response = await this.fetcher.get(uriRequest);
      
        return response;
    }
}
