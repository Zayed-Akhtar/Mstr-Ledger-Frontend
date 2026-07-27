import { Modal, Button } from "react-bootstrap";

const ConfirmDeleteModal = ({
    show,
    onHide,
    title,
    itemName,
    message,
    onConfirm
}) => {

    return (

        <Modal
            show={show}
            onHide={onHide}
            centered
            size="md"
        >

            <Modal.Header closeButton>

                <Modal.Title className="text-danger">

                    <i className="bi bi-trash3-fill me-2"></i>

                    {title}

                </Modal.Title>

            </Modal.Header>

            <Modal.Body>

                <div className="text-center py-3">

                    <div
                        className="rounded-circle bg-danger bg-opacity-10 d-inline-flex justify-content-center align-items-center"
                        style={{
                            width: 70,
                            height: 70
                        }}
                    >

                        <i
                            className="bi bi-trash3-fill text-danger"
                            style={{ fontSize: "2rem" }}
                        ></i>

                    </div>

                    <h5 className="mt-4">

                        {message}

                    </h5>

                    <p className="fw-semibold mb-1">

                        {itemName}

                    </p>

                    <small className="text-secondary">

                        This action cannot be undone.

                    </small>

                </div>

            </Modal.Body>

            <Modal.Footer>

                <Button
                    variant="outline-secondary"
                    onClick={onHide}
                >

                    Cancel

                </Button>

                <Button
                    variant="danger"
                    onClick={onConfirm}
                >

                    <i className="bi bi-trash me-2"></i>

                    Delete

                </Button>

            </Modal.Footer>

        </Modal>

    );

};

export default ConfirmDeleteModal;