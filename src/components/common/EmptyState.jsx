import React from "react";

const EmptyState = ({
    icon,
    title,
    message,
    buttonText,
    onButtonClick
}) => {

    return (

        <div className="py-4">

            <i
                className={`${icon} display-4 text-secondary opacity-50`}
            ></i>

            <h5 className="mt-3">

                {title}

            </h5>

            <p className="text-secondary">

                {message}

            </p>

            {

                buttonText && (

                    <button
                        className="btn add-party-btn mt-2"
                        onClick={onButtonClick}
                    >

                        <i className="bi bi-plus-lg me-2"></i>

                        {buttonText}

                    </button>

                )

            }

        </div>

    );

};

export default EmptyState;