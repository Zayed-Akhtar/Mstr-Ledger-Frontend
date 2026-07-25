import React, { useState } from "react";
import ManagementCard from "../../common/ManagementCard";
import PartyTableRow from "./PartyTableRow";

const PartiesCard = ({
    selectedParty,
    setSelectedParty
}) => {

    const [search, setSearch] = useState("");

    // Replace with API data later
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
            mobileNumber: "9876543211",
            area: "Main Road",
            email: "khan@gmail.com",
            active: false
        },
        {
            _id: 3,
            name: "Ali Traders",
            mobileNumber: "9876543785",
            area: "Nala Road",
            email: "Ali@gmail.com",
            active: true
        }
    ];

    const filteredParties = parties.filter((party) =>
        party.name.toLowerCase().includes(search.toLowerCase())
    );

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

            totalRecords={filteredParties.length}

            search={search}

            onSearchChange={setSearch}

            buttonText="Add Party"

            columns={columns}

        >

            {

                filteredParties.map((party)=>(

                    <PartyTableRow

                        key={party._id}

                        party={party}

                        selectedParty={selectedParty}

                        setSelectedParty={setSelectedParty}

                    />

                ))

            }

        </ManagementCard>

    );

};

export default PartiesCard;