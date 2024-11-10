import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";

const RegisterClientPage = () => {
    const [clientName, setClientName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [numberOfPeople, setNumberOfPeople] = useState("");
    const [hall, setHall] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();

        // Simulate API call to register the client
        const newClient = {
            name: clientName,
            contactNumber: contactNumber,
            email: email,
            address: address,
            numberOfPeople: numberOfPeople,
            hall: hall,
            eventDate: eventDate,
        };

        console.log("Registered client:", newClient);

        // Reset form and show success message
        setClientName("");
        setContactNumber("");
        setEmail("");
        setAddress("");
        setNumberOfPeople("");
        setHall("");
        setEventDate("");
        setRegistrationSuccess(true);

        // Remove success message after 3 seconds
        setTimeout(() => setRegistrationSuccess(false), 3000);
    };

    return (
        <Container>
            <h2 className="mb-4">Register New Client</h2>
            {registrationSuccess && (
                <Alert color="success" className="rounded-lg shadow-sm">
                    Client registered successfully!
                </Alert>
            )}
            <Form onSubmit={handleRegister}>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="clientName">Client Name</Label>
                            <Input
                                type="text"
                                id="clientName"
                                placeholder="Enter client's name"
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="contactNumber">Contact Number</Label>
                            <Input
                                type="text"
                                id="contactNumber"
                                placeholder="Enter contact number"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                                required
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="address">Address</Label>
                            <Input
                                type="text"
                                id="address"
                                placeholder="Enter address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="numberOfPeople">Number of People</Label>
                            <Input
                                type="number"
                                id="numberOfPeople"
                                placeholder="Enter number of people"
                                value={numberOfPeople}
                                onChange={(e) => setNumberOfPeople(e.target.value)}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="hall">Hall</Label>
                            <Input
                                type="select"
                                id="hall"
                                value={hall}
                                onChange={(e) => setHall(e.target.value)}
                                required
                            >
                                <option value="">Select a hall</option>
                                <option value="Bellisima">Bellisima</option>
                                <option value="Versaille">Versaille</option>
                                <option value="Balmayna">Balmayna</option>
                                <option value="Lotus">Lotus</option>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="eventDate">Event Date</Label>
                            <Input
                                type="date"
                                id="eventDate"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                                required
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Button type="submit" color="primary" className="rounded-lg shadow-sm">
                    Register Client
                </Button>
            </Form>
        </Container>
    );
};

export default RegisterClientPage;
