export default class UserValidator {
  validateUserData(data) {
    throw new Error('validateUserData() debe ser implementado');
  }
  validarContraseñasIguales(contraseña, confirmacionContraseña) {
  
    try {
      if (contraseña !== confirmacionContraseña) {
        throw new Error('Las contraseñas no coinciden');
      }
      return { success: true}

    } catch (error) {
      return { success: false, errors: [error]}

    }

  }
}

