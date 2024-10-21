
export class User {
  constructor(id, correo, contraseña, nombres, apellidos, dni, estadoCivil, rolId, afiliadorId, clinicaId, fechNac, telefono, fotoPerfil, direccion,rutas) {
      this.id = id;
      this.correo = correo;
      this.contraseña = contraseña; // Considera cómo manejar la contraseña (no almacenarla en texto plano)
      this.nombres = nombres;
      this.apellidos = apellidos;
      this.dni = dni;
      this.estadoCivil = estadoCivil;
      this.rolId = rolId;
      this.afiliadorId = afiliadorId;
      this.clinicaId = clinicaId;
      this.fechNac = fechNac;
      this.telefono = telefono;
      this.fotoPerfil = fotoPerfil;
      this.direccion = direccion;
      this.rutas=rutas;
  }
}