import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input, Button, Label } from "reactstrap";
import "../styles/event-form.css";

const EventForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  // Set default date to today's date on component mount
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    setDate(today); // Set the default date state
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Navigate to the Subscription page with the name
    navigate("/subscription", { state: { userName: name } });
  };

  return (
    <div className="event-form">
      <Container>
        <Row className="justify-content-center">
          <Col lg="6" md="8">
            <div className="form-container">
              <h2 className="form-title">Reservation Details</h2>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Input
                    type="text"
                    placeholder="Contract Holder Name"
                    className="custom-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    className="custom-input"
                    required
                  />

                
                </FormGroup>

                <FormGroup>
                
                  <Input
                    type="date"
                    placeholder="Date"
                    className="custom-input"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="number"
                    placeholder="Number of Guests"
                    className="custom-input"
                    required
                  />
                </FormGroup>
                <Button type="submit" className="submit-btn">Submit</Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EventForm;