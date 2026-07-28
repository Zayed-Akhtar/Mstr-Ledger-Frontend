import React, { useState } from "react";
import ManagementCard from "../common/ManagementCard";
import AreaTableRow from "./AreaTableRow";
import AreaModal from "./AreaModal";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import { useDispatch } from "react-redux";
import { showToast } from "../../features/toast/toastSlice";

const AreasCard = () => {
    const [showAreaModal, setShowAreaModal] = useState(false);

    const [editingArea, setEditingArea] = useState(null);

    const [modalMode, setModalMode] = useState("create");
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [areaToDelete, setAreaToDelete] = useState(null);
    const dispatch = useDispatch();

    const [areas, setAreas] = useState([

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

    ]);
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
    const handleAddArea = () => {

        setEditingArea(null);

        setModalMode("create");

        setShowAreaModal(true);

    };

    const handleEditArea = (area) => {

        setEditingArea(area);

        setModalMode("edit");

        setShowAreaModal(true);

    };

    const handleDeleteArea = (area) => {

        setAreaToDelete(area);

        setShowDeleteModal(true);

    };
    const confirmDeleteArea = () => {

        setAreas(prev =>

            prev.filter(area =>

                area._id !== areaToDelete._id

            )

        );
        dispatch(
            showToast({
                title: "Deleted",
                message: "Area deleted successfully.",
                variant: "danger"
            })
        );

        setShowDeleteModal(false);

        setAreaToDelete(null);

    };

    const handleSaveArea = (areaData) => {

        if (modalMode === "create") {

            const newArea = {

                ...areaData,

                _id: Date.now(),

                totalParties: 0

            };

            setAreas(prev => [

                ...prev,

                newArea

            ]);
            dispatch(
                showToast({
                    title: "Success",
                    message: "Area added successfully.",
                    variant: "success"
                })
            );

        }
        else {

            setAreas(prev =>

                prev.map(area =>

                    area._id === editingArea._id

                        ? {

                            ...area,

                            ...areaData

                        }

                        : area

                )

            );
            dispatch(
                showToast({
                    title: "Success",
                    message: "Area updated successfully.",
                    variant: "info"
                })
            );

        }

    };

    const handleCloseAreaModal = () => {

        setShowAreaModal(false);

        setEditingArea(null);

        setModalMode("create");

    };

    return (
        <>
            <ManagementCard
                title="Areas"
                data={areas}
                columns={columns}
                searchField="name"
                buttonText="Add Area"
                pageSize={5}
                onAddClick={handleAddArea}
                renderRow={(area) => (
                    <AreaTableRow
                        key={area._id}
                        area={area}
                        onEdit={handleEditArea}
                        onDelete={handleDeleteArea}
                    />
                )}
            />

            <AreaModal
                show={showAreaModal}
                onHide={handleCloseAreaModal}
                mode={modalMode}
                area={editingArea}
                onSave={handleSaveArea}
            />
            <ConfirmDeleteModal

                show={showDeleteModal}

                onHide={() => {

                    setShowDeleteModal(false);

                    setAreaToDelete(null);

                }}

                title="Delete Area"

                message="Are you sure you want to delete"

                itemName={areaToDelete?.name}

                onConfirm={confirmDeleteArea}

            />
        </>
    );

};

export default AreasCard;