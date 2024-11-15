import React, { useState } from "react";
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import "../styles/dishes-note.css";

const DishesNote = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedItems, reservationId, selectedCuisine,
        selectedSpiceLevel,
        selectedChutneys, } = location.state || {};
    const [notes, setNotes] = useState("");

    const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNotes(e.target.value);
    };

    const handleSubmit = () => {
        // Here, you can send the notes to the backend if required
        navigate("/summary", {
            state: {
                selectedItems, notes, reservationId, selectedCuisine,
                selectedSpiceLevel,
                selectedChutneys,
            }
        });
    };

    return (
        <Helmet title="Add Notes">
            <Container>
                <Row className="justify-content-center">
                    <Col lg="8" md="10" sm="12">
                        <h3 className="notes-title mb-4 text-center">Add Additional Notes</h3>
                        <p className="text-center mb-4">
                            Please provide any additional instructions or preferences for your selected dishes.
                        </p>
                        <Form>
                            <FormGroup>
                                <Label for="notes" className="notes-label">
                                    Notes
                                </Label>
                                <Input
                                    id="notes"
                                    type="textarea"
                                    value={notes}
                                    onChange={handleNotesChange}
                                    placeholder="Enter your notes here..."
                                    rows={5}
                                    className="notes-textarea"
                                />
                            </FormGroup>
                            <div className="d-flex justify-content-end mt-4">
                                <Button color="primary" onClick={handleSubmit} disabled={!notes.trim()}>
                                    Continue to Summary
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Helmet>
    );
};

export default DishesNote;
