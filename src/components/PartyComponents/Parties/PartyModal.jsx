import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import PartyForm from "./PartyForm";

const emptyParty = {
    name: "",
    mobileNumber: "",
    email: "",
    area: "",
    openingBalance: "",
    balanceType: "Debit",
    address: "",
    active: true
};

const PartyModal = ({
    show,
    onHide,
    mode,
    party,
    onSave
}) => {

    const [formData, setFormData] = useState(emptyParty);
    const [errors, setErrors] = useState({});
    useEffect(() => {

        if (mode === "edit" && party) {

            setFormData({
                ...emptyParty,
                ...party
            });

        }
        else {

            setFormData(emptyParty);

        }

    }, [mode, party]);

    const handleClose = () => {

        setFormData(emptyParty);

        setErrors({});

        onHide();

    };
    const validateForm = () => {

        const newErrors = {};

        if (!formData.name.trim()) {

            newErrors.name = "Party Name is required.";

        }

        if (
            formData.mobileNumber &&
            !/^[0-9]{10}$/.test(formData.mobileNumber)
        ) {

            newErrors.mobileNumber =
                "Mobile Number must contain exactly 10 digits.";

        }

        if (
            formData.email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {

            newErrors.email = "Please enter a valid email address.";

        }

        if (
            formData.openingBalance &&
            Number(formData.openingBalance) < 0
        ) {

            newErrors.openingBalance =
                "Opening Balance cannot be negative.";

        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };
   const handleSave = () => {

    if (!validateForm()) {

        return;

    }

    onSave(formData);

    handleClose();

};

    return (

        <Modal

            show={show}

            onHide={handleClose}

            centered

            size="xl"

            scrollable

        >

            <Modal.Header closeButton>

                <Modal.Title>

                    {

                        mode === "create"

                            ? "Add New Party"

                            : "Edit Party"

                    }

                </Modal.Title>

            </Modal.Header>

            <Modal.Body>

                <PartyForm
                    formData={formData}
                    setFormData={setFormData}
                    errors={errors}
                    setErrors={setErrors}
                />

            </Modal.Body>

            <Modal.Footer>

                <Button
                    variant="outline-secondary"
                    onClick={handleClose}
                >

                    Cancel

                </Button>

                <Button
                    variant="primary"
                    onClick={handleSave}
                >

                    <i className="bi bi-check-circle me-2"></i>

                    {

                        mode === "create"

                            ? "Save Party"

                            : "Save Changes"

                    }

                </Button>

            </Modal.Footer>

        </Modal>

    );

};

export default PartyModal;