import React from "react";
import StatusBadge from "../../common/StatusBadge";
import ActionDropdown from "../../common/ActionDropdown";

const PartyTableRow = ({
    party,
    selectedParty,
    setSelectedParty
}) => {

    return (

        <tr
            className={
                selectedParty?._id === party._id
                    ? "selected"
                    : ""
            }
            onClick={() => setSelectedParty(party)}
        >

            <td className="party-name">

                {party.name}

            </td>

            <td>{party.mobileNumber}</td>

            <td>{party.area}</td>

            <td>{party.email}</td>

            <td>
                <StatusBadge
                    active={party.active}
                />
            </td>

            <td className="text-center">

                <ActionDropdown
                    onClick={() => { }}
                />

            </td>

        </tr>

    );

};

export default PartyTableRow;