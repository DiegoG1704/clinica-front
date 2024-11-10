import { Clinica } from "../../../domain/entities/Clinica";
import FechaValueObject from "../../../domain/ValueObjects/FechaValueObject";



class ClinicaAdminMapper {
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
    static toData(data) {
        console.log("data-entrea",data)
        const fechaNacimiento = new FechaValueObject(data?.clinicaAdministrador?.fechNac,).convertirATexto();
        return {
            correo:data?.clinicaAdministrador?.correo,
            contraseña:data?.clinicaAdministrador?.contraseña,
            nombres: data?.clinicaAdministrador?.nombres, 
            apellidos:data?.clinicaAdministrador?.apellidos,
            dni:data?.clinicaAdministrador?.dni,
            estado_civil:data?.clinicaAdministrador?.estadoCivil,
            rol_id:data?.clinicaAdministrador?.rol_id,
            fechNac:fechaNacimiento,
            direccion:data?.clinicaAdministrador?.direccion,
            telefono:data?.clinicaAdministrador?.telefono,
            clinica:{
                nombre:data?.nombre,
                direccion:data?.direccion,
                ruc:data?.ruc,
                ubicacion:data?.ubicacion,
                telefonos:data?.telefono,
            },
        };
    }
    static toUpdateData(data) {
        console.log("data-entrea",data)
        
        return {
            
                id:data?.id,
                nombre:data?.nombre,
                direccion:data?.direccion,
                ruc:data?.ruc,
                ubicacion:data?.ubicacion,
                telefonos:data?.telefono,
            }
        
    }
    static toDomainArray(dataArray) {
      
        const list= dataArray.map(data => this.toDomain(data));
        console.log("dataaa",list)
        
        return dataArray.map(data => this.toDomain(data));
    }

   
}

export default ClinicaAdminMapper;
