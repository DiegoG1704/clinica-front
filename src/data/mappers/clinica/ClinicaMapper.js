import { Clinica } from "../../../domain/entities/Clinica";



class ClinicaMapper {
    static toDomain(data) {
        console.log('imagenes', data)
        let logoUrl = data?.IsoTipo
            ? `${process.env.REACT_APP_API_BASE_URL}uploads/${data.IsoTipo}`
            : `${process.env.REACT_APP_API_BASE_URL}uploads/hospital-default.jpg`;

        let ImagoTipo = data?.ImagoTipo
            ? `${process.env.REACT_APP_API_BASE_URL}uploads/${data.ImagoTipo}`
            : `${process.env.REACT_APP_API_BASE_URL}uploads/hospital-default.jpg`;
        let tarifaUrl =data?.tarifario
            ? `${process.env.REACT_APP_API_BASE_URL}${data?.tarifario}`
            : null;
        
        return new Clinica(
            data?.id,
            data?.nombre,
            data?.direccion,
            data?.ruc,
            data?.ubicacion,
            data?.telefonos,
            ImagoTipo,
            logoUrl,
            tarifaUrl

        );
    }
    static toData(clinica) {
        return {
            nombre: clinica?.nombre,
            direccion: clinica?.direccion,
            ruc: clinica?.ruc,
            ubicacion: clinica?.ubicacion,
            telefonos: clinica?.telefonos,
            ImagenTipo: clinica?.image,
            IsoTipo: clinica?.logo
        };
    }
    static toDomainArray(dataArray) {

        const list = dataArray.map(data => this.toDomain(data));
        console.log("dataaa", list)

        return dataArray.map(data => this.toDomain(data));
    }


}

export default ClinicaMapper;
