import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../api/config";
import { getReservationById } from "../api/reservation";
import { setReservationID, setAuthToken } from "../utils/auth";
import "../styles/welcome-page.css";

const WelcomePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [reservation, setReservation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Extract token from URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const reservationId = queryParams.get("reservation_id");
    setReservationID(reservationId)
    setAuthToken(token)
    console.log("Now token: ", token)

    useEffect(() => {
        if (!token) {
            setError("Invalid or missing token.");
            setLoading(false);
            return;
        }

        // Fetch reservation data using the token
        const fetchReservation = async () => {
            try {
                console.log(token)
                const response = await axios.get(`${API_URL}/api/reservations/`, {
                    headers: {
                        "ngrok-skip-browser-warning": "69420",
                        Authorization: `Bearer ${token}`,
                    },
                });

                setReservation(response.data);
            } catch (err) {
                setError("Failed to fetch reservation details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchReservation();
    }, [token]);

    const handleContinue = () => {
        if (reservation) {
            // Navigate to the next step, e.g., a menu selection page
            navigate("/subscription", { state: { reservationId } });
        }
    };

    if (loading) {
        return (
            <div className="welcome-page">
                <Container>
                    <Row className="justify-content-center">
                        <Spinner>Loading...</Spinner>
                    </Row>
                </Container>
            </div>
        );
    }

    if (error) {
        return (
            <div className="welcome-page">
                <Container>
                    <Row className="justify-content-center">
                        <p className="error-text">{error}</p>
                    </Row>
                </Container>
            </div>
        );
    }

    return (
        <div className="welcome-page">
            <Container>
                <Row className="justify-content-center">
                    <Col lg="8" md="10">
                        <div className="welcome-container">
                            <h2 className="welcome-title">Welcome to Excellency Midlands</h2>
                            <p className="welcome-text">
                                Congratulations on your upcoming celebration, {reservation.client_name}!
                                We are honored to be part of your special day.
                            </p>
                            <p className="welcome-text">
                                Your reservation for {reservation.number_of_people} guests at {reservation.hall} has
                                been successfully confirmed for {reservation.date}.
                            </p>
                            <p className="welcome-text">
                                As you begin to select your menu, you’ll be choosing from an array of exquisite dishes,
                                each crafted by our team of master chefs. Please take your time exploring our
                                selections. If there is anything we can assist you with, do not hesitate to reach out.
                            </p>
                            <Button onClick={handleContinue} className="submit-btn">
                                Let's start
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default WelcomePage;
