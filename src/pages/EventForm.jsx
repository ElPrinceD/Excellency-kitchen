import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input, Button, Label } from "reactstrap";
import "../styles/event-form.css";

const EventForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [hall, setHall] = useState("");

  // Set default date to today's date on component mount
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    setDate(today); // Set the default date state
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Navigate to the Subscription page with the name and hall selection
    navigate("/subscription", { state: { userName: name, selectedHall: hall } });
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
                  <Label for="contractHolderName">Contract Holder Name</Label>
                  <Input
                    type="text"
                    id="contractHolderName"
                    placeholder="Enter contract holder's name"
                    className="custom-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="emailAddress">Email Address</Label>
                  <Input
                    type="email"
                    id="emailAddress"
                    placeholder="Enter email address"
                    className="custom-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="eventDate">Event Date</Label>
                  <Input
                    type="date"
                    id="eventDate"
                    className="custom-input"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="numberOfGuests">Number of Guests</Label>
                  <Input
                    type="number"
                    id="numberOfGuests"
                    placeholder="Enter number of guests"
                    className="custom-input"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="hallSelect">Select Hall</Label>
                  <Input
                    type="select"
                    id="hallSelect"
                    value={hall}
                    onChange={(e) => setHall(e.target.value)}
                    required
                  >
                    <option value="">Select a Hall</option>
                    <option value="Aramesh">Aramesh</option>
                    <option value="Balmayna">Balmayna</option>
                    <option value="Bellisima">Bellisima</option>
                    <option value="Jumeirah">Jumeirah</option>
                    <option value="Palm Suite">Palm Suite</option>
                  </Input>
                </FormGroup>

                <Button type="submit" className="submit-btn">Next Page</Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EventForm;
