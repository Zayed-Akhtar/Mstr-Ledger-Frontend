import React, { useState } from "react";
import PartiesCard from "../PartyComponents/Parties/PartiesCard";
import PartyDetailsCard from "../PartyComponents/PartyDetails/PartyDetailsCard";
import AreasCard from "../AreaComponents/AreasCard";

const PartyManagementPage = () => {

    const [selectedParty, setSelectedParty] = useState(null);

    return (

        <div className="container-fluid py-4 page-content" style={{ backgroundColor: '#fafafa' }}>

            <div className="row h-100">

                <div className="col-lg-8 h-100 d-flex flex-column" style={{overflowY:'scroll'}}>
                    <div className="flex-fill mb-4" style={{height:'70%'}}>
                        <PartiesCard
                            selectedParty={selectedParty}
                            setSelectedParty={setSelectedParty}
                        />
                    </div>
                    <div className="flex-fill" style={{height:'70%'}}>
                        <AreasCard />
                    </div>
                </div>

                <div className="col-lg-4 h-100">
                    <PartyDetailsCard
                        party={selectedParty}
                    />

                </div>

            </div>

        </div>

    );

};

export default PartyManagementPage;