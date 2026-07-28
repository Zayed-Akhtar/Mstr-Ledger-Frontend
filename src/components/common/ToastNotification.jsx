import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../../features/toast/toastSlice";

const ToastNotification = () => {

    const dispatch = useDispatch();

    const {

        show,

        message,

        variant

    } = useSelector(state => state.toast);

    return (

        <ToastContainer
            position="top-end"
            className="p-3"
        >

            <Toast

                show={show}

                bg={variant}

                autohide

                delay={3000}

                onClose={() => dispatch(hideToast())}

            >

                <Toast.Header>

                    <strong className="me-auto">

                        {

                            variant === "success"

                                ? "Success"

                                : variant === "danger"

                                    ? "Error"

                                    : variant === "warning"

                                        ? "Warning"

                                        : "Information"

                        }

                    </strong>

                </Toast.Header>

                <Toast.Body className="text-white">

                    {message}

                </Toast.Body>

            </Toast>

        </ToastContainer>

    );

};

export default ToastNotification;