import React, { useState } from "react";
import ManagementCard from "../../common/ManagementCard";
import PartyTableRow from "./PartyTableRow";
import PartyModal from "./PartyModal";
import ConfirmDeleteModal from "../../common/ConfirmDeleteModal";

const PartiesCard = ({
    selectedParty,
    setSelectedParty
}) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [partyToDelete, setPartyToDelete] = useState(null);
    const [showPartyModal, setShowPartyModal] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [parties, setParties] = useState([

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

    ]);

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

    const handleAddParty = () => {

        setSelectedParty(null);

        setModalMode("create");

        setShowPartyModal(true);

    };

    const handleEditParty = (party) => {

        setSelectedParty(party);

        setModalMode("edit");

        setShowPartyModal(true);

    };

    const handleDeleteParty = (party) => {

        setPartyToDelete(party);

        setShowDeleteModal(true);

    };

const confirmDelete = () => {

    setParties(prev =>

        prev.filter(

            p => p._id !== partyToDelete._id

        )

    );

    setShowDeleteModal(false);

};

    const handleSaveParty = (partyData) => {

    if (modalMode === "create") {

        const newParty = {

            ...partyData,

            _id: Date.now()

        };

        setParties(prev => [

            ...prev,

            newParty

        ]);

    }
    else {

        setParties(prev =>

            prev.map(p =>

                p._id === editingParty._id

                    ? {

                        ...editingParty,

                        ...partyData

                    }

                    : p

            )

        );

    }

};

    return (

        <><ManagementCard

            title="Parties"

            data={parties}

            columns={columns}

            searchField="name"

            buttonText="Add Party"

            pageSize={5}

            onAddClick={handleAddParty}

            renderRow={(party) => (

                <PartyTableRow

                    key={party._id}

                    party={party}

                    selectedParty={selectedParty}

                    setSelectedParty={setSelectedParty}

                    onEdit={handleEditParty}

                    onDelete={handleDeleteParty}
                />

            )} />
            <PartyModal

                show={showPartyModal}

                onHide={() => setShowPartyModal(false)}

                mode={modalMode}

                party={selectedParty}
                onSave={handleSaveParty}
            />
            <ConfirmDeleteModal

                show={showDeleteModal}

                onHide={() => {

                    setShowDeleteModal(false);

                    setPartyToDelete(null);

                }}

                title="Delete Party"

                message="Are you sure you want to delete"

                itemName={partyToDelete?.name}

                onConfirm={confirmDelete}

            />
        </>

    );

};

export default PartiesCard;