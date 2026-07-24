import React from "react";
import StatisticCard from "./StatisticCard";

const PartyStatistics = ({ party }) => {

    return (

        <div className="row g-3 mt-2">

            <StatisticCard
                title="Balance"
                value="₹12,500"
            />

            <StatisticCard
                title="Credit Limit"
                value="₹50,000"
            />

            <StatisticCard
                title="Transactions"
                value="125"
            />

            <StatisticCard
                title="Orders"
                value="42"
            />

        </div>

    );

};

export default PartyStatistics;