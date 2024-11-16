export default class getUserByClinica {
    constructor(Repository, Validator) {
        this.Repository = Repository;

    }

    async execute(id) {
        const response = await this.Repository.getUserByClinica(id);
        return response
    }
}

