// src/presentation/users/ploc/UsersPloc.js

import { Ploc } from "../plocs";


const SubAdminInitialState = {
    kind: "InitialSubAdminState",
    loading: false,
    usuarios: [],
    error: null,
    openDialogCreate: false,
    subAdmin: {
        nombres: "", apellidos: "",
        telefono: null,
        fechNac: null,
        direccion: null,
        correo: "",
        contraseña: "",
        confirmPassword: "",
        local_id: "",
        dni: "",
        rol_id: 5,
        clinica_id: 0,

    },
    locales: [],
    user_id: 0,
    clinica_id: 0,
    openDialogEdit: false,
    openDialogDelete: false,
};

export class SubAdminPloc extends Ploc {
    constructor(getAllSubAdmin, createSubAdmin, getAllLocales, FindDataByDoc, updateSubAdminUseCase, deleteSubAdmin) {
        super(SubAdminInitialState);
        this.getAllSubAdminUseCase = getAllSubAdmin;
        this.createSubAdminUseCase = createSubAdmin;
        this.updateSubAdminUseCase = updateSubAdminUseCase;
        this.deleteSubAdminUseCase = deleteSubAdmin;
        this.getAllLocalesUseCase = getAllLocales
        this.FindDataByDocUseCase = FindDataByDoc
        this.openDialogCreate = this.openDialogCreate.bind(this)
        this.openDialogEdit = this.openDialogEdit.bind(this)
        this.closeDialogEdit = this.closeDialogEdit.bind(this)
        // this.updateSubLocal = this.updateSubLocal.bind(this)
        this.openDialogConfirmDelete = this.openDialogConfirmDelete.bind(this)
        this.closeDialogCreate = this.closeDialogCreate.bind(this)
        this.handlechange = this.handlechange.bind(this)
        this.findDoc = this.findDoc.bind(this)
        this.createUser = this.createUser.bind(this)
        this.updateSubAdmin = this.updateSubAdmin.bind(this)
        this.closeDialogDelete = this.closeDialogDelete.bind(this)

    }
    loadLocales(id) {
        if (this.state?.clinica_id === 0) {
            this.changeState({ ...this.state, clinica_id: id, })
        }
        this.changeState({ ...this.state, loading: true });
        this.getAllLocalesUseCase.execute(this.state?.clinica_id)
            .then(locales => { console.log("zz", locales); this.changeState({ ...this.state, loading: false, locales: locales?.data }) })
            .catch(error => this.changeState({ ...this.state, loading: false, error: "Error loading Promocion" }));
    }
    loadUsers(id) {
        console.log("entre", id)

        if (this.state?.clinica_id === 0) {
            this.changeState({ ...this.state, clinica_id: id, subAdmin: { ...this.state.subAdmin, clinica_id: id } })
        }
        this.changeState({ ...this.state, loading: true });
        this.getAllSubAdminUseCase.execute(this.state?.clinica_id)
            .then(usuarios => { console.log("zz2", usuarios); this.changeState({ ...this.state, loading: false, usuarios: usuarios }) })
            .catch(error => this.changeState({ ...this.state, loading: false, error: "Error loading Promocion" }));
    }
    createUser() {
        return this.createSubAdminUseCase.execute(this.state?.subAdmin)
            .then((response) => {
                console.log("data-tiun", response);
                if (response?.success) {
                    this.loadUsers();
                    this.cleanFieldUser()
                    this.closeDialogCreate()
                }
                return response;
            });
    }
    cleanFieldUser() {
        this.changeState({
            ...this.state,
            subAdmin: {
                nombres: "", apellidos: "",
                telefono: null,
                fechNac: null,
                direccion: null,
                correo: "",
                contraseña: "",
                confirmPassword: "",
                local_id: "",
                dni: "",
                rol_id: 5,
                clinica_id:this.state.clinica_id
            }
        });

    }
    findDoc() {
        return this.FindDataByDocUseCase.execute(this.state?.subAdmin?.dni)
            .then((response) => {
                console.log("data-tiun", response);
                if (response?.success) {
                    this.changeState({
                        ...this.state,
                        subAdmin: { ...this.state.subAdmin, nombres: response?.data?.nombres, apellidos: response?.data?.apellidos }
                    });
                }
                return response;
            });
    }



    updateSubAdmin() {

        return this.updateSubAdminUseCase.execute( this.state.subAdmin.id,this.state.subAdmin)
            .then((response) => {
                // this.loadPromociones()
                if (response?.success) {
                    this.loadUsers();
                    this.cleanFieldUser()
                    this.closeDialogEdit()
                }
                return response;
            }
            )
        // .catch(() => this.changeState({ ...this.state, error: "Failed to update Promocion" }));
    }

    // Eliminar usuario
    deleteSubAdmin() {
        this.changeState({ ...this.state, loading: true });
        return this.deleteSubAdminUseCase.execute(this.state.subAdmin.id)
            .then((response) => {
                if (response?.success) {
                    this.loadUsers(this.state.clinica_id);
                    this.closeDialogDelete();
                }
                return response;
            })
            .finally(() => {
                this.changeState({ ...this.state, loading: false });
            });
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
        this.cleanFieldUser()
    }
    openDialogConfirmDelete(data) {

        this.changeState({
            ...this.state,
            openDialogDelete: true,
            subAdmin: data

        });
    }
    closeDialogDelete() {
        console.log("cerrando")
        this.changeState({
            ...this.state,
            openDialogDelete: false,

        });
        this.cleanFieldUser()
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
            subAdmin: { ...data, rol_id: "5", clinica_id: this.state.clinica_id }
        });
        console.log("estate", this.state)
    }

    closeDialogEdit() {
        this.changeState({
            ...this.state,
            openDialogEdit: false,
        });
        this.cleanFieldUser()

    }
    handlechange(e) {
        console.log("ee", e?.target?.name)
        this.changeState({ ...this.state, subAdmin: { ...this.state.subAdmin, [e.target.name]: e.target.value } })
    }


}
