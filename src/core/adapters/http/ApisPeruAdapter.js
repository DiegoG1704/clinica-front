

export default class ApisPeruAdapter   {
    constructor({fetcher,token}) {
        this.fetcher = fetcher;
        this.token=token
    }
    async get(dni) {
        // dni/simple?document={document}&key={cGVydWRldnMucHJvZHVjdGlvbi5maXRjb2RlcnMuNjc1OWM1MWU5ZmE0MTczZjYxMzIwNTY0}
        let uriRequest=`dni/simple?document=${dni}&key=${this.token}`
        const response = await this.fetcher.get(uriRequest);
      
        return response;
    }
    async getRUC(ruc) {
        let uriRequest=`ruc?document=${ruc}&key=${this.token}`
        const response = await this.fetcher.get(uriRequest);
        return response;
    }
}
