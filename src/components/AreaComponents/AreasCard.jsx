import React from "react";
import ManagementCard from "../common/ManagementCard";
import AreaTableRow from "./AreaTableRow";

const AreasCard = () => {

    const areas = [

        {
            _id: 1,
            name: "Civil Lines",
            description: "Main civil area",
            totalParties: 12,
            active: true
        },

        {
            _id: 2,
            name: "Main Market",
            description: "Commercial Area",
            totalParties: 9,
            active: true
        },

        {
            _id: 3,
            name: "Sector 19",
            description: "Residential Area",
            totalParties: 6,
            active: true
        },

        {
            _id: 4,
            name: "Panposh",
            description: "Industrial Area",
            totalParties: 3,
            active: false
        },

        {
            _id: 5,
            name: "Station Road",
            description: "Railway Region",
            totalParties: 7,
            active: true
        }

    ];

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

            data={areas}

            columns={columns}

            searchField="name"

            buttonText="Add Area"

            pageSize={5}

            renderRow={(area) => (

                <AreaTableRow

                    key={area._id}

                    area={area}

                />

            )}

        />

    );

};

export default AreasCard;