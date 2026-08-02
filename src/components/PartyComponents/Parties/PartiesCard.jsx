import React, { useState } from "react";
import ManagementCard from "../../common/ManagementCard";
import PartyTableRow from "./PartyTableRow";
import PartyModal from "./PartyModal";
import ConfirmDeleteModal from "../../common/ConfirmDeleteModal";
import { useDispatch } from "react-redux";
import { showToast } from "../../../features/toast/toastSlice";

const PartiesCard = ({
    selectedParty,
    setSelectedParty
}) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [partyToDelete, setPartyToDelete] = useState(null);
    const [showPartyModal, setShowPartyModal] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [editingParty, setEditingParty] = useState(null);
    const dispatch = useDispatch();
    const [parties, setParties] = useState([

        {
            _id: 1,
            name: "Malik Traders",
            phoneNumber: "9876543210",
            area: "Civil Lines",
            partyCode:"P002",
            active: true
        },

        {
            _id: 2,
            name: "Khan Enterprises",
            phoneNumber: "9123456780",
            area: "Main Market",
            partyCode:"P004",
            active: true
        },

        {
            _id: 3,
            name: "Modern Steel",
            phoneNumber: "9871112222",
            area: "Station Road",
            partyCode:"P005",
            active: false
        },

        {
            _id: 4,
            name: "ABC Hardware",
            phoneNumber: "9876549999",
            area: "Sector 19",
            partyCode:"P006",
            active: true
        },

        {
            _id: 5,
            name: "Rourkela Cement",
            phoneNumber: "9876500000",
            area: "Udit Nagar",
            partyCode:"P007",
            active: true
        },

        {
            _id: 6,
            name: "National Traders",
            phoneNumber: "9999999999",
            area: "Panposh",
            partyCode:"P009",
            active: true
        }
    ]);

    const columns = [

        {
            key: "name",
            label: "Party Name"
        },
        {
            key: "code",
            label: "Party Code"
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

        setEditingParty(null);
        setModalMode("create");

        setShowPartyModal(true);

    };

    const handleEditParty = (party) => {

        setEditingParty(party);
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
        dispatch(
            showToast({
                title: "Deleted",
                message: "Party deleted successfully.",
                variant: "danger"
            })
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
            dispatch(
                showToast({
                    title: "Success",
                    message: "Party added successfully.",
                    variant: "success"
                })
            );

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
            dispatch(
                showToast({
                    title: "Success",
                    message: "Party updated successfully.",
                    variant: "info"
                })
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

                party={editingParty}
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