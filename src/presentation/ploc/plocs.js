// src/shared/ploc/Ploc.js

export  class Ploc {
    constructor(initialState) {
        this.state = initialState;
        this.listeners = [];
    }

    // Obtiene el estado actual
    getState() {
        return this.state;
    }

    // Cambia el estado y notifica a los suscriptores
    changeState(newState) {
        this.state = newState;
        this.notifyListeners();
    }

    // Notifica a todos los suscriptores del cambio de estado
    notifyListeners() {
        this.listeners.forEach(listener => listener(this.state));
    }

    // Agrega un suscriptor
    subscribe(listener) {
        this.listeners.push(listener);
    }

    // Elimina un suscriptor
    unsubscribe(listener) {
        this.listeners = this.listeners.filter(sub => sub !== listener);
    }
}
