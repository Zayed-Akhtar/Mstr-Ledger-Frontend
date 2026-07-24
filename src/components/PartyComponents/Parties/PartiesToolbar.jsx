import React from "react";

const PartiesToolbar = ({
    search,
    setSearch,
    totalParties
}) => {

    return (

        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">

            <div>

                <h4 className="fw-semibold mb-0">

                    Parties

                    <span className="text-secondary ms-2">

                        ({totalParties})

                    </span>

                </h4>

            </div>

            <div className="d-flex flex-wrap align-items-center gap-2">

                <div className="search-box">

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search parties..."
                    />

                    <i className="bi bi-search"></i>

                </div>

                <button
                    type="button"
                    className="btn btn-light border filter-btn"
                >

                    <i className="bi bi-funnel me-2"></i>

                    Filters

                </button>

                <button
                    type="button"
                    className="btn add-party-btn"
                >

                    <i className="bi bi-plus-lg me-2"></i>

                    Add Party

                </button>

            </div>

        </div>

    );

};

export default PartiesToolbar;