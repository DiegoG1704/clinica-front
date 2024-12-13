export default class PersonByDocumentMapper{
    static toData(data) {
        console.log("data",data)
        return {
            nombres:data?.nombres,
            apellidos:`${data?.apellido_paterno} ${data?.apellido_materno}`
        };
    }
}