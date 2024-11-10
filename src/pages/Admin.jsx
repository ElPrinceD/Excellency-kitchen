import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Input } from "reactstrap";

const AdminPage = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    // Fetch reservations from API or use static data
    const fetchReservations = async () => {
      const data = [
        {
          reservationId: 1,
          customerName: "John Doe",
          hall: "Grand Hall",
          mealSelections: [
            { mealName: "Salad", quantity: 2 },
            { mealName: "Starter", quantity: 1 },
            { mealName: "Dessert", quantity: 1 }
          ],
          reservationDate: "2024-11-06T12:30:00"
        },
        {
          reservationId: 2,
          customerName: "Jane Smith",
          hall: "Bellisima",
          mealSelections: [
            { mealName: "Curries", quantity: 2 }
          ],
          reservationDate: "2024-11-06T13:00:00"
        },
        {
          reservationId: 3,
          customerName: "Jim Brown",
          hall: "Balmayna",
          mealSelections: [
            { mealName: "Rice Dishes", quantity: 2 }
          ],
          reservationDate: "2024-12-07T11:00:00"
        }
      ];
      setReservations(data);
      setFilteredReservations(data); // Initially show all reservations
    };

    fetchReservations();
  }, []);

  // Handle filtering reservations based on date and search query
  useEffect(() => {
    if (searchQuery || selectedDate) {
      const filtered = reservations.filter((reservation) => {
        const reservationDate = new Date(reservation.reservationDate).toISOString().split('T')[0];
        const matchesDate = selectedDate ? reservationDate === selectedDate : true;
        const matchesSearch = searchQuery
          ? reservation.customerName.toLowerCase().includes(searchQuery.toLowerCase())
          : true;
        return matchesDate && matchesSearch;
      });
      setFilteredReservations(filtered);
    } else {
      setFilteredReservations(reservations);
    }
  }, [searchQuery, selectedDate, reservations]);

  return (
    <Container>
      <h2 className="mb-4">Reservations</h2>

      {/* Search and Date Filter Section */}
      <Row className="mb-4">
        <Col md={4}>
          <Input
            type="text"
            placeholder="Search by Customer Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-lg shadow-sm"
          />
        </Col>
        <Col md={4}>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-lg shadow-sm"
          />
        </Col>
        <Col md={2}>
          <Button
            onClick={() => {
              setFilteredReservations(reservations); // Optional reset on button click
            }}
            className="btn-dark rounded-lg shadow-sm"
          >
            Filter by Date
          </Button>
        </Col>
      </Row>

      {/* Reservations Table */}
      <Row>
        <Col>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>Reservation ID</th>
                <th>Customer Name</th>
                <th>Hall</th>
                <th>Meal Selections</th>
                <th>Reservation Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((reservation) => (
                <tr key={reservation.reservationId}>
                  <td>{reservation.reservationId}</td>
                  <td>{reservation.customerName}</td>
                  <td>{reservation.hall}</td>
                  <td>
                    <ul>
                      {reservation.mealSelections.map((meal, index) => (
                        <li key={index}>
                          {meal.mealName} (x{meal.quantity})
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{new Date(reservation.reservationDate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;
