import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
// Assuming a custom CSS file for additional styling if needed

const KitchenManager = ({ onUpdateValues }) => {
    const [values, setValues] = useState({
        BonelessChicken: 70 + 90, // Initial default value
        ChickenDrum: 170,
        ChickenLeg: 20,
        Rice: 60,
        LambChops: 180,
        Fish: 100,
        MincedMeet: 85,
        LambLegs: 9 // 1 per 9 people
    });

    const units = {
        BonelessChicken: 'grams',
        ChickenDrum: 'grams',
        ChickenLeg: 'grams',
        Rice: 'grams',
        LambChops: 'grams',
        Fish: 'grams',
        MincedMeet: 'grams',
        LambLegs: 'number' // This is a count per person
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: parseFloat(value) || 0
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateValues(values);
    };

    return (
        <Container>
            <h2 className="mb-4">Update Ingredient Values</h2>
            <Form onSubmit={handleSubmit}>
                <Row>
                    {Object.keys(values).map((key) => (
                        <Col md={6} lg={4} key={key} className="mb-3">
                            <FormGroup>
                                <Label for={key}>
                                    {key.replace(/([A-Z])/g, ' $1')} ({units[key]})
                                </Label>
                                <Input
                                    type="number"
                                    name={key}
                                    id={key}
                                    value={values[key]}
                                    onChange={handleInputChange}
                                    step="0.1"
                                />
                            </FormGroup>
                        </Col>
                    ))}
                </Row>
                <Button type="submit" color="success">
                    Update Values
                </Button>
            </Form>
        </Container>
    );
};

export default KitchenManager;
