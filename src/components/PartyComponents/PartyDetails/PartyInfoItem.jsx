import React from "react";

const PartyInfoItem = ({
    icon,
    label,
    value
}) => {

    return (

        <div className="d-flex align-items-center py-3 border-bottom">

            <i className={`bi ${icon} fs-5 text-primary me-3`}></i>

            <div>

                <small className="text-secondary">

                    {label}

                </small>

                <div className="fw-semibold">

                    {value || "--"}

                </div>

            </div>

        </div>

    );

};

export default PartyInfoItem;