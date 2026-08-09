import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import LookupField from "../../common/LookupField";

const PartyForm = ({ formData, setFormData, errors, setErrors }) => {
    const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;
    const areaValue = typeof formData.area === "string"
        ? formData.area
        : formData.area?.name || "";

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

    const handleAreaSelect = (area) => {
        const areaName = area?.name || area?.description || "";

        setFormData(prev => ({
            ...prev,
            area: areaName
        }));
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
                    <LookupField
                        className=""
                        id="area"
                        label="Area"
                        placeholder="Search or enter area..."
                        value={areaValue}
                        onChange={(value) => setFormData(prev => ({ ...prev, area: value }))}
                        searchUrl={`${serverEndpoint}/area/search`}
                        showDropdown={true}
                        autoSearchOnChange={true}
                        allowCustomValue={true}
                        customValueMessage="New!"
                        onSelect={handleAreaSelect}
                        searchMode="query"
                        renderResultItem={(area) => (
                            <div className="d-flex flex-column">
                                <strong>{area.name}</strong>
                                {area.description && (
                                    <small className="text-muted">{area.description}</small>
                                )}
                            </div>
                        )}
                    />
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