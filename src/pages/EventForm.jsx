import React from "react";
import { Container, Row, Col, Form, FormGroup, Input, Button } from "reactstrap";
import "../styles/event-form.css"; // Ensure this path is correct

const EventForm = () => {
  return (
    <div className="event-form">
      <Container>
        <Row className="justify-content-center">
          <Col lg="6" md="8">
            <div className="form-container">
              <h2 className="form-title">Reservation Details</h2>
              <Form>
                <FormGroup>
                  <Input
                    type="text"
                    placeholder="Name"
                    className="custom-input"
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
                    className="custom-input"
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
                <Button className="submit-btn">Submit</Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EventForm;
