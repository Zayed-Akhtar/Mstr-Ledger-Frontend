import React from "react";
import ManagementCard from "../../common/ManagementCard";
import PartyTableRow from "./PartyTableRow";

const PartiesCard = ({
    selectedParty,
    setSelectedParty
}) => {

    const parties = [

        {
            _id: 1,
            name: "Malik Traders",
            mobileNumber: "9876543210",
            area: "Civil Lines",
            email: "malik@gmail.com",
            active: true
        },

        {
            _id: 2,
            name: "Khan Enterprises",
            mobileNumber: "9123456780",
            area: "Main Market",
            email: "khan@gmail.com",
            active: true
        },

        {
            _id: 3,
            name: "Modern Steel",
            mobileNumber: "9871112222",
            area: "Station Road",
            email: "steel@gmail.com",
            active: false
        },

        {
            _id: 4,
            name: "ABC Hardware",
            mobileNumber: "9876549999",
            area: "Sector 19",
            email: "abc@gmail.com",
            active: true
        },

        {
            _id: 5,
            name: "Rourkela Cement",
            mobileNumber: "9876500000",
            area: "Udit Nagar",
            email: "cement@gmail.com",
            active: true
        },

        {
            _id: 6,
            name: "National Traders",
            mobileNumber: "9999999999",
            area: "Panposh",
            email: "national@gmail.com",
            active: true
        }

    ];

    const columns = [

        {
            key: "name",
            label: "Party Name"
        },

        {
            key: "mobile",
            label: "Mobile Number"
        },

        {
            key: "area",
            label: "Area"
        },

        {
            key: "email",
            label: "Email"
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

            title="Parties"

            data={parties}

            columns={columns}

            searchField="name"

            buttonText="Add Party"

            pageSize={5}

            renderRow={(party) => (

                <PartyTableRow

                    key={party._id}

                    party={party}

                    selectedParty={selectedParty}

                    setSelectedParty={setSelectedParty}

                />

            )}

        />

    );

};

export default PartiesCard;