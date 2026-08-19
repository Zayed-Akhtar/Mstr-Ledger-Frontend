import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PartiesCard from "../PartyComponents/Parties/PartiesCard";
import PartyDetailsCard from "../PartyComponents/PartyDetails/PartyDetailsCard";
import AreasCard from "../AreaComponents/AreasCard";

const PartyManagementPage = () => {
    const [selectedParty, setSelectedParty] = useState(null);
    const [partyModalState, setPartyModalState] = useState({
        show: false,
        mode: "create",
        party: null
    });
    const navigate = useNavigate();
    const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;

    const handleViewTransactions = async (party) => {
        if (!party?._id) return;

        try {
            const response = await axios.get(
                `${serverEndpoint}/party/party-by-code/${party.partyCode}`
            );

            const fetchedPartyWithTxn = response.data?.items ?? response.data?.data ?? response.data ?? {};
            const transactions = Array.isArray(fetchedPartyWithTxn.transactions)
                    ? fetchedPartyWithTxn.transactions
                    : [];        
            navigate('/Entry', {
                state: {
                    fetchedPartyWithTxn,
                    transactions
                }
            });
        } catch (error) {
            console.error('Failed to load party transactions:', error);
            navigate('/Entry', {
                state: {
                    party,
                    transactions: party.transactions || []
                }
            });
        }
    };

    return (

        <div className="container-fluid py-4 page-content" style={{ backgroundColor: '#fafafa' }}>

            <div className="row h-100">

                <div className="col-lg-8 h-100 d-flex flex-column" style={{overflowY:'scroll'}}>
                    <div className="flex-fill mb-4" style={{height:'70%'}}>
                        <PartiesCard
                            selectedParty={selectedParty}
                            setSelectedParty={setSelectedParty}
                            partyModalState={partyModalState}
                            setPartyModalState={setPartyModalState}
                        />
                    </div>
                    <div className="flex-fill" style={{height:'70%'}}>
                        <AreasCard />
                    </div>
                </div>

                <div className="col-lg-4 h-100">
                    <PartyDetailsCard
                        party={selectedParty}
                        onEditParty={(party) => setPartyModalState({
                            show: true,
                            mode: 'edit',
                            party
                        })}
                        onViewTransactions={handleViewTransactions}
                    />

                </div>

            </div>

        </div>

    );

};

export default PartyManagementPage;