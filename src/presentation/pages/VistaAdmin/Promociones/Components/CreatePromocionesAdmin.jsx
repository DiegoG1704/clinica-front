import React, { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import CustomDialog from "../../../../components/Dialog/CustomDialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { showToast, showToastWithErrors } from "../../../../utils/showToast";

import fileNotfound from "../../../../img/FileNotFound.png"

const CreatePromocionesAdmin = ({ visible, setVisible, selectFileToSend, urlFile, fileName,sendTarifario }) => {
    const toast = useRef(null);
    const file = useRef(null)
    const handleFileUpload = (event) => {
        let response = selectFileToSend(event);
        console.log("respues", response)
        if (response.success) {
            showToast("success", "Archivo cargado", response.data, toast)
        } else {
            showToastWithErrors("error", "Archivo no cargado", response.errors, toast)
        }
    };
    const handleButtonClick = () => {
        if (file.current) {
            file.current.click(); // Simula el clic en el input oculto
        }
    };
    const footerTemplate = () => (
        <div className="">
            <Button
                className="bg-white border-none shadow-none"
                style={{ color: "#85C226" }}
                label="Cancelar"
                onClick={() => setVisible(false)}
            />
            <Button
                className="border-none shadow-none"
                style={{ color: "#fff", backgroundColor: "#85C226" }}
                label="Guardar"
                onClick={()=>{sendTarifario()}}
            />
        </div>
    );

    return (
        <>
            <Toast ref={toast} />
            <CustomDialog
                iconClassName={"pi pi-file-excel"}
                title={"Subir Promociones"}
                visible={visible}
                footer={footerTemplate}
                height={"100vh"}
                width="900px"
                onhide={setVisible}

            >
                <div className="flex flex-column gap-2 h-full">

                    <div className="flex flex-column gap-2">
                        <label htmlFor="excel">Subir Archivo Excel</label>
                        <input
                            ref={file}
                            id="excel"
                            type="file"
                            accept=".pdf"
                            onChange={handleFileUpload}
                            style={{ border: "1px solid #ccc", padding: "5px", borderRadius: "4px", display: "none" }}
                        />
                        <div className="w-full">
                            <InputText className="w-11" disabled={true} value={fileName} />
                            <Button icon="pi pi-upload" className="w-1 " onClick={handleButtonClick} />
                        </div>

                    </div>
                    <div className="w-full h-full " >
                        {urlFile ? (
                            <iframe src={urlFile} style={{ width: "100%", height: "100%" }}></iframe>
                        ) : (
                            <img src={fileNotfound} alt="File not found" style={{ width: "100%", height: "100%" }} />
                        )}

                    </div>


                </div>
            </CustomDialog>
        </>
    );
};

export default CreatePromocionesAdmin;
