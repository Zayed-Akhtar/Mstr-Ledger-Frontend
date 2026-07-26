import React from "react";

const PaginationBar = ({
    currentPage,
    setCurrentPage,
    pageSize,
    totalPages,
    totalRecords
}) => {

    const startRecord = totalRecords === 0
        ? 0
        : ((currentPage - 1) * pageSize) + 1;

    const endRecord = Math.min(

        currentPage * pageSize,

        totalRecords

    );

    const handlePrevious = () => {

        if (currentPage > 1) {

            setCurrentPage(currentPage - 1);

        }

    };

    const handleNext = () => {

        if (currentPage < totalPages) {

            setCurrentPage(currentPage + 1);

        }

    };

    return (

        <div className="d-flex justify-content-between align-items-center mt-4">

            <small className="text-secondary">

                Showing {startRecord} to {endRecord} of {totalRecords} records

            </small>

            {

                totalPages > 0 && (

                    <nav>

                        <ul className="pagination pagination-sm mb-0">

                            <li
                                className={`page-item ${
                                    currentPage === 1
                                        ? "disabled"
                                        : ""
                                }`}
                            >

                                <button
                                    className="page-link"
                                    onClick={handlePrevious}
                                >

                                    Previous

                                </button>

                            </li>

                            {

                                [...Array(totalPages)].map((_, index) => {

                                    const page = index + 1;

                                    return (

                                        <li
                                            key={page}
                                            className={`page-item ${
                                                currentPage === page
                                                    ? "active"
                                                    : ""
                                            }`}
                                        >

                                            <button
                                                className="page-link"
                                                onClick={() => setCurrentPage(page)}
                                            >

                                                {page}

                                            </button>

                                        </li>

                                    );

                                })

                            }

                            <li
                                className={`page-item ${
                                    currentPage === totalPages
                                        ? "disabled"
                                        : ""
                                }`}
                            >

                                <button
                                    className="page-link"
                                    onClick={handleNext}
                                >

                                    Next

                                </button>

                            </li>

                        </ul>

                    </nav>

                )

            }

        </div>

    );

};

export default PaginationBar;