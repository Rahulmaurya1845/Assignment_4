import React from 'react'
import ListTable from '../shared/ListTable';
import Payrow from './SearchPayrow'

function PayrowPage() {
    const data = [
    ];
    const tableHeadings = [
        { id: "id", name: "Staff ID" },
        { id: "name", name: "Name" },
        { id: "role", name: "Staff Type" },
        { id: "bank", name: "Bank" },
        { id: "accNum", name: "Account Number" },
        { id: "salary", name: "Salary" },
        { id: "status", name: "Status" },

    ];

    return (
        <div>
            <Payrow />
            <ListTable data={data} tableHeader={tableHeadings} tableCell={tableHeadings} />
        </div>
    )
}

export default PayrowPage
