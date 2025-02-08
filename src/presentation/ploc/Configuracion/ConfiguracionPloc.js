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
    visibleDialogChangePassword: false,
    general_info: {
        correo: "",
        telefono: "",
        direccion: "",
        rol_id: 5,
    },
    visibleDialogGeneralInfo: false
    // user_id:0
};

export class ConfiguracionPloc extends Ploc {
    constructor(changePassword, updateGeneralData) {
        super(configuracionInitialState);
        this.changePasswordUseCase = changePassword;
        this.changePassword = this.changePassword.bind(this);
        this.handlechange = this.handlechange.bind(this);
        this.updateGeneralDataUseCase = updateGeneralData

        this.showDialogChangePassword = this.showDialogChangePassword.bind(this)
        this.hideDialogChangePassword = this.hideDialogChangePassword.bind(this)

        this.openDialogGeneralInfo = this.openDialogGeneralInfo.bind(this)
        this.closeDialogGeneralInfo = this.closeDialogGeneralInfo.bind(this)
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
        this.changeState({ ...this.state, visibleDialogChangePassword: true })
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
    handleChangeGeneralInfo(e) {
        console.log("ee", e.target.name)
        this.changeState({ ...this.state, general_info: { ...this.state.general_info, [e.target.name]: e.target.value } })
    }
    updateGeneralData(id) {
        return this.updateGeneralDataUseCase.execute(this.state.general_info, id)
            .then(response => {
                // this.changeState({ ...this.state, loading: false, clinicas })
                if (response?.success) {
                    this.cleanFields()
                    this.closeDialogGeneralInfo()

                }
                return response
            })
            .catch(error => this.changeState({ ...this.state, loading: false, error: "Error loading Promocion" }));
    }
    cleanFields() {
        this.changeState({
            ...this.state, general_info: {
                correo: "",
                telefono: "",
                direccion: ""
            },
        })
    }
    openDialogGeneralInfo(data) {
        console.log("entssa")
        this.changeState({
            ...this.state, visibleDialogGeneralInfo: true,
            general_info:{correo:data?.correo,direccion:data?.direccion,telefono:data?.telefono}
        })
    }
    closeDialogGeneralInfo() {
        this.changeState({
            ...this.state, visibleDialogGeneralInfo: false
        })
        this.cleanFields()
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
