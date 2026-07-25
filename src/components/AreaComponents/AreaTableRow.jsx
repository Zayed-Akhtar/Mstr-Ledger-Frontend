import React from "react";
import StatusBadge from "../common/StatusBadge";
import ActionDropdown from "../common/ActionDropdown";

const AreaTableRow = ({ area }) => {

    return (

        <tr>

            <td className="fw-medium">

                {area.name}

            </td>

            <td>

                {area.description}

            </td>

            <td>

                {area.totalParties}

            </td>

            <td>

                <StatusBadge
                    status={
                        area.active
                            ? "Active"
                            : "Inactive"
                    }
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

export default AreaTableRow;