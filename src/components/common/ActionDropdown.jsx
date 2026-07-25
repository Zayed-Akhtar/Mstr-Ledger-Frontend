import React from "react";

const ActionDropdown = ({
    onClick
}) => {

    return (

        <button
            type="button"
            className="btn btn-sm action-btn"
            onClick={onClick}
        >

            <i className="bi bi-three-dots-vertical"></i>

        </button>

    );

};

export default ActionDropdown;