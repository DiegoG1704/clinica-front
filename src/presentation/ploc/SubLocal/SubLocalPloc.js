// src/presentation/users/ploc/UsersPloc.js

import { Ploc } from "../plocs";


const localesInitialState = {
    kind: "InitialUsersState",
    loading: false,
    locales: [],
    error: null,
    openDialogCreate: false,
    local: { nombre: "", direccion: "", clinica_id: "" },
    clinica_id: 0,
    openDialogEdit: false,
    openDialogDelete: false
};

export class SubLocalPloc extends Ploc {
    constructor(getLocalUseCase, createSubLocalUseCase, updateSubLocalUseCase, deleteSubLocalUseCase) {
        super(localesInitialState);
        this.getLocalUseCase = getLocalUseCase;
        this.addSubLocal = createSubLocalUseCase
        this.updateSubLocalUseCase = updateSubLocalUseCase
        // this.updatePromocionUseCase = updatePromocionUseCase;
        this.deleteSubLocalUseCase = deleteSubLocalUseCase
        this.openDialogEdit = this.openDialogEdit.bind(this)
        this.updateSubLocal = this.updateSubLocal.bind(this)
        this.openDialogDelete = this.openDialogDelete.bind(this)

    }
    loadSubLocal(id) {
        if (this.state?.clinica_id === 0) {
            this.changeState({ ...this.state, clinica_id: id })
        }
        this.changeState({ ...this.state, loading: true });
        this.getLocalUseCase.execute(this.state?.clinica_id)
            .then(local => { this.changeState({ ...this.state, loading: false, locales: local?.data }) })
            .catch(error => this.changeState({ ...this.state, loading: false, error: "Error loading Promocion" }));

    }
    createSubLocal() {
        return this.addSubLocal.execute(this.state?.local)
            .then((response) => {
                console.log("data-tiun", response);
                if (response?.success) {
                    this.loadSubLocal();
                    this.cleanFieldSubLocal()
                    this.closeDialogCreate()
                }
                return response;
            });
    }
    cleanFieldSubLocal() {
        this.changeState({
            ...this.state,
            local: { ...this.state.local, nombre: "", direccion: "" }
        });

    }



    updateSubLocal() {

        return this.updateSubLocalUseCase.execute(this.state.local, this.state.local?.id)
            .then((response) => {
                // this.loadPromociones()
                if (response?.success) {
                    this.loadSubLocal();
                    this.cleanFieldSubLocal()
                    this.closeDialogEdit()
                }
                return response;
            }
            )
        // .catch(() => this.changeState({ ...this.state, error: "Failed to update Promocion" }));
    }

    deleteSubLocal() {
        return this.deleteSubLocalUseCase.execute(this?.state?.local?.id)
            .then((response) => {
                this.loadSubLocal()
                this.closeDialogDelete()
                this.cleanFieldSubLocal()
                return response
            })
    }
    openDialogCreate(clinica_id) {
        this.changeState({
            ...this.state,
            openDialogCreate: true,
            local: {
                ...this.state.local,
                "clinica_id": clinica_id
            }

        });
    }
    closeDialogCreate() {
        this.changeState({
            ...this.state,
            openDialogCreate: false,

        });
    }
    openDialogDelete(data) {
        this.changeState({
            ...this.state,
            openDialogDelete: true,
            local: data

        });
        console.log("estate", this.state)
    }
    closeDialogDelete() {
        this.changeState({
            ...this.state,
            openDialogDelete: false,

        });
    }
    updateLocalData(newData) {
        console.log("datq", newData)
        this.changeState({
            ...this.state,
            local: { ...this.state.local, ...newData }
        });

    }
    openDialogEdit(data) {
        this.changeState({
            ...this.state,
            openDialogEdit: true,
            local: data

        });
        console.log("estate", this.state)
    }

    closeDialogEdit() {
        this.changeState({
            ...this.state,
            openDialogEdit: false,

        });
    }


}
