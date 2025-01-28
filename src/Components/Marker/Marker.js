import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const mockassesments = [
    {
        id: 1,
        question:
            "Are you seeking a Parent Company marker in order to discharge a Legal, Regulatory or Fiduciary responsibility on behalf of BT?",
        name: "legalResponsibility",
        type: "radio",
        options: ["Yes", "No"]
    },
    {
        id: 2,
        question:
            "Are you seeking a Parent Company marker in order to access Openreach Commercial Information (CI) or Customer Confidential Information (CCI)?",
        name: "accessConfidentialInfo",
        type: "radio",
        options: ["Yes", "No"]
    },
    {
        id: 3,
        question:
            "Please provide details to support your application including specific information on your Parent Company role responsibilities.",
        name: "additionalDetails",
        type: "textarea"
    },
    {
        id: 4,
        question:
            "Are you seeking a Parent Company marker in order to access systems?",
        name: "accessSystem",
        type: "radio",
        options: ["Yes", "No"]
    },
    {
        id: 5,
        question:
            "Have you applied to be in this Parent Company role to undertake a short term assignment or project?",
        name: "shortTermAssignment",
        type: "radio",
        options: ["Yes", "No"]
    }
];

const ApplyForMarker = () => {
    const [formData, setFormData] = useState({
        applyMarker: "",
        type: "Parent",
        marker: "RCMS to LMS",
        legalResponsibility: false,
        accessConfidentialInfo: false,
        additionalDetails: "",
        accessSystem: false,
        shortTermAssignment: false
    });

    const [showQuestions, setShowQuestions] = useState(false); // Control visibility of questions

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        // alert("Form submitted successfully!");
    };

    const handleProceed = () => {
        setShowQuestions(true); // Show questions when "Proceed" is clicked
    };

    return (
        <Container fluid className="py-4 h-100 container-background">
            <div>
                <Row className="mb-4">
                    <Col md={12}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h6 className="mb-0">Apply for marker</h6>
                            <Form.Group>
                                <Form.Select
                                   className="rounded-0"
                                    name="applyMarker"
                                    value={formData.applyMarker}
                                    onChange={handleChange}
                                    style={{ width: "250px" }}
                                >
                                    <option value="">Select marker</option>
                                    <option value="1">Apply Your Marker</option>
                                    <option value="2">Leave Your Marker</option>
                                    <option value="3">Extend Your Marker</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                    </Col>
                </Row>

                {/* Type and Marker Section */}
                <Row className="mb-4">
                    <Col md={3}>
                        <Form.Select
                         className="rounded-0"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <option value="Parent">Parent</option>
                            <option value="Child">Child</option>
                        </Form.Select>
                    </Col>
                    <Col md={3}>
                        <Form.Select
                            name="marker"
                             className="rounded-0"
                            value={formData.marker}
                            onChange={handleChange}
                        >
                            <option value="RCMS to LMS">RCMS to LMS</option>
                            <option value="LMS to RCMS">LMS to RCMS</option>
                           
                        </Form.Select>
                    </Col>
                    <Col md={2} className="d-flex justify-content-start">
                        <Button variant="dark" className="w-100 rounded-0" onClick={handleProceed}>
                            Proceed
                        </Button>
                    </Col>
                </Row>

                {/* Questions Section */}
                {showQuestions && (
                    <Card className="p-4 border rounded-0">
                        <Form onSubmit={handleSubmit}>
                            <div style={{ textAlign: "start" }}>
                                {mockassesments.map((q) => (
                                    <Form.Group
                                        key={q.id}
                                        className="mb-4 p-3 border bg-light"
                                    >
                                        <Form.Label>{q.id}. {q.question}</Form.Label>
                                        {q.type === "radio" ? (
                                            <div>
                                                {q.options.map((option) => (
                                                    <Form.Check
                                                        inline
                                                        key={option}
                                                        label={option}
                                                        name={q.name}
                                                        type="radio"
                                                        value={option === "Yes"}
                                                        checked={
                                                            formData[q.name] ===
                                                            (option === "Yes")
                                                        }
                                                        onChange={handleChange}
                                                    />
                                                ))}
                                            </div>
                                        ) : (
                                            <Form.Control
                                                as="textarea"
                                                rows={5}
                                                name={q.name}
                                                value={formData[q.name]}
                                                onChange={handleChange}
                                                placeholder="Enter details here..."
                                            />
                                        )}
                                    </Form.Group>
                                ))}

                                {/* Submit Button */}
                                <div className="d-flex justify-content-end">
                                    <Button variant="dark" className="rounded-0" type="submit">
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </Card>
                )}
            </div>
        </Container>
    );
};

export default ApplyForMarker;