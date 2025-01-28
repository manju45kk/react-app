import React, { useState } from "react";
import { Card, Button, Form, Row, Col, InputGroup } from "react-bootstrap";

const SelectMarkerPage = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const markerTypes = [
    { title: "Parent", description: "RCM are for those who carry out activities within BT Group..." },
    { title: "Supplier", description: "RCM are for those who carry out activities within BT Group..." },
    { title: "Contract", description: "RCM are for those who carry out activities within BT Group..." },
  ];

  const markerOptions = [
    "RCMS US LMS Test(745)",
    "RCMS US LMS Test(746)",
    "RCMS US LMS Test(747)",
    "RCMS US LMS Test(748)",
  ];

  return (
    <div className="container mt-4">
      {/* Header */}
      <h3>Select Marker</h3>
      <p>Please select the marker which you want to apply for.</p>

      {/* Marker Type Section */}
      <Row className="mb-3">
        {markerTypes.map((marker, index) => (
          <Col key={index} md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{marker.title}</Card.Title>
                <Card.Text>{marker.description}</Card.Text>
                <a href="#">Learn more →</a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Select Marker Section */}
      <h5 className="mt-3">Select Marker</h5>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {/* Marker Options */}
      <div className="border p-3">
        {markerOptions
          .filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((option, index) => (
            <Form.Check
              key={index}
              type="radio"
              label={option}
              name="marker"
              value={option}
              className="mb-2 p-2 border rounded"
              style={{
                background: selectedMarker === option ? "#222" : "#fff",
                color: selectedMarker === option ? "#fff" : "#000",
              }}
              onChange={() => setSelectedMarker(option)}
            />
          ))}
      </div>

      {/* Footer Buttons */}
      <div className="d-flex justify-content-between mt-3">
        <Button variant="link">Cancel</Button>
        <div>
          <Button variant="secondary" className="me-2">← Back</Button>
          <Button variant="primary">Next →</Button>
        </div>
      </div>
    </div>
  );
};

export default SelectMarkerPage;
