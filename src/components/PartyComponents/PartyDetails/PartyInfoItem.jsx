import React from "react";

const PartyInfoItem = ({
    label,
    value
}) => {

    return (

        <div className="d-flex align-items-center py-3 border-bottom">
            <div className="d-flex" style={{gap:'5%', width:'50%'}}>

                <small className="text-secondary">

                    {label}

                </small>

                <div className="fw-semibold">

                    {value || "-"}

                </div>

            </div>

        </div>

    );

};

export default PartyInfoItem;