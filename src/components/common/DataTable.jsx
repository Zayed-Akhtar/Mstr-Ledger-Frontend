import React from "react";

const DataTable = ({
    columns,
    children,
    isEmpty = false,
    emptyComponent = null
}) => {

    return (

        <table className="table parties-table align-middle mb-0">

            <thead>

                <tr>

                    {

                        columns.map((column) => (

                            <th
                                key={column.key}
                                className={column.className || ""}
                            >

                                {column.label}

                            </th>

                        ))

                    }

                </tr>

            </thead>

<tbody>

    {

        isEmpty

            ? (

                <tr>

                    <td
                        colSpan={columns.length}
                        className="text-center py-5"
                    >

                        {emptyComponent}

                    </td>

                </tr>

            )

            : children

    }

</tbody>

        </table>

    );

};

export default DataTable;