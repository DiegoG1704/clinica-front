// src/presentation/users/ploc/UsersPloc.js

import { Ploc } from "../plocs";


const configuracionInitialState = {
    kind: "InitialUsersState",
    loading: false,
    error: null,
    dataChangePassword: {
        "contraseña": "",
        "newcontraseña": ""
    },
    visibleDialogChangePassword: false
};

export class ConfiguracionPloc extends Ploc {
    constructor(changePassword) {
        super(configuracionInitialState);
        this.changePasswordUseCase = changePassword;
        this.changePassword = this.changePassword.bind(this);
        this.handlechange = this.handlechange.bind(this);

        this.showDialogChangePassword=this.showDialogChangePassword.bind(this)
        this.hideDialogChangePassword=this.hideDialogChangePassword.bind(this)

        // this.addPromocionUseCase = addPromocionUseCase;
        // this.updatePromocionUseCase = updatePromocionUseCase;
        // this.deletePromocionUseCase = deletePromocionUseCase;
        // this.loadClinica();
    }
    // loadClinica() {
    //     this.changeState({ ...this.state, loading: true });
    //     this.getClinicaUseCase.execute()
    //         .then(clinicas => {
    //             this.changeState({ ...this.state, loading: false, clinicas })
    //             return clinicas
    //         })
    //         .catch(error => this.changeState({ ...this.state, loading: false, error: "Error loading Promocion" }));
    // }
    changePassword(id) {
        return this.changePasswordUseCase.execute(id, this.state.dataChangePassword)
            .then(response => {
                // this.changeState({ ...this.state, loading: false, clinicas })
                return response
            })
            .catch(error => this.changeState({ ...this.state, loading: false, error: "Error loading Promocion" }));
    }
    handlechange(e) {
        console.log("ee", e.target.name)
        this.changeState({ ...this.state, dataChangePassword: { ...this.state.dataChangePassword, [e.target.name]: e.target.value } })
    }
    showDialogChangePassword() {
        this.changeState({ ...this.state, visibleDialogChangePassword:true})
    }
    hideDialogChangePassword() {
        this.changeState({
            ...this.state, dataChangePassword: {
                "contraseña": "",
                "newcontraseña": ""
            },
            visibleDialogChangePassword: false
        })
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
