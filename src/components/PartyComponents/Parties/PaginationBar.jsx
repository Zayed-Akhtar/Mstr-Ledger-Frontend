import React from "react";

const PaginationBar = ({
    startIndex,
    endIndex,
    totalRecords
}) => {

    return (

        <div className="d-flex justify-content-between align-items-center mt-4">

            <small className="text-secondary">

                Showing {startIndex} to {endIndex} of {totalRecords} parties

            </small>

            <nav>

                <ul className="pagination pagination-sm mb-0">

                    <li className="page-item disabled">

                        <button className="page-link">

                            Previous

                        </button>

                    </li>

                    <li className="page-item active">

                        <button className="page-link">

                            1

                        </button>

                    </li>

                    <li className="page-item">

                        <button className="page-link">

                            Next

                        </button>

                    </li>

                </ul>

            </nav>

        </div>

    );

};

export default PaginationBar;