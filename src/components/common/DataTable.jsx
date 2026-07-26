import React from "react";

const DataTable = ({
    columns,
    children
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

                {children}

            </tbody>

        </table>

    );

};

export default DataTable;