import { User } from "../../domain/entities/user";



class UserMapper {
    static toDomain(data) {
        console.log("domain",data)
        return new User(
            data.id,
            data.correo,
            data.contraseña,
            data.nombres,
            data.apellidos,
            data.dni,
            data.estadoCivil,
            data.rolId,
            data.afiliadorId,
            data.clinicaId,
            data.fechNac,
            data.telefono,
            data.fotoPerfil,
            data.direccion,
            data.rutas
        );
    }
    static toData(user) {
        return {
            dni: user.dni,
            nombres: user.nombres,
            apellidos: user.apellidos,
            direccion: user.direccion,
            estadoCivil: user.estadoCivil,
            fechNac: user.fechNac,
            correo: user.correo,
            contraseña: user.contraseña,
            telefono: user.telefono,
            rol_id: user.rolId, // Asegúrate de usar el nombre correcto aquí
            fotoPerfil: user.fotoPerfil,
            clinica_id: user.clinicaId // Asegúrate de usar el nombre correcto aquí
        };
    }
}

export default UserMapper;
