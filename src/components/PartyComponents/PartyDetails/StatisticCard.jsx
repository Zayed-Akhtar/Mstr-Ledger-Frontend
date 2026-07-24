import React from "react";

const StatisticCard = ({
    title,
    value
}) => {

    return (

        <div className="col-6">

            <div className="stat-card">

                <small className="text-secondary">

                    {title}

                </small>

                <h5 className="fw-bold mt-2">

                    {value}

                </h5>

            </div>

        </div>

    );

};

export default StatisticCard;