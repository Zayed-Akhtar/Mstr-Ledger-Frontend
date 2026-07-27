import Dropdown from "react-bootstrap/Dropdown";
import { HiDotsVertical } from "react-icons/hi";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ActionDropdown = ({
    editLabel = "Edit",
    deleteLabel = "Delete",
    onEdit,
    onDelete
}) => {

    return (

        <Dropdown onClick={(e) => e.stopPropagation()}>

            <Dropdown.Toggle
                variant="light"
                size="sm"
                className="action-dropdown border-0 shadow-none"
            >
                <HiDotsVertical />

            </Dropdown.Toggle>

            <Dropdown.Menu
                align="end"
                className="shadow border-0 rounded-3"
            >

                <Dropdown.Item onClick={onEdit}>

                    <FaPencilAlt style={{fontSize:'medium', marginRight:'3%', marginBottom:'3%'}}/>
                    {editLabel}

                </Dropdown.Item>

                <Dropdown.Divider />

                <Dropdown.Item
                    onClick={onDelete}
                    className="text-danger"
                >

                    <MdDelete  style={{marginRight:'3%', marginBottom:'3%'}}/>
                    {deleteLabel}

                </Dropdown.Item>

            </Dropdown.Menu>

        </Dropdown>

    );

};

export default ActionDropdown;