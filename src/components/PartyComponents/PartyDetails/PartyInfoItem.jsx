import React from "react";

const PartyInfoItem = ({
    label,
    value
}) => {

    const displayValue = value == null || value === ""
        ? "-"
        : typeof value === "string" || typeof value === "number" || typeof value === "boolean"
            ? value
            : value.name || value.label || "-";

    return (

        <div className="d-flex align-items-center py-3 border-bottom">
            <div className="d-flex" style={{gap:'5%', width:'50%'}}>

                <small className="text-secondary">

                    {label}

                </small>

                <div className="fw-semibold">

                    {displayValue}

                </div>

            </div>

        </div>

    );

};

export default PartyInfoItem;