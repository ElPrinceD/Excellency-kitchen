import React, { useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import '../styles/options.css';

const cuisines = ["Pakistani", "Indian", "Arabic", "Indonesian", "Persian", "Afghani", "English"];
const spiceLevels = ["Mild", "Medium", "Hot"];
const chutneys = ["Mango", "Raita", "Yoghurt", "Mint Sauce", "Punjabi", "Chilli Sauce"];

const SelectOptions = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { reservationId, limits } = location.state || {};
    const chutneyLimit = limits ? limits['Chutneys'] : 1;

    const [selectedCuisine, setSelectedCuisine] = useState(null);
    const [selectedSpiceLevel, setSelectedSpiceLevel] = useState(null);
    const [selectedChutneys, setSelectedChutneys] = useState([]);
    const [step, setStep] = useState(1); // Step 1: Cuisine, Step 2: Spice Level, Step 3: Chutney

    const handleChutneySelect = (chutney) => {
        if (selectedChutneys.includes(chutney)) {
            // Remove chutney if already selected
            setSelectedChutneys(selectedChutneys.filter(item => item !== chutney));
        } else if (selectedChutneys.length < chutneyLimit) {
            // Add chutney if limit is not reached
            setSelectedChutneys([...selectedChutneys, chutney]);
        }
    };

    const handleContinue = () => {
        if (step === 1 && selectedCuisine) {
            setStep(2); // Move to Spice Level selection
        } else if (step === 2 && selectedSpiceLevel) {
            setStep(3); // Move to Chutney selection
        } else if (step === 3 && selectedChutneys.length <= chutneyLimit) {
            // All selections are made, navigate to the next page
            navigate("/pizzas", {
                state: {
                    limits,
                    reservationId,
                    selectedCuisine,
                    selectedSpiceLevel,
                    selectedChutneys,
                },
            });
        }
    };

    // Conditional rendering for each selection step
    const renderSelectionStep = () => {
        if (step === 1) {
            return (
                <>
                    <h4>Cuisine</h4>
                    <div className="options-container">
                        {cuisines.map((cuisine) => (
                            <Button
                                key={cuisine}
                                className={`option-btn ${selectedCuisine === cuisine ? "selected" : ""}`}
                                onClick={() => setSelectedCuisine(cuisine)}
                            >
                                {cuisine}
                            </Button>
                        ))}
                    </div>
                </>
            );
        } else if (step === 2) {
            return (
                <>
                    <h4>Spice Level</h4>
                    <div className="options-container">
                        {spiceLevels.map((level) => (
                            <Button
                                key={level}
                                className={`option-btn ${selectedSpiceLevel === level ? "selected" : ""}`}
                                onClick={() => setSelectedSpiceLevel(level)}
                            >
                                {level}
                            </Button>
                        ))}
                    </div>
                </>
            );
        } else if (step === 3) {
            return (
                <>
                    <h4>Chutney (Choose up to {chutneyLimit})</h4>
                    <div className="options-container">
                        {chutneys.map((chutney) => (
                            <Button
                                key={chutney}
                                className={`option-btn ${selectedChutneys.includes(chutney) ? "selected" : ""}`}
                                onClick={() => handleChutneySelect(chutney)}
                                disabled={selectedChutneys.length >= chutneyLimit && !selectedChutneys.includes(chutney)}
                            >
                                {chutney}
                            </Button>
                        ))}
                    </div>
                </>
            );
        }
    };

    return (
        <Helmet title="Select Your Preferences">
            <Container className="text-center">
                <h2 className="page-title text-center mb-4">Select Your Preferences</h2>

                <Row className="mb-4">
                    <Col>
                        {renderSelectionStep()}
                    </Col>
                </Row>

                <div className="d-flex justify-content-end mt-4">
                    <Button
                        onClick={handleContinue}
                        disabled={(step === 1 && !selectedCuisine) ||
                            (step === 2 && !selectedSpiceLevel) ||
                            (step === 3 && selectedChutneys.length === 0)}
                        className={`next-page-btn ${((step === 1 && selectedCuisine) ||
                            (step === 2 && selectedSpiceLevel) ||
                            (step === 3 && selectedChutneys.length > 0)) ? "enabled" : ""}`}
                    >
                        {step < 3 ? "Next Page" : "Next Page"}
                    </Button>
                </div>
            </Container>
        </Helmet>
    );
};

export default SelectOptions;
