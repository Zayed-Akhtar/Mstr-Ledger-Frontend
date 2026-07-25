import React from "react";
import CardHeader from "./CardHeader";
import DataTable from "./DataTable";
import PaginationBar from "../PartyComponents/Parties/PaginationBar";

const ManagementCard = ({
    title,
    totalRecords,
    search,
    onSearchChange,
    buttonText,
    columns,
    children,
    showSearch = true,
    showFilter = true,
    showAddButton = true,
    showPagination = true
}) => {

    return (

        <div className="card border-0 shadow-sm rounded-4 management-card">

            <div className="card-body p-4">

                <CardHeader
                    title={title}
                    totalRecords={totalRecords}
                    search={search}
                    onSearchChange={onSearchChange}
                    buttonText={buttonText}
                    showSearch={showSearch}
                    showFilter={showFilter}
                    showAddButton={showAddButton}
                />

                <DataTable
                    columns={columns}
                >

                    {children}

                </DataTable>

                {showPagination && (<PaginationBar
                    startIndex={1}
                    endIndex={totalRecords}
                    totalRecords={totalRecords}
                />)}

            </div>

        </div>

    );

};

export default ManagementCard;