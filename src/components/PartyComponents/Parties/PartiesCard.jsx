import React, { useState } from "react";
import PartiesToolbar from "./PartiesToolbar";
import PartiesTable from "./PartiesTable";
import PaginationBar from "./PaginationBar";

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
        }
    ];

    const filteredParties = parties.filter((party) =>
        party.name.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="card border-0 shadow-sm rounded-4 parties-card">

            <div className="card-body p-4">

                <PartiesToolbar
                    search={search}
                    setSearch={setSearch}
                    totalParties={filteredParties.length}
                />

                <PartiesTable
                    parties={filteredParties}
                    selectedParty={selectedParty}
                    setSelectedParty={setSelectedParty}
                />

                <PaginationBar
                    startIndex={1}
                    endIndex={filteredParties.length}
                    totalRecords={filteredParties.length}
                />

            </div>

        </div>

    );

};

export default PartiesCard;