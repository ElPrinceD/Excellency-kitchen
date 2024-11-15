import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useLocation, Link } from "react-router-dom";

const ConfirmationPage = () => {
    const location = useLocation();
    const {
        selectedItems,
        notes,
        reservationId,
        selectedCuisine,
        selectedSpiceLevel,
        selectedChutneys
    } = location.state || {};

    // Group items by category
    const groupedItems = selectedItems
        ? Object.entries(selectedItems).reduce((acc, [category, items]) => {
            acc[category] = items;
            return acc;
        }, {})
        : {};

    return (
        <Container className="mt-5">
            <h3 className="text-center mb-4">Your Menu Selection Has Been Confirmed!</h3>

            <Row className="mb-4">
                <Col>
                    <h5 className="text-success">Thank you for your selection!</h5>
                    <p>Your menu selection has been successfully updated and confirmed.</p>
                </Col>
            </Row>


        </Container>
    );
};

export default ConfirmationPage;
