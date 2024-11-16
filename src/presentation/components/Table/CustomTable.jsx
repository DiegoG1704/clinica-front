import { DataTable } from 'primereact/datatable'
import React from 'react'
import "./CustomTable.css"
const CustomTable = ({children,data}) => {
    return (
        <>
            < DataTable
                value={data}
                rowClassName="custom-row"
                paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
                responsiveLayout='stack'
            >
                {children}
            </DataTable >
        </>
    )
}

export default CustomTable
