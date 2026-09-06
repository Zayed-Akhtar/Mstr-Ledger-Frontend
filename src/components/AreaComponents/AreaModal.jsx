import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import AreaForm from "./AreaForm";
import SpinnerButton from "../spinners/SpinnerButton";


const emptyArea = {

    name: "",

    description: "",

    active: true

};
const AreaModal = ({
    show,
    onHide,
    mode,
    area,
    onSave,
    saving: savingProp = false
}) => {
    const [formData, setFormData] = useState(emptyArea);

    const [errors, setErrors] = useState({});
    const [savingLocal, setSavingLocal] = useState(false);
    const isSaving = savingProp || savingLocal;

    useEffect(() => {

        if (mode === "edit" && area) {

            setFormData({

                ...emptyArea,

                ...area

            });

        }
        else {

            setFormData(emptyArea);

        }

    }, [mode, area]);

    const handleClose = () => {

        setFormData(emptyArea);

        setErrors({});

        onHide();

    };

    const validate = () => {

        const newErrors = {};

        if (!formData.name.trim()) {

            newErrors.name = "Area Name is required.";

        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    const handleSave = async () => {

        if (!validate()) {

            return;

        }

        setSavingLocal(true);

        try {
            await onSave(formData);
            handleClose();
        } catch (error) {
            // keep modal open if server rejected the save
        } finally {
            setSavingLocal(false);
        }

    };

    return (

        <Modal

            show={show}

            onHide={handleClose}

            centered

            size="lg"

        >

            <Modal.Header closeButton>

                <Modal.Title>

                    {

                        mode === "create"

                            ? "Add Area"

                            : "Edit Area"

                    }

                </Modal.Title>

            </Modal.Header>

            <Modal.Body>

                <AreaForm

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

                    disabled={isSaving}

                >

                    Cancel

                </Button>

                <Button

                    variant="primary"

                    disabled={isSaving}

                    onClick={handleSave}

                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}

                >

                    {isSaving && <SpinnerButton size={16} />}

                    <span>

                        {

                            isSaving

                                ? "Saving..."

                                : mode === "create"

                                    ? "Save Area"

                                    : "Save Changes"

                        }

                    </span>

                </Button>

            </Modal.Footer>

        </Modal>

    );

};

export default AreaModal;