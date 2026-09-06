import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import PartyForm from "./PartyForm";
import SpinnerButton from "../../spinners/SpinnerButton";

const emptyParty = {
    partyCode:"",
    name: "",
    email: "",
    area: "",
    creditLimit: "",
    phoneNumber: "",
    fullAddress:"",
    active: true
};

const PartyModal = ({
    show,
    onHide,
    mode,
    party,
    onSave,
    saving = false
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
        if (!formData.partyCode.trim()) {

            newErrors.partyCode = "Party Code is required.";

        }
        if (
            formData.phoneNumber &&
            !/^[0-9]{10}$/.test(formData.phoneNumber)
        ) {

            newErrors.phoneNumber =
                "Mobile Number must contain exactly 10 digits.";

        }

        if (
            formData.email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {

            newErrors.email = "Please enter a valid email address.";

        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };
   const handleSave = async () => {

    if (!validateForm()) {

        return;

    }

    try {
        await onSave(formData);
        handleClose();
    } catch (error) {
        // keep modal open when backend save fails
    }

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
                    disabled={saving}
                >

                    Cancel

                </Button>

                <Button
                    variant="primary"
                    onClick={handleSave}
                    disabled={saving}
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                    {saving && <SpinnerButton size={16} />}
                    <span>
                        {saving
                            ? (mode === "create" ? "Saving Party..." : "Saving Changes...")
                            : (mode === "create" ? "Save Party" : "Save Changes")}
                    </span>
                </Button>

            </Modal.Footer>

        </Modal>

    );

};

export default PartyModal;