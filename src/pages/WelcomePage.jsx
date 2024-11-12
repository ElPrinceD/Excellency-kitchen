import React from "react";
import { Container, Row, Col, Button } from "reactstrap"; // Import Button here
import { useNavigate } from "react-router-dom";
import "../styles/welcome-page.css";

const WelcomePage = () => {
    const navigate = useNavigate();

    const handleContinue = () => {
        // Navigate to the book event page after the welcome message
        navigate("/book-event");
    };

    return (
        <div className="welcome-page">
            <Container>
                <Row className="justify-content-center">
                    <Col lg="8" md="10">
                        <div className="welcome-container">
                            <h2 className="welcome-title">Ali Jordan, Welcome to Excellency Midlands</h2>
                            <p className="welcome-text">
                                Congratulations on your upcoming celebration. We are honored to be part of your special day.
                            </p>
                            <p className="welcome-text">
                                As you begin to select your menu, you’ll be choosing from an array of exquisite dishes, each crafted by our team of master chefs, dedicated to the art of fine dining halal cuisine. Every ingredient, every flavor, and every presentation is carefully curated to embody elegance and perfection, creating a memorable experience for you and your guests.
                            </p>
                            <p className="welcome-text">
                                Please take your time exploring our selections, knowing each choice reflects our highest standards of quality and sophistication. If there is anything we can assist you with, do not hesitate to reach out.
                            </p>
                            <p className="welcome-text">
                                We look forward to creating a dining experience that will be remembered for a lifetime.
                            </p>

                            <Button onClick={handleContinue} className="submit-btn">Let's start</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default WelcomePage;
