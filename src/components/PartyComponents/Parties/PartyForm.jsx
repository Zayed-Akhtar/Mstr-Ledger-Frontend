import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

const PartyForm = ({ formData, setFormData, errors, setErrors }) => {

    const handleChange = (e) => {

        const { name, value, checked, type } = e.target;

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

            <Row className="g-3">

                <Col md={6}>

                    <Form.Group>

                        <Form.Label>

                            Party Code <span className="text-danger">*</span>

                        </Form.Label>

                        <Form.Control
                            name="partyCode"
                            value={formData.partyCode}
                            onChange={handleChange}
                            placeholder="Enter Party Code"
                            isInvalid={!!errors.partyCode}
                        />

                        <Form.Control.Feedback type="invalid">

                            {errors.partyCode}

                        </Form.Control.Feedback>

                    </Form.Group>

                </Col>
                <Col md={6}>

                    <Form.Group>

                        <Form.Label>

                            Party Name <span className="text-danger">*</span>

                        </Form.Label>

                        <Form.Control
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter party name"
                            isInvalid={!!errors.name}
                        />

                        <Form.Control.Feedback type="invalid">

                            {errors.name}

                        </Form.Control.Feedback>

                    </Form.Group>

                </Col>

                <Col md={6}>

                    <Form.Group>

                        <Form.Label>

                            Mobile Number

                        </Form.Label>

                        <Form.Control
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="9876543210"
                            isInvalid={!!errors.phoneNumber}
                        />

                        <Form.Control.Feedback type="invalid">

                            {errors.phoneNumber}

                        </Form.Control.Feedback>

                    </Form.Group>

                </Col>

                <Col md={6}>

                    <Form.Group>

                        <Form.Label>

                            Email

                        </Form.Label>

                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@email.com"
                            isInvalid={!!errors.email}
                        />

                        <Form.Control.Feedback type="invalid">

                            {errors.email}

                        </Form.Control.Feedback>

                    </Form.Group>

                </Col>

                <Col md={6}>

                    <Form.Group>

                        <Form.Label>

                            Area

                        </Form.Label>

                        <Form.Select
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                        >

                            <option value="">Select Area</option>

                            <option>Civil Lines</option>

                            <option>Main Market</option>

                            <option>Sector 19</option>

                        </Form.Select>

                    </Form.Group>

                </Col>

                <Col md={4}>

                    <Form.Group>

                        <Form.Label>

                            Credit Limit / days

                        </Form.Label>

                        <Form.Control
                            type="number"
                            name="creditLimit"
                            value={formData.creditLimit}
                            onChange={handleChange}
                            isInvalid={!!errors.creditLimit}
                        />

                        <Form.Control.Feedback type="invalid">

                            {errors.creditLimit}

                        </Form.Control.Feedback>

                    </Form.Group>

                </Col>

                <Col md={12}>

                    <Form.Group>

                        <Form.Label>

                            Address

                        </Form.Label>

                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="fullAddress"
                            value={formData.fullAddress}
                            onChange={handleChange}
                            placeholder="Enter address..."
                        />

                    </Form.Group>

                </Col>

                <Col md={12}>

                    <Form.Check
                        type="switch"
                        label="Active"
                        name="active"
                        checked={formData.active}
                        onChange={handleChange}
                    />

                </Col>

            </Row>

        </Form>

    );

};

export default PartyForm;