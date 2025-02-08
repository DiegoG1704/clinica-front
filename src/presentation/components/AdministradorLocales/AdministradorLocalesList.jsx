

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
const AdministradorLocalesList = () => {


    const data = [
        {
            nombre: "Diego Pérez",
            correo: "diego.perez@example.com",
            telefono: "987654321",
            dni: "12345678",
            sede: "Lima",
            fecha_creacion: "2024-10-17",
            imagen: "https://martinalba.com/wp-content/uploads/2022/05/fotografia-profesional-1.jpg", // URL de la imagen
        },
        {
            nombre: "María García",
            correo: "maria.garcia@example.com",
            telefono: "987654322",
            dni: "87654321",
            sede: "Cusco",
            fecha_creacion: "2024-10-10",
            imagen: "https://martinalba.com/wp-content/uploads/2022/05/fotografia-profesional-1.jpg", // URL de la imagen
        },
        {
            nombre: "Juan Fernández",
            correo: "juan.fernandez@example.com",
            telefono: "987654323",
            dni: "45678912",
            sede: "Arequipa",
            fecha_creacion: "2024-09-25",
            imagen: "https://martinalba.com/wp-content/uploads/2022/05/fotografia-profesional-1.jpg", // URL de la imagen
        },
        {
            nombre: "Ana Torres",
            correo: "ana.torres@example.com",
            telefono: "987654324",
            dni: "78912345",
            sede: "Trujillo",
            fecha_creacion: "2024-08-15",
            imagen: "https://martinalba.com/wp-content/uploads/2022/05/fotografia-profesional-1.jpg", // URL de la imagen
        },
        {
            nombre: "Carlos Rojas",
            correo: "carlos.rojas@example.com",
            telefono: "987654325",
            dni: "65478932",
            sede: "Chiclayo",
            fecha_creacion: "2024-07-05",
            imagen: "https://martinalba.com/wp-content/uploads/2022/05/fotografia-profesional-1.jpg", // URL de la imagen
        },
    ];
    const actionsTemplate = (rowData) => {
        return (
            <div className='flex gap-2'>
                <div><Button icon="pi pi-pencil" className="bg-white border-none shadow-none " style={{color:"#85C226"}}/></div>
                <div><Button icon="pi pi-trash" className="bg-white border-none shadow-none " style={{color:"#85C226"}}/></div>
            </div>
        )
    }
    return (
        <div>
            <DataTable
                value={data}
                rowClassName="my-2"
            >
                <Column
                    header="Imagen"
                    body={(rowData) => (
                        <img src={rowData.imagen} alt={rowData.nombre} width="60" className='border-round-sm' />
                    )}
                />
                <Column field="nombre" header="Nombre" />
                <Column field="correo" header="Correo" />
                <Column field="telefono" header="Télefono" />
                <Column field="dni" header="DNI" />
                <Column field="sede" header="Sede" />
                <Column field="fecha_creacion" header="Fecha de creación" />
                <Column body={actionsTemplate} />
            </DataTable>
        </div>
    )
}

export default AdministradorLocalesList
