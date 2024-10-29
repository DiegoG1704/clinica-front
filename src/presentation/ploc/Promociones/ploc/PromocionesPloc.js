// src/presentation/users/ploc/UsersPloc.js

import { Ploc } from "../../plocs";
const promocionInitialState = {
    kind: "InitialUsersState",
    loading: false,
    users: [],
    error: null,
};

export class PromocionesPloc extends Ploc {
    constructor(getPromocionUseCase) {
        super(promocionInitialState);
        this.getPromocionUseCase = getPromocionUseCase;
        // this.addPromocionUseCase = addPromocionUseCase;
        // this.updatePromocionUseCase = updatePromocionUseCase;
        // this.deletePromocionUseCase = deletePromocionUseCase;
        this.loadPromociones();
    }
    loadPromociones() {
        this.changeState({ ...this.state, loading: true });
        this.getPromocionUseCase.execute()
            .then(users => this.changeState({ ...this.state, loading: false, users }))
            .catch(error => this.changeState({ ...this.state, loading: false, error: "Error loading Promocion" }));
    }
    addPromocion(promocion) {
        this.addPromocion.execute(promocion)
            .then(() => this.loadPromociones())
            .catch(() => this.changeState({ ...this.state, error: "Failed to add Promocion" }));
    }
    updatePromocion(promocion) {
        this.updatePromocionUseCase.execute(promocion)
            .then(() => this.loadPromociones())
            .catch(() => this.changeState({ ...this.state, error: "Failed to update Promocion" }));
    }

    deletePromocion(userId) {
        this.deletePromocionUseCase.execute(userId)
            .then(() => this.loadPromociones())
            .catch(() => this.changeState({ ...this.state, error: "Failed to delete Promocion" }));
    }
}
