// src/presentation/users/ploc/UsersPloc.js

import { Ploc } from "../plocs";


const clinicaInitialState = {
    kind: "InitialUsersState",
    loading: false,
    clinicas: [],
    error: null,
};

export class ClinicaPloc extends Ploc {
    constructor(getClinicaUseCase, UploadTarifario) {
        super(clinicaInitialState);
        this.getClinicaUseCase = getClinicaUseCase;
        this.uploadTarifarioUseCase= UploadTarifario
        // this.addPromocionUseCase = addPromocionUseCase;
        // this.updatePromocionUseCase = updatePromocionUseCase;
        // this.deletePromocionUseCase = deletePromocionUseCase;
        // this.loadClinica();
    }
    loadClinica() {
        this.changeState({ ...this.state, loading: true });
        this.getClinicaUseCase.execute()
            .then(clinicas => {
                this.changeState({ ...this.state, loading: false, clinicas })
                return clinicas
            })
            .catch(error => this.changeState({ ...this.state, loading: false, error: "Error loading Promocion" }));
    }
    // addPromocion(promocion) {
    //     this.addPromocion.execute(promocion)
    //         .then(() => this.loadPromociones())
    //         .catch(() => this.changeState({ ...this.state, error: "Failed to add Promocion" }));
    // }
    // updatePromocion(promocion) {
    //     this.updatePromocionUseCase.execute(promocion)
    //         .then(() => this.loadPromociones())
    //         .catch(() => this.changeState({ ...this.state, error: "Failed to update Promocion" }));
    // }

    // deletePromocion(userId) {
    //     this.deletePromocionUseCase.execute(userId)
    //         .then(() => this.loadPromociones())
    //         .catch(() => this.changeState({ ...this.state, error: "Failed to delete Promocion" }));
    // }
}
