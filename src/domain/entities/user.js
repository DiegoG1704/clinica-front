
export class User {
  constructor(id, correo, contraseña, nombres, apellidos, dni, estadoCivil, rolId, afiliadorId, clinica_id, fechNac, telefono, fotoPerfil, direccion,rutas,estado,estadoPr,codigo,local_id,rol) {
      this.id = id;
      this.correo = correo;
      // this.contraseña = contraseña;
      this.nombres = nombres;
      this.apellidos = apellidos;
      this.dni = dni;
      this.estadoCivil = estadoCivil;
      this.rolId = rolId;
      this.afiliadorId = afiliadorId;
      this.clinica_id = clinica_id;
      this.fechNac = fechNac;
      this.telefono = telefono;
      this.fotoPerfil = fotoPerfil;
      this.direccion = direccion;
      this.rutas=rutas;
      this.estado=estado;
      this.estadoPr=estadoPr;
      this.codigo=codigo;
      this.local_id=local_id
      this.rol=rol
     
  }
}