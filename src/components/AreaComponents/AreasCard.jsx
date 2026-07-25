import React, { useState } from "react";
import AreaTableRow from "./AreaTableRow";
import ManagementCard from "../common/ManagementCard";

const AreasCard = () => {

    const [search, setSearch] = useState("");

    const areas = [

        {
            _id: 1,
            name: "Civil Lines",
            description: "Main civil area and surrounding regions",
            totalParties: 8,
            active: true
        },

        {
            _id: 2,
            name: "Main Market",
            description: "Commercial market and nearby areas",
            totalParties: 12,
            active: true
        },

        {
            _id: 3,
            name: "Station Road",
            description: "Area around railway station",
            totalParties: 6,
            active: true
        },

        {
            _id: 4,
            name: "Old Town",
            description: "Old town and heritage region",
            totalParties: 4,
            active: false
        }

    ];

    const filteredAreas = areas.filter((area) =>
        area.name.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [

        {
            key: "name",
            label: "Area Name"
        },

        {
            key: "description",
            label: "Description"
        },

        {
            key: "parties",
            label: "No. of Parties"
        },

        {
            key: "status",
            label: "Status"
        },

        {
            key: "actions",
            label: "Actions",
            className: "text-center"
        }

    ];

    return (

        <ManagementCard

            title="Areas"

            totalRecords={filteredAreas.length}

            search={search}

            onSearchChange={setSearch}

            buttonText="Add Area"

            columns={columns}

        >

            {

                filteredAreas.map((area) => (

                    <AreaTableRow
                        key={area._id}
                        area={area}
                    />

                ))

            }

        </ManagementCard>

    );

};

export default AreasCard;