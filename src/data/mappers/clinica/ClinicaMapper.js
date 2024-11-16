import { Clinica } from "../../../domain/entities/Clinica";



class ClinicaMapper {
    static toDomain(data) {
        let logoUrl=`${process.env.REACT_APP_API_BASE_URL}uploads/${data?.IsoTipo}`
        
        return new Clinica(
            data?.id,
            data?.nombre,
            data?.direccion,
            data?.ruc,
            data?.ubicacion,
            data?.telefonos,
            data?.ImagenTipo,
            logoUrl
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
      
        const list= dataArray.map(data => this.toDomain(data));
        console.log("dataaa",list)
        
        return dataArray.map(data => this.toDomain(data));
    }

   
}

export default ClinicaMapper;
