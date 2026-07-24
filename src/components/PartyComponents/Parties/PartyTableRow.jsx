import React from "react";

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

                <span
                    className={`status-badge ${
                        party.active
                            ? "status-active"
                            : "status-inactive"
                    }`}
                >

                    {party.active ? "Active" : "Inactive"}

                </span>

            </td>

            <td className="text-center">

                <button
                    type="button"
                    className="btn btn-sm action-btn"
                >

                    <i className="bi bi-three-dots-vertical"></i>

                </button>

            </td>

        </tr>

    );

};

export default PartyTableRow;