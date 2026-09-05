import React from "react";
import PartyInfoItem from "./PartyInfoItem";
import PartyStatistics from "./PartyStatistics";
import SpinnerButton from "../../spinners/SpinnerButton";

const PartyDetailsCard = ({ party, onEditParty, onViewTransactions, isLoadingTransactions = false }) => {

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
            {isLoadingTransactions && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                    borderRadius: '1rem'
                }}>
                    <SpinnerButton size={28} />
                </div>
            )}

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
                        disabled={isLoadingTransactions}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    >
                        {isLoadingTransactions ? <SpinnerButton size={16} /> : null}
                        <span>View Transactions</span>
                    </button>

                </div>

            </div>

        </div>

    );

};

export default PartyDetailsCard;