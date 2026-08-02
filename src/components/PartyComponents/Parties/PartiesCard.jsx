import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

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
    const [parties, setParties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;
    const PAGE_SIZE = 5;

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

    const normalizePartyPayload = (partyData) => ({
        ...partyData,
        partyCode: partyData.partyCode?.trim(),
        name: partyData.name?.trim(),
        email: partyData.email?.trim() || "",
        phoneNumber: partyData.phoneNumber?.trim() || "",
        fullAddress: partyData.fullAddress?.trim() || "",
        area: typeof partyData.area === "string"
            ? partyData.area.trim()
            : partyData.area?.name || "",
        creditLimit: Number(partyData.creditLimit || 0),
        active: Boolean(partyData.active)
    });

    const fetchParties = async () => {

        try {

            const response = await axios.get(
                `${serverEndpoint}/party/parties`,
                {
                    params: {
                        page: currentPage,
                        limit: PAGE_SIZE,
                        search: search
                    }
                }
            );

            const data = response.data.items;

            setParties(data.parties || []);

            setTotalRecords(
                data.pagination?.totalRecords || 0
            );

            setTotalPages(
                data.pagination?.totalPages || 0
            );

        } catch (error) {

            console.error(
                "Error fetching parties:",
                error
            );

        }

    };

    useEffect(() => {

        fetchParties();

    }, [currentPage, search, serverEndpoint]);

    const handleSearchChange = (value) => {

        setSearch(value);

        setCurrentPage(1);

    };
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

    const confirmDelete = async () => {
        if (!partyToDelete?._id) return;

        try {
            await axios.delete(
                `${serverEndpoint}/party/delete-party/${partyToDelete._id}`
            );

            setParties(prev =>
                prev.filter(
                    p => p._id !== partyToDelete._id
                )
            );

            if (selectedParty?._id === partyToDelete._id) {
                setSelectedParty(null);
            }

            dispatch(
                showToast({
                    title: "Deleted",
                    message: "Party deleted successfully.",
                    variant: "danger"
                })
            );

            setShowDeleteModal(false);
            setPartyToDelete(null);
            fetchParties();
        } catch (error) {
            console.error("Error deleting party:", error);
            dispatch(
                showToast({
                    title: "Error",
                    message: "Failed to delete party.",
                    variant: "danger"
                })
            );
        }
    };

    const handleSaveParty = async (partyData) => {
        const payload = normalizePartyPayload(partyData);

        try {
            if (modalMode === "create") {
                const response = await axios.post(
                    `${serverEndpoint}/party/add-party`,
                    payload
                );

                const createdParty = response.data?.items;

                setParties(prev => [
                    createdParty,
                    ...prev.filter(p => p._id !== createdParty?._id)
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
                const response = await axios.put(
                    `${serverEndpoint}/party/update-party/${editingParty?._id}`,
                    payload
                );

                const updatedParty = response.data?.items;

                setParties(prev =>
                    prev.map(p =>
                        p._id === updatedParty?._id
                            ? { ...p, ...updatedParty }
                            : p
                    )
                );

                if (selectedParty?._id === updatedParty?._id) {
                    setSelectedParty(updatedParty);
                }

                dispatch(
                    showToast({
                        title: "Success",
                        message: "Party updated successfully.",
                        variant: "info"
                    })
                );
            }

            setShowPartyModal(false);
            setEditingParty(null);
            fetchParties();
        } catch (error) {
            console.error("Error saving party:", error);
            dispatch(
                showToast({
                    title: "Error",
                    message: modalMode === "create"
                        ? "Failed to add party."
                        : "Failed to update party.",
                    variant: "danger"
                })
            );
            throw error;
        }
    };

    return (

        <>
            <ManagementCard

                title="Parties"

                data={parties}

                columns={columns}

                buttonText="Add Party"

                pageSize={PAGE_SIZE}

                onAddClick={handleAddParty}

                paginationMode="server"

                currentPage={currentPage}

                setCurrentPage={setCurrentPage}

                totalRecords={totalRecords}

                totalPages={totalPages}

                search={search}

                onSearchChange={handleSearchChange}

                renderRow={(party) => (

                    <PartyTableRow

                        key={party._id}

                        party={party}

                        selectedParty={selectedParty}

                        setSelectedParty={setSelectedParty}

                        onEdit={handleEditParty}

                        onDelete={handleDeleteParty}

                    />

                )}
            />
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