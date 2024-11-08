export default class PersonByRucMapper{
    static toData(data) {
        return {
            ruc:data?.ruc,
            nombres:data?.razonSocial,
            direccion:data?.direccion
        };
    }
}