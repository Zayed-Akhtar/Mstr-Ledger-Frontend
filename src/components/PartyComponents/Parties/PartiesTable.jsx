import React from "react";
import PartyTableRow from "./PartyTableRow";

const PartiesTable = ({
    parties,
    selectedParty,
    setSelectedParty
}) => {

    return (

        <table className="table parties-table align-middle mb-0">

            <thead>

                <tr>

                    <th role="button">

                        Party Name

                        <i className="bi bi-arrow-down-up ms-2"></i>

                    </th>

                    <th>Mobile Number</th>

                    <th>Area</th>

                    <th>Email</th>

                    <th>Status</th>

                    <th className="text-center">

                        Actions

                    </th>

                </tr>

            </thead>

            <tbody>

                {parties.map((party) => (

                    <PartyTableRow
                        key={party._id}
                        party={party}
                        selectedParty={selectedParty}
                        setSelectedParty={setSelectedParty}
                    />

                ))}

            </tbody>

        </table>

    );

};

export default PartiesTable;