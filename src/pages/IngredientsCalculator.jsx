import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import KitchenManager from './KitchenManager'; // Import the manager component

const IngredientCalculator = () => {
    const [numPeople, setNumPeople] = useState(0);
    const [ingredientValues, setIngredientValues] = useState({
        bonelessChicken: 70 + 90,
        chickenDrum: 170,
        chickenLeg: 20,
        rice: 60,
        lambChops: 180,
        fish: 100,
        lambLegs: 9
    });

    const [totals, setTotals] = useState({
        bonelessChicken: 0,
        chickenDrum: 0,
        chickenLeg: 0,
        rice: 0,
        lambChops: 0,
        fish: 0,
        lambLegs: 0
    });

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value) || 0;
        setNumPeople(value);
    };

    const calculateIngredients = () => {
        const totalBonelessChicken = numPeople * ingredientValues.bonelessChicken;
        const totalChickenDrum = numPeople * ingredientValues.chickenDrum;
        const totalChickenLeg = numPeople * ingredientValues.chickenLeg;
        const totalRice = numPeople * ingredientValues.rice;
        const totalLambChops = numPeople * ingredientValues.lambChops;
        const totalFish = numPeople * ingredientValues.fish;
        const totalLambLegs = Math.ceil(numPeople / ingredientValues.lambLegs);

        setTotals({
            bonelessChicken: totalBonelessChicken / 1000,
            chickenDrum: totalChickenDrum / 1000,
            chickenLeg: totalChickenLeg / 1000,
            rice: totalRice / 1000,
            lambChops: totalLambChops / 1000,
            fish: totalFish / 1000,
            lambLegs: totalLambLegs
        });
    };

    const updateValues = (newValues) => {
        setIngredientValues(newValues);
    };

    return (
        <Container>
            <h2>Ingredient Quantity Calculator</h2>
            <Form>
                <FormGroup>
                    <Label for="numPeople">Number of People</Label>
                    <Input
                        type="number"
                        name="numPeople"
                        id="numPeople"
                        placeholder="Enter the total number of people"
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <Button color="primary" onClick={calculateIngredients}>
                    Calculate
                </Button>
            </Form>
            <Row className="mt-4">
                <Col>
                    <h4>Calculated Totals</h4>
                    <p>Boneless Chicken: {totals.bonelessChicken.toFixed(2)} kg</p>
                    <p>Chicken Drum: {totals.chickenDrum.toFixed(2)} kg</p>
                    <p>Chicken Leg: {totals.chickenLeg.toFixed(2)} kg</p>
                    <p>Rice: {totals.rice.toFixed(2)} kg</p>
                    <p>Lamb Chops: {totals.lambChops.toFixed(2)} kg</p>
                    <p>Fish: {totals.fish.toFixed(2)} kg</p>
                    <p>Lamb Legs: {totals.lambLegs}</p>
                </Col>
            </Row>

            {/* Display the KitchenManager for updating values */}
            <KitchenManager onUpdateValues={updateValues} />
        </Container>
    );
};

export default IngredientCalculator;
