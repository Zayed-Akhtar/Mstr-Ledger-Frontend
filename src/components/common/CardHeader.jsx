import React from "react";
import SearchBox from "./SearchBox";

const CardHeader = ({
    title,
    totalRecords,
    search,
    onSearchChange,
    buttonText,
    showSearch,
    showFilter,
    showAddButton
}) => {

    return (

        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">

            <div>

                <h4 className="fw-semibold mb-0">

                    {title}

                    <span className="text-secondary ms-2">

                        ({totalRecords})

                    </span>

                </h4>

            </div>

            <div className="d-flex flex-wrap align-items-center gap-2">

                {

                    showSearch && (

                        <SearchBox

                            value={search}

                            onChange={onSearchChange}

                            placeholder={`Search ${title.toLowerCase()}...`}

                        />

                    )

                }

                {

                    showFilter && (

                        <button
                            className="btn btn-light border filter-btn"
                        >

                            <i className="bi bi-funnel me-2"></i>

                            Filters

                        </button>

                    )

                }

                {

                    showAddButton && (

                        <button
                            className="btn add-party-btn"
                        >

                            <i className="bi bi-plus-lg me-2"></i>

                            {buttonText}

                        </button>

                    )

                }

            </div>

        </div>

    );

};

export default CardHeader;