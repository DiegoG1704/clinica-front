import { DataTable } from 'primereact/datatable'
import React from 'react'
import "./CustomTable.css"
const CustomTable = ({children,data}) => {
    return (
        <>
            < DataTable
                value={data}
                rowClassName="custom-row"
            >
                {children}
            </DataTable >
        </>
    )
}

export default CustomTable
