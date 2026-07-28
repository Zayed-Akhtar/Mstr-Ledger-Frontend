import React from "react";
import StatusBadge from "../common/StatusBadge";
import ActionDropdown from "../common/ActionDropdown";

const AreaTableRow = ({ area, onDelete, onEdit }) => {

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
                    active={area.active}
                />

            </td>

            <td className="text-center">

                <ActionDropdown
                    onEdit={()=>onEdit(area)}
                    onDelete={()=>onDelete(area)}
                />

            </td>

        </tr>

    );

};

export default AreaTableRow;