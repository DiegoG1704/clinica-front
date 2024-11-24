
class ValidateFilePromocion {
    constructor(filePromocionValidator) {
        this.filePromocionValidator = filePromocionValidator;
    }
     execute(data) {
        console.log("estas",typeof data)
        const result = this.filePromocionValidator.validateFileData(data)
        return result
    }
}

export default ValidateFilePromocion 