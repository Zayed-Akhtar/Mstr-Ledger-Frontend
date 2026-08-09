import React from "react";
import PartyInfoItem from "./PartyInfoItem";
import PartyStatistics from "./PartyStatistics";

const PartyDetailsCard = ({ party, onEditParty, onViewTransactions }) => {

    if (!party) {

        return (

<div className="card border-0 shadow-sm rounded-4 h-100 party-details-card">
                <div className="card-body text-center py-5">

                    <i className="bi bi-person-circle display-3 text-secondary"></i>

                    <h5 className="mt-3">

                        No Party Selected

                    </h5>

                    <p className="text-muted mb-0">

                        Select a party from the table to view details.

                    </p>

                </div>

            </div>

        );

    }

    const areaName = typeof party.area === "string"
        ? party.area
        : party.area?.name || "-";

    return (

        <div className="card border-0 shadow-sm rounded-4 h-100" style={{overflowY:'auto', position:'relative'}}>

        <div className="card-body d-flex flex-column p-4">
                <div className="text-center mb-4 party-details-header">

                    <div className="party-avatar">

                        {party.name.charAt(0)}

                    </div>

                    <h4 className="fw-bold mt-3 mb-1">

                        {party.name}

                    </h4>

                    <span className="badge bg-success-subtle text-success">

                        Active

                    </span>

                </div>
                <PartyInfoItem
                    icon="bi-telephone"
                    label="Mobile"
                    value={party.phoneNumber}
                />

                <PartyInfoItem
                    icon="bi-envelope"
                    label="Email"
                    value={party.email}
                />

                <PartyInfoItem
                    icon="bi-geo-alt"
                    label="Area"
                    value={areaName}
                />

                <PartyInfoItem
                    icon="bi-house"
                    label="Address"
                    value={party.fullAddress}
                />

                <PartyStatistics party={party} />

                <div className="d-grid gap-2 mt-4">

                    <button
                        className="btn btn-primary"
                        onClick={() => onEditParty?.(party)}
                    >
                        Edit Party
                    </button>

                    <button
                        className="btn btn-outline-primary"
                        onClick={() => onViewTransactions?.(party)}
                    >
                        View Transactions
                    </button>

                </div>

            </div>

        </div>

    );

};

export default PartyDetailsCard;