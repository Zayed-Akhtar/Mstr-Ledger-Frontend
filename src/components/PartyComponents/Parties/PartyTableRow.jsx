import React from "react";
import StatusBadge from "../../common/StatusBadge";
import ActionDropdown from "../../common/ActionDropdown";

const PartyTableRow = ({
    party,
    selectedParty,
    setSelectedParty,
    onEdit,
    onDelete
}) => {

    return (

        <tr
            onClick={() => setSelectedParty(party)}
            className={
                selectedParty?._id === party._id
                    ? "selected"
                    : ""
            }
        >

            <td className="party-name">

                {party.name}

            </td>
            <td>{party.partyCode}</td>

            <td>{party.phoneNumber}</td>

            <td>{party.area}</td>

            <td>
                <StatusBadge
                    active={party.active}
                />
            </td>

            <td className="text-center">

                <ActionDropdown
                    editLabel="Edit"
                    deleteLabel="Delete"
                    onEdit={() => onEdit(party)}
                    onDelete={() => onDelete(party)}
                />

            </td>

        </tr>

    );

};

export default PartyTableRow;