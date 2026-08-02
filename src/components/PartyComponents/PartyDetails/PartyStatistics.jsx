import React, { useEffect, useState } from "react";
import axios from "axios";
import StatisticCard from "./StatisticCard";

const PartyStatistics = ({ party }) => {
    const [stats, setStats] = useState({
        balance: 0,
        transactionCount: 0
    });
    const [loading, setLoading] = useState(false);
    const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;

    useEffect(() => {
        if (!party?._id) {
            setStats({ balance: 0, transactionCount: 0 });
            return;
        }

        const fetchPartyStatistics = async () => {
            setLoading(true);

            try {
                const response = await axios.get(
                    `${serverEndpoint}/party/closing-balance/${party._id}`
                );

                const result = response?.data.items || {};

                setStats({
                    balance: Number(result.closingBalance ?? 0),
                    transactionCount: Number(
                        result.totalTransactions ?? 0
                    )
                });
            } catch (error) {
                console.error("Error fetching party statistics:", error);
                setStats({ balance: 0, transactionCount: 0 });
            } finally {
                setLoading(false);
            }
        };

        fetchPartyStatistics();
    }, [party?._id, serverEndpoint]);

    const formatCurrency = (value) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2
        }).format(Number(value || 0));

    const creditLimit = Number(party?.creditLimit ?? 0);

    return (

        <div className="row g-3 mt-2">

            <StatisticCard
                title="Balance"
                value={loading ? "Loading..." : formatCurrency(stats.balance)}
            />

            <StatisticCard
                title="Credit Limit"
                value={party?.creditLimit ? `${creditLimit} days` : 0}
            />

            <StatisticCard
                title="Transactions"
                value={loading ? "Loading..." : stats.transactionCount}
            />

        </div>

    );

};

export default PartyStatistics;