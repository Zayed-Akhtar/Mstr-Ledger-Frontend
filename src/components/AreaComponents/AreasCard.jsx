import React, { useState, useEffect } from "react";
import axios from "axios";
import ManagementCard from "../common/ManagementCard";
import AreaTableRow from "./AreaTableRow";
import AreaModal from "./AreaModal";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import DefaultSpinner from "../spinners/DefaultSpinner";
import { useDispatch } from "react-redux";
import { showToast } from "../../features/toast/toastSlice";

const AreasCard = ({ refreshKey = 0 }) => {
    const [showAreaModal, setShowAreaModal] = useState(false);
    const [editingArea, setEditingArea] = useState(null);
    const [modalMode, setModalMode] = useState("create");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [areaToDelete, setAreaToDelete] = useState(null);
    const [areas, setAreas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSavingArea, setIsSavingArea] = useState(false);
    const [isDeletingArea, setIsDeletingArea] = useState(false);
    const dispatch = useDispatch();
    const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;
    const PAGE_SIZE = 5;

    const columns = [
        { key: "name", label: "Area Name" },
        { key: "description", label: "Description" },
        { key: "parties", label: "No. of Parties" },
        { key: "status", label: "Status" },
        { key: "actions", label: "Actions", className: "text-center" }
    ];

    const fetchAreas = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `${serverEndpoint}/area/areas`,
                {
                    params: {
                        page: currentPage,
                        limit: PAGE_SIZE,
                        search
                    },
                    withCredentials: true
                }
            );

            const data = response.data?.items || {};
            const areaList = Array.isArray(data.areas) ? data.areas : [];

            setAreas(areaList);
            setTotalRecords(data.pagination?.totalRecords || 0);
            setTotalPages(data.pagination?.totalPages || 0);
        } catch (error) {
            console.error("Error fetching areas:", error);
            setAreas([]);
            setTotalRecords(0);
            setTotalPages(0);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAreas();
    }, [currentPage, search, serverEndpoint, refreshKey]);

    const handleSearchChange = (value) => {
        setSearch(value);
        setCurrentPage(1);
    };

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

    const confirmDeleteArea = async () => {
        if (!areaToDelete?._id) return;

        setIsDeletingArea(true);

        try {
            await axios.delete(`${serverEndpoint}/area/delete-area/${areaToDelete._id}`, {withCredentials:true});

            setAreas(prev => prev.filter(area => area._id !== areaToDelete._id));
            dispatch(
                showToast({
                    title: "Deleted",
                    message: "Area deleted successfully.",
                    variant: "danger"
                })
            );

            setShowDeleteModal(false);
            setAreaToDelete(null);
            fetchAreas();
        } catch (error) {
            dispatch(
                showToast({
                    title: "Error",
                    message: "Failed to delete area.",
                    variant: "danger"
                })
            );
        } finally {
            setIsDeletingArea(false);
        }
    };

    const normalizeAreaPayload = (areaData) => ({
        ...areaData,
        name: areaData.name?.trim(),
        description: areaData.description?.trim() || "",
        active: Boolean(areaData.active)
    });

    const handleSaveArea = async (areaData) => {
        const payload = normalizeAreaPayload(areaData);
        setIsSavingArea(true);

        try {
            if (modalMode === "create") {
                const response = await axios.post(
                    `${serverEndpoint}/area/add-area`,
                    payload,{withCredentials:true}
                );

                const createdArea = response.data?.items || response.data?.area || response.data;
                setAreas(prev => [createdArea, ...prev.filter(area => area._id !== createdArea?._id)]);
                dispatch(
                    showToast({
                        title: "Success",
                        message: "Area added successfully.",
                        variant: "success"
                    })
                );
            } else {
                const response = await axios.put(
                    `${serverEndpoint}/area/update-area/${editingArea?._id}`,
                    payload, {withCredentials:true}
                );

                const updatedArea = response.data?.items || response.data?.area || response.data;
                setAreas(prev =>
                    prev.map(area =>
                        area._id === updatedArea?._id
                            ? { ...area, ...updatedArea }
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

            setShowAreaModal(false);
            setEditingArea(null);
            setModalMode("create");
            fetchAreas();
        } catch (error) {
            console.error("Error saving area:", error);
            const errorMessage = error?.response?.data?.message
                || error?.message
                || (modalMode === "create"
                    ? "Failed to add area."
                    : "Failed to update area.");

            dispatch(
                showToast({
                    title: "Error",
                    message: errorMessage,
                    variant: "danger"
                })
            );
            throw error;
        } finally {
            setIsSavingArea(false);
        }
    };

    const handleCloseAreaModal = () => {
        setShowAreaModal(false);
        setEditingArea(null);
        setModalMode("create");
    };

    return (
        <>
            {isLoading && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(255,255,255,0.75)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 30
                }}>
                    <DefaultSpinner size={64} />
                </div>
            )}
            <ManagementCard
                title="Areas"
                data={areas}
                columns={columns}
                searchField="name"
                buttonText="Add Area"
                pageSize={PAGE_SIZE}
                onAddClick={handleAddArea}
                paginationMode="server"
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalRecords={totalRecords}
                totalPages={totalPages}
                search={search}
                onSearchChange={handleSearchChange}
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
                saving={isSavingArea}
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
                isDeleting={isDeletingArea}
            />
        </>
    );
};

export default AreasCard;