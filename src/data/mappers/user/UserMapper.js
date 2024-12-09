import { DateTime } from "luxon";
import { User } from "../../../domain/entities/user";
import FechaValueObject from "../../../domain/ValueObjects/FechaValueObject";




class UserMapper {
    static toDomain(data) {
        console.log("data-en", data)
        const fechaNacimiento = new Date(data.fechNac)
        console.log("newDate", fechaNacimiento)
        const rol = Number(data?.rol_id)
        return new User(
            data.id,
            data.correo,
            data.contraseña,
            data.nombres,
            data.apellidos,
            data.dni,
            data.estadoCivil,
            rol,
            data.afiliadorId,
            data.clinica_id,
            fechaNacimiento,
            data.telefono,
            data.fotoPerfil,
            data.direccion,
            data.vistas,
            data.estado,
            data.estadoPr,
            data.codigo,
            data.local_id,
            data.rol

        );
    }
    static toData(user) {
        console.log("dat", user)
        let fechaNacimiento = user.fechNac
        if (user.fechNac) {
            fechaNacimiento = new FechaValueObject(user.fechNac).convertirATexto();
        }

        // const fechaNacimiento =user.fechNac
        return {
            dni: user.dni,
            nombres: user.nombres,
            apellidos: user.apellidos,
            direccion: user.direccion,
            estadoCivil: user.estadoCivil,
            fechNac: fechaNacimiento,
            correo: user.correo,
            contraseña: user.contraseña,
            telefono: user.telefono,
            rol_id: user.rol_id, // Asegúrate de usar el nombre correcto aquí
            fotoPerfil: user.fotoPerfil,
            clinica_id: user.clinica_id, // Asegúrate de usar el nombre correcto aquí
            local_id: user.local_id,

        };
    }
}

export default UserMapper;
