import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReservationById } from '../api/reservation';
import { getDishById } from '../api/dishes';
import { getAuthToken } from "../utils/auth";
import { Container, Row, Col, Card, CardBody, FormGroup, Input, Label, Button } from 'reactstrap';

const ReservationDetailsPage = () => {
    const { id } = useParams();
    const [reservation, setReservation] = useState(null);
    const [dishData, setDishData] = useState([]);
    const token = getAuthToken();

    console.log(dishData)

    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const data = await getReservationById(id, token);
                const dishDetailsPromises = data.dishes.map(dishId => getDishById(dishId, token));
                const dishDetails = await Promise.all(dishDetailsPromises);
                setDishData(dishDetails); // Set the actual dish data here
                setReservation(data);
            } catch (error) {
                console.error("Error fetching reservation:", error);
            }
        };
        fetchReservation();
    }, [id]);

    const handlePrint = () => {
        window.print();
    };

    const groupDishesByCategory = (dishes) => {
        return dishes.reduce((acc, dish) => {
            const { category, title } = dish;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(title);
            return acc;
        }, {});
    };

    const groupedDishes = groupDishesByCategory(dishData);

    if (!reservation) return <p>Loading...</p>;

    return (
        <Container className="my-5">
            <Card className="shadow-sm">
                <CardBody>
                    <h2 className="text-center mb-4">Menu Details</h2>
                    <Row className="mb-3">
                        <Col>
                            <FormGroup>
                                <Label for="clientName"><strong>Client Name:</strong></Label>
                                <Input type="text" id="clientName" value={reservation.client_name} readOnly />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="numberOfPeople"><strong>Number of People:</strong></Label>
                                <Input type="number" id="numberOfPeople" value={reservation.number_of_people} readOnly />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <FormGroup>
                                <Label for="hall"><strong>Hall:</strong></Label>
                                <Input type="text" id="hall" value={reservation.hall} readOnly />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <FormGroup>
                                <Label for="date"><strong>Date:</strong></Label>
                                <Input type="text" id="date" value={new Date(reservation.date).toLocaleDateString()} readOnly />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="time"><strong>Time:</strong></Label>
                                <Input type="text" id="time" value={reservation.time} readOnly />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <FormGroup>
                                <Label for="dishes"><strong>Dishes:</strong></Label>
                                {Object.keys(groupedDishes).map((category) => (
                                    <FormGroup key={category}>
                                        <Label for={`category-${category}`}><strong>{category}:</strong></Label>
                                        <Input
                                            type="text"
                                            id={`category-${category}`}
                                            value={groupedDishes[category].join(", ")}
                                            readOnly
                                        />
                                    </FormGroup>
                                ))}
                            </FormGroup>
                        </Col>
                    </Row>
                    {/* Print Button */}
                    <Row className="mt-4">
                        <Col className="text-center">
                            <Button color="primary" onClick={handlePrint}>Print Reservation</Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Container>
    );
};

export default ReservationDetailsPage;
