import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import '../styles/register.css';
import { makeReservation } from "../api/reservation";
import { getAuthToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const RegisterClientPage = () => {
    const [clientName, setClientName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [subscriptionType, setSubscriptionType] = useState("")
    const [numberOfPeople, setNumberOfPeople] = useState("");
    const [hall, setHall] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const navigate = useNavigate();

    const [validationError, setValidationError] = useState("");

    // Function to generate a random password based on name and hall


    const handleRegister = async (e) => {
        e.preventDefault();
        if (!clientName || !contactNumber || !email || !address || !numberOfPeople || !hall || !eventDate || !eventTime) {
            setValidationError("Please fill in all required fields.");
            setRegistrationSuccess(false);
            return;
        }

        setValidationError("");

        const newClient = {
            client_name: clientName,
            contact_number: contactNumber,
            email,
            address,
            number_of_people: numberOfPeople,
            hall,
            meal_subscription: subscriptionType,
            date: eventDate,
            time: eventTime,
        };

        const token = getAuthToken(); // Retrieve the token from localStorage

        try {
            const response = await makeReservation(newClient, token);
            setRegistrationSuccess(true);
            // Reset form after successful registration
            setClientName("");
            setContactNumber("");
            setEmail("");
            setAddress("");
            setNumberOfPeople("");
            setHall("");
            setEventDate("");
            setEventTime("");
            navigate("/admin");
        } catch (error) {
            setValidationError(error);
        }

        // Remove success message after 3 seconds
        setTimeout(() => setRegistrationSuccess(false), 3000);
    };

    return (
        <Container>
            <h2 className="mb-4">Register New Client</h2>

            {/* Show red alert for validation errors */}
            {validationError && (
                <Alert color="danger" className="rounded-lg shadow-sm">
                    {validationError}
                </Alert>
            )}

            {/* Show green alert for successful registration */}
            {registrationSuccess && (
                <Alert color="success" className="rounded-lg shadow-sm">
                    Client registered successfully!
                </Alert>
            )}

            <Form onSubmit={handleRegister}>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="clientName">Client Contract Name</Label>
                            <Input
                                type="text"
                                id="clientName"
                                placeholder="Enter client's contract name"
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

                            />
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <Label for="Suscription">Dish Subscription</Label>
                    <div className="horizontal-options">
                        <div
                            className="square-radio-btn"
                            onClick={() => setSubscriptionType("Silver")}
                            style={{ cursor: "pointer" }}
                        >
                            <input
                                type="radio"
                                name="subscription"
                                value="Silver"
                                checked={subscriptionType === "Silver"}
                                onChange={() => setSubscriptionType("Silver")}
                                required
                                style={{ marginRight: "8px" }}
                            />
                            <span className="normal-text">Silver</span>
                        </div>
                        <div
                            className="square-radio-btn"
                            onClick={() => setSubscriptionType("Gold")}
                            style={{ cursor: "pointer" }}
                        >
                            <input
                                type="radio"
                                name="subscription"
                                value="Gold"
                                checked={subscriptionType === "Gold"}
                                onChange={() => setSubscriptionType("Gold")}
                                required
                                style={{ marginRight: "8px" }}
                            />
                            <span className="normal-text">Gold</span>
                        </div>
                        <div
                            className="square-radio-btn"
                            onClick={() => setSubscriptionType("Platinum")}
                            style={{ cursor: "pointer" }}
                        >
                            <input
                                type="radio"
                                name="subscription"
                                value="Platinum"
                                checked={subscriptionType === "Platinum"}
                                onChange={() => setSubscriptionType("Platinum")}
                                required
                                style={{ marginRight: "8px" }}
                            />
                            <span className="normal-text">Platinum</span>
                        </div>
                    </div>
                </FormGroup>
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
                            <div className="horizontal-options">
                                {/* Custom radio buttons with hall-specific text color */}
                                <div
                                    className="square-radio-btn"
                                    onClick={() => setHall("Bellisima")}
                                    style={{ cursor: "pointer" }}
                                >
                                    <input
                                        type="radio"
                                        name="hall"
                                        value="Bellisima"
                                        checked={hall === "Bellisima"}
                                        onChange={() => setHall("Bellisima")}
                                        required
                                        style={{ marginRight: "8px" }}
                                    />
                                    <span className={hall === "Bellisima" ? "bellisima-text-color" : "bellisima-text-color"}>
                                        Bellisima
                                    </span>
                                </div>

                                <div
                                    className="square-radio-btn"
                                    onClick={() => setHall("Versaille")}
                                    style={{ cursor: "pointer" }}
                                >
                                    <input
                                        type="radio"
                                        name="hall"
                                        value="Versaille"
                                        checked={hall === "Versaille"}
                                        onChange={() => setHall("Versaille")}
                                        required
                                        style={{ marginRight: "8px" }}
                                    />
                                    <span className={hall === "Versaille" ? "versailles-text-color" : "versailles-text-color"}>
                                        Versaille
                                    </span>
                                </div>



                                <div
                                    className="square-radio-btn"
                                    onClick={() => setHall("Lotus")}
                                    style={{ cursor: "pointer" }}
                                >
                                    <input
                                        type="radio"
                                        name="hall"
                                        value="Lotus"
                                        checked={hall === "Lotus"}
                                        onChange={() => setHall("Lotus")}
                                        required
                                        style={{ marginRight: "8px" }}
                                    />
                                    <span className={hall === "Lotus" ? "lotus-text-color" : "lotus-text-color"}>
                                        Lotus
                                    </span>
                                </div>

                                <div
                                    className="square-radio-btn"
                                    onClick={() => setHall("Jomaireh")}
                                    style={{ cursor: "pointer" }}
                                >
                                    <input
                                        type="radio"
                                        name="hall"
                                        value="Jomaireh"
                                        checked={hall === "Jomaireh"}
                                        onChange={() => setHall("Jomaireh")}
                                        required
                                        style={{ marginRight: "8px" }}
                                    />
                                    <span className={hall === "Jomaireh" ? "jomaireh-text-color" : "jomaireh-text-color"}>
                                        Jomaireh
                                    </span>
                                </div>

                                <div
                                    className="square-radio-btn"
                                    onClick={() => setHall("Palm")}
                                    style={{ cursor: "pointer" }}
                                >
                                    <input
                                        type="radio"
                                        name="hall"
                                        value="Palm"
                                        checked={hall === "Palm"}
                                        onChange={() => setHall("Palm")}
                                        required
                                        style={{ marginRight: "8px" }}
                                    />
                                    <span className={hall === "Palm" ? "palmSuite-text-color" : "palmSuite-text-color"}>
                                        Palm
                                    </span>
                                </div>
                            </div>
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
                    <Col md={6}>
                        <FormGroup>
                            <Label for="eventTime">Event Time</Label>
                            <div>
                                <Label check>
                                    <Input
                                        type="radio"
                                        name="eventTime"
                                        value="AM"
                                        checked={eventTime === "AM"}
                                        onChange={() => setEventTime("AM")}
                                        required
                                    />
                                    AM
                                </Label>
                                <Label check className="ml-5">
                                    <Input
                                        type="radio"
                                        name="eventTime"
                                        value="PM"
                                        checked={eventTime === "PM"}
                                        onChange={() => setEventTime("PM")}
                                        required
                                    />
                                    PM
                                </Label>
                            </div>
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
