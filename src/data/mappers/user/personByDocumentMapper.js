export default class PersonByDocumentMapper{
    static toData(data) {
        return {
            nombres:data?.nombres,
            apellidos:`${data?.apellidoPaterno} ${data?.apellidoMaterno}`
        };
    }
}