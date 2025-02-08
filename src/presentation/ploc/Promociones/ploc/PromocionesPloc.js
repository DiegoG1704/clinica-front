// src/presentation/users/ploc/UsersPloc.js

import { Ploc } from "../../plocs";

const promocionInitialState = {
    kind: "InitialUsersState",
    loading: false,
    clinicas: [],
    error: null,
    visiableCreatePromocion: false,
    clinica_id: 0,
    file: { name: "", archivo: null, url: "" }

};

export class PromocionesPloc extends Ploc {
    constructor(getPromocionUseCase, getAllClinicas, validateFilePromocion, uploadTarifario) {
        super(promocionInitialState);
        this.getPromocionUseCase = getPromocionUseCase;
        this.getAllClinicas = getAllClinicas;
        this.validateFilePromocion = validateFilePromocion
        this.uploadTarifarioUseCase = uploadTarifario


        // this.addPromocionUseCase = addPromocionUseCase;
        // this.updatePromocionUseCase = updatePromocionUseCase;
        // this.deletePromocionUseCase = deletePromocionUseCase;
        this.showDialogCreate = this.showDialogCreate.bind(this)
        this.hideDialogCreate = this.hideDialogCreate.bind(this)
        this.selectFileToSend = this.selectFileToSend.bind(this)
        this.sendTarifario = this.sendTarifario.bind(this)
        this.loadPromociones();
        this.loadClinicas()

    }
    loadClinicas() {
        this.changeState({ ...this.state, loading: true });
        this.getAllClinicas.execute()
            .then(clinicas => this.changeState({ ...this.state, loading: false, clinicas: clinicas }))
            .catch(error => this.changeState({ ...this.state, loading: false, error: "Error loading Promocion" }));
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
    showDialogCreate(id, url) {
        this.changeState({ ...this.state, clinica_id: id, visiableCreatePromocion: true, file: { ...this.state.file, "url": url } })
    }
    hideDialogCreate() {
        this.changeState({ ...this.state, clinica_id: 0, visiableCreatePromocion: false, file: { name: "", archivo: null, url: "" } })

    }
    selectFileToSend(event) {
        const file = event.target.files[0];
        let response = this.validateFilePromocion.execute({ archivo: file })

        if (!response.success) {
            return response;
        } else {
            let urlFile = URL.createObjectURL(file);
            this.changeState({ ...this.state, "file": { archivo: file, name: file.name, url: urlFile } })
            return { success: true, data: "Archivo PDF cargado correctamente" }
        }

    }


    async sendTarifario() {
        try {
            const response = await this.uploadTarifarioUseCase.execute({ archivo: this.state.file.archivo, clinica_id: this.state.clinica_id })
            if (response.success) {
                this.hideDialogCreate()
                this.loadClinicas()
            } else {
                this.changeState({ ...this.state, error: "Failed to add Promocion" })
            }
        } catch (error) {
            this.changeState({ ...this.state, error: "Failed to add Promocion" })

        }



        return

    }
}
