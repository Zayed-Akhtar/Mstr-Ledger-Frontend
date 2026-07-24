import React, { useState } from "react";
import PartiesCard from "../PartyComponents/Parties/PartiesCard";
import PartyDetailsCard from "../PartyComponents/PartyDetails/PartyDetailsCard";

const PartyManagementPage = () => {

    const [selectedParty, setSelectedParty] = useState(null);

    return (

        <div className="container-fluid py-4" style={{backgroundColor:'#fafafa'}}>

            <div className="row g-4">

                <div className="col-lg-8">

                    <PartiesCard
                        selectedParty={selectedParty}
                        setSelectedParty={setSelectedParty}
                    />

                </div>

                <div className="col-lg-4">

                    <PartyDetailsCard
                        party={selectedParty}
                    />

                </div>

            </div>

        </div>

    );

};

export default PartyManagementPage;