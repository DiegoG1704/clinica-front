export default class PersonByRucMapper {
    static toData(data) {
        console.log("asasa", data)
        return {
            ruc: data?.id,
            nombres: data?.razon_social,
            direccion: data?.direccion,
            distrito: data?.distrito
        };
    }
}