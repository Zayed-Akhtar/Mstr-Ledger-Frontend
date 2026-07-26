import React from "react";

const StatusBadge = ({ active }) => {

    return (

        <span
            className={`status-badge ${
                active
                    ? "status-active"
                    : "status-inactive"
            }`}
        >

            {active ? "Active" : "Inactive"}

        </span>

    );

};

export default StatusBadge;