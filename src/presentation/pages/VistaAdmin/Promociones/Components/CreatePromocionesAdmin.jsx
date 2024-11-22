import React, { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import CustomDialog from "../../../../components/Dialog/CustomDialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import InputInteger from "../../../../components/Inputs/InputNumberInteger/InputInteger";
import * as XLSX from "xlsx";
import CustomTable from "../../../../components/Table/CustomTable";
import { Column } from "primereact/column";

const CreatePromocionesAdmin = ({visible,setVisible}) => {

    const [excelData, setExcelData] = useState([]);
    const [columns, setColumns] = useState([]); // Para manejar las columnas dinámicas
    const toast = useRef(null);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            toast.current.show({ severity: "error", summary: "Error", detail: "No se seleccionó un archivo", life: 3000 });
            return;
        }

        try {
            const fileData = await file.arrayBuffer();
            const workbook = XLSX.read(fileData, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Leer con encabezados

            if (jsonData.length > 0) {
                // Configurar las columnas dinámicas
                const cols = jsonData[0].map((col) => ({
                    field: col,
                    header: col,
                }));
                setColumns(cols);

                // Configurar los datos de la tabla
                const rows = jsonData.slice(1).map((row) => {
                    const obj = {};
                    jsonData[0].forEach((col, index) => {
                        obj[col] = row[index] || ""; // Evitar valores nulos
                    });
                    return obj;
                });

                setExcelData(rows);
                toast.current.show({ severity: "success", summary: "Éxito", detail: "Archivo cargado correctamente", life: 3000 });
            }
        } catch (error) {
            console.error("Error leyendo el archivo Excel:", error);
            toast.current.show({ severity: "error", summary: "Error", detail: "No se pudo procesar el archivo", life: 3000 });
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
                onClick={() => toast.current.show({ severity: "info", summary: "Guardar", detail: "Datos guardados", life: 3000 })}
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
                onhide={()=>{setVisible(false)}}
            >
                <div className="flex flex-column gap-2">
                    <div className="flex flex-column gap-2">
                        <label htmlFor="area">Área</label>
                        <InputText id="area" name="area" placeholder="Ingresar Área..." />
                    </div>

                    <div className="flex flex-column gap-2">
                        <label htmlFor="descuento">Descuento</label>
                        <InputInteger className={"w-full"} containerClass={"w-full"} />
                    </div>

                    <div className="flex flex-column gap-2">
                        <label htmlFor="excel">Subir Archivo Excel</label>
                        <input
                            id="excel"
                            type="file"
                            accept=".xlsx"
                            onChange={handleFileUpload}
                            style={{ border: "1px solid #ccc", padding: "5px", borderRadius: "4px" }}
                        />
                    </div>

                    {excelData.length > 0 && (
                        <CustomTable value={excelData} paginator rows={10} responsiveLayout="scroll">
                            {columns.map((col, index) => (
                                <Column key={index} field={col.field} header={col.header} />
                            ))}
                        </CustomTable>
                    )}
                </div>
            </CustomDialog>
        </>
    );
};

export default CreatePromocionesAdmin;
