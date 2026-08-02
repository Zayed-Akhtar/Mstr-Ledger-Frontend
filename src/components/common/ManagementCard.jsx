import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import CardHeader from "./CardHeader";
import DataTable from "./DataTable";
import PaginationBar from "./PaginationBar";
import EmptyState from "./EmptyState";

const ManagementCard = ({

    title,
    data,
    columns,
    renderRow,
    buttonText,

    // Client-side search
    searchField,

    pageSize = 5,

    showSearch = true,
    showFilter = true,
    showAddButton = true,
    showPagination = true,

    onAddClick,

    // Pagination mode
    paginationMode = "client",

    // Server-side pagination props
    currentPage: serverCurrentPage,
    setCurrentPage: setServerCurrentPage,
    totalRecords: serverTotalRecords,
    totalPages: serverTotalPages,

    // Server-side search props
    search: serverSearch,
    onSearchChange: serverOnSearchChange

}) => {

    /*
     * Client-side state
     *
     * AreasCard will continue using these.
     */
    const [localSearch, setLocalSearch] = useState("");

    const [localCurrentPage, setLocalCurrentPage] = useState(1);


    /*
     * Determine pagination mode
     */

    const isServerMode =
        paginationMode === "server";


    /*
     * Decide which search value to use
     */

    const search = isServerMode
        ? serverSearch ?? ""
        : localSearch;


    /*
     * Decide which page value to use
     */

    const currentPage = isServerMode
        ? serverCurrentPage ?? 1
        : localCurrentPage;


    /*
     * CLIENT-SIDE FILTERING
     *
     * This is only used by components such as AreasCard.
     *
     * PartiesCard uses server-side search, so we simply
     * return the data received from the backend.
     */

    const filteredData = useMemo(() => {

        if (isServerMode) {

            return data;

        }

        if (!localSearch.trim()) {

            return data;

        }

        return data.filter((item) =>

            String(item[searchField] || "")
                .toLowerCase()
                .includes(
                    localSearch.toLowerCase()
                )

        );

    }, [
        data,
        localSearch,
        searchField,
        isServerMode
    ]);


    /*
     * Reset page when CLIENT-SIDE search changes.
     *
     * Server-side page reset will be handled by
     * PartiesCard.
     */

    useEffect(() => {

        if (!isServerMode) {

            setLocalCurrentPage(1);

        }

    }, [localSearch, isServerMode]);


    /*
     * CLIENT-SIDE pagination calculations
     */

    const clientTotalRecords =
        filteredData.length;

    const clientTotalPages =
        Math.ceil(
            clientTotalRecords / pageSize
        );


    /*
     * Decide total records/pages depending
     * on pagination mode.
     */

    const totalRecords = isServerMode
        ? serverTotalRecords ?? 0
        : clientTotalRecords;

    const totalPages = isServerMode
        ? serverTotalPages ?? 0
        : clientTotalPages;


    /*
     * CLIENT-SIDE pagination
     */

    const startIndex =
        (currentPage - 1) * pageSize;


    /*
     * IMPORTANT
     *
     * Server mode:
     * Backend already returned only 5 records.
     * DO NOT slice again.
     *
     * Client mode:
     * Slice the full array normally.
     */

    const currentItems = isServerMode

        ? data

        : filteredData.slice(
            startIndex,
            startIndex + pageSize
        );


    /*
     * Search handler
     */

    const handleSearchChange = (value) => {

        if (isServerMode) {

            serverOnSearchChange?.(value);

        }
        else {

            setLocalSearch(value);

        }

    };


    /*
     * Pagination handler
     */

    const handlePageChange = (page) => {

        if (isServerMode) {

            setServerCurrentPage?.(page);

        }
        else {

            setLocalCurrentPage(page);

        }

    };


    return (

        <div className="card border-0 shadow-sm rounded-4 management-card h-100">

            <div className="card-body d-flex flex-column h-100 p-4">

                <CardHeader

                    title={title}

                    totalRecords={totalRecords}

                    search={search}

                    onSearchChange={handleSearchChange}

                    buttonText={buttonText}

                    showSearch={showSearch}

                    showFilter={showFilter}

                    showAddButton={showAddButton}

                    onAddClick={onAddClick}

                />


                <div className="table-wrapper flex-grow-1">

                    <DataTable

                        columns={columns}

                        isEmpty={
                            currentItems.length === 0
                        }

                        emptyComponent={

                            <EmptyState

                                icon={
                                    search
                                        ? "bi bi-search"
                                        : "bi bi-folder2-open"
                                }

                                title={
                                    search
                                        ? "No Matching Records"
                                        : "No Records Found"
                                }

                                message={
                                    search
                                        ? "Try another search keyword."
                                        : `Click "${buttonText}" to create your first record.`
                                }

                                buttonText={
                                    search
                                        ? null
                                        : buttonText
                                }

                                onButtonClick={
                                    onAddClick
                                }

                            />

                        }

                    >

                        {
                            currentItems.map(
                                renderRow
                            )
                        }

                    </DataTable>

                </div>


                {

                    showPagination && (

                        <PaginationBar

                            currentPage={
                                currentPage
                            }

                            setCurrentPage={
                                handlePageChange
                            }

                            pageSize={
                                pageSize
                            }

                            totalPages={
                                totalPages
                            }

                            totalRecords={
                                totalRecords
                            }

                        />

                    )

                }

            </div>

        </div>

    );

};

export default ManagementCard;