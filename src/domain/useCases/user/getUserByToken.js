export default class getUserByToken {
    constructor(Repository) {
        this.Repository = Repository;

    }

    async execute(id) {
        const response = await this.Repository.me();
        return response
    }
}

