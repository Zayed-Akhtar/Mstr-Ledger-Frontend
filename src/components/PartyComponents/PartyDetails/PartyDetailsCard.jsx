import React from "react";
import PartyInfoItem from "./PartyInfoItem";
import PartyStatistics from "./PartyStatistics";

const PartyDetailsCard = ({ party }) => {

    if (!party) {

        return (

            <div className="card border-0 shadow-sm rounded-4">

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

    return (

        <div className="card border-0 shadow-sm rounded-4">

            <div className="card-body p-4">

                <div className="text-center mb-4">

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
                    value={party.mobileNumber}
                />

                <PartyInfoItem
                    icon="bi-envelope"
                    label="Email"
                    value={party.email}
                />

                <PartyInfoItem
                    icon="bi-geo-alt"
                    label="Area"
                    value={party.area}
                />

                <PartyInfoItem
                    icon="bi-receipt"
                    label="GST Number"
                    value={party.gst}
                />

                <PartyInfoItem
                    icon="bi-house"
                    label="Address"
                    value={party.address}
                />

                <PartyStatistics />

                <div className="d-grid gap-2 mt-4">

                    <button className="btn btn-primary">

                        Edit Party

                    </button>

                    <button className="btn btn-outline-primary">

                        View Transactions

                    </button>

                </div>

            </div>

        </div>

    );

};

export default PartyDetailsCard;