import { Form } from "react-bootstrap";

const AreaForm = ({
    formData,
    setFormData,
    errors,
    setErrors
}) => {

    const handleChange = (e) => {

        const {

            name,

            value,

            checked,

            type

        } = e.target;

        setFormData(prev => ({

            ...prev,

            [name]:

                type === "checkbox"

                    ? checked

                    : value

        }));

        if (errors[name]) {

            setErrors(prev => ({

                ...prev,

                [name]: ""

            }));

        }

    };

    return (

        <Form>

            <Form.Group className="mb-3">

                <Form.Label>

                    Area Name

                    <span className="text-danger">*</span>

                </Form.Label>

                <Form.Control

                    name="name"

                    value={formData.name}

                    onChange={handleChange}

                    isInvalid={!!errors.name}

                />

                <Form.Control.Feedback type="invalid">

                    {errors.name}

                </Form.Control.Feedback>

            </Form.Group>

            <Form.Group className="mb-3">

                <Form.Label>

                    Description

                </Form.Label>

                <Form.Control

                    as="textarea"

                    rows={4}

                    name="description"

                    value={formData.description}

                    onChange={handleChange}

                />

            </Form.Group>

            <Form.Check

                type="switch"

                label="Active"

                name="active"

                checked={formData.active}

                onChange={handleChange}

            />

        </Form>

    );

};

export default AreaForm;