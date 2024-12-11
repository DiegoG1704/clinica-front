import { User } from "../../../domain/entities/user";
import FechaValueObject from "../../../domain/ValueObjects/FechaValueObject";




class UserMapper {
    static toDomain(data) {
        console.log("data-en",data)
        const fechaNacimiento = data.fechNac
        return new User(
            data.id,
            data.correo,
            data.contraseña,
            data.nombres,
            data.apellidos,
            data.dni,
            data.estadoCivil,
            data.rol,
            data.afiliadorId,
            data.clinica_id,
            fechaNacimiento,
            data.telefono,
            data.fotoPerfil,
            data.direccion,
            data.vistas
        );
    }
    static toData(user) {
        console.log("dat",user)
        const fechaNacimiento = new FechaValueObject(user.fechNac).convertirATexto();
        return {
            dni: user.dni,
            nombres: user.nombres,
            apellidos: user.apellidos,
            direccion: user.direccion,
            estado_civil: user.estadoCivil,
            fechNac: fechaNacimiento,
            correo: user.correo,
            contraseña: user.contraseña,
            telefono: user.telefono,
            rol_id: user.rol_id, // Asegúrate de usar el nombre correcto aquí
            fotoPerfil: user.fotoPerfil,
            clinica_id: user.clinica_id, // Asegúrate de usar el nombre correcto aquí
            "codigo2":user?.codigoPromotor
        };
    }
}

export default UserMapper;
