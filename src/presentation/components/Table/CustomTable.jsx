import { DataTable } from 'primereact/datatable'
import React from 'react'

const CustomTable = ({children,data}) => {
    return (
        <>
            < DataTable
                value={data}
                rowClassName="my-2"
            >
                {children}
            </DataTable >
        </>
    )
}

export default CustomTable
