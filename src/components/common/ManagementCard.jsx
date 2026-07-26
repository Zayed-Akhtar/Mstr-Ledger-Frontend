import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import CardHeader from "./CardHeader";
import DataTable from "./DataTable";
import PaginationBar from "./PaginationBar";

const ManagementCard = ({

    title,

    data,

    columns,

    renderRow,

    buttonText,

    searchField,

    pageSize = 5,

    showSearch = true,

    showFilter = true,

    showAddButton = true,

    showPagination = true,
}) => {

    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    /**
     * Filter Data
     */

    const filteredData = useMemo(() => {

        if (!search.trim()) {

            return data;

        }

        return data.filter((item) =>

            String(item[searchField] || "")
                .toLowerCase()
                .includes(search.toLowerCase())

        );

    }, [data, search, searchField]);

    /**
     * Reset page after searching
     */

    useEffect(() => {

        setCurrentPage(1);

    }, [search]);

    /**
     * Pagination
     */

    const totalPages = Math.ceil(
        filteredData.length / pageSize
    );

    const startIndex = (currentPage - 1) * pageSize;

    const currentItems = filteredData.slice(

        startIndex,

        startIndex + pageSize

    );

    return (

        <div className="card border-0 shadow-sm rounded-4 management-card h-100">

            <div className="card-body d-flex flex-column h-100 p-4">

                <CardHeader

                    title={title}

                    totalRecords={filteredData.length}

                    search={search}

                    onSearchChange={setSearch}

                    buttonText={buttonText}

                    showSearch={showSearch}

                    showFilter={showFilter}

                    showAddButton={showAddButton}

                />

                <div className="table-wrapper flex-grow-1">

                    <DataTable

                        columns={columns}

                    >

                        {

                            currentItems.map((item) => renderRow(item))
                        }

                    </DataTable>

                </div>

                {

                    showPagination && (

                        <PaginationBar

                            currentPage={currentPage}

                            setCurrentPage={setCurrentPage}

                            pageSize={pageSize}

                            totalPages={totalPages}

                            totalRecords={filteredData.length}

                        />

                    )

                }

            </div>

        </div>

    );

};

export default ManagementCard;