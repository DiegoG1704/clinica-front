import { Clinica } from "../../../domain/entities/Clinica";



class ClinicaMapper {
    static toDomain(data) {
      
        return new Clinica(
            data?.id,
            data?.nombre,
            data?.direccion,
            data?.ruc,
            data?.ubicacion,
            data?.telefono,
            data?.ImagenTipo,
            data?.logo
        );
    }
    static toData(clinica) {
        return {
            nombre: clinica?.nombre, 
            direccion:clinica?.direccion,
            ruc:clinica?.ruc,
            ubicacion:clinica?.ubicacion,
            telefonos:clinica?.telefonos,
            ImagenTipo:clinica?.image,
            IsoTipo:clinica?.logo
        };
    }
    static toDomainArray(dataArray) {
        console.log("dataaa",dataArray)
        
        return dataArray.map(data => this.toDomain(data));
    }

   
}

export default ClinicaMapper;
