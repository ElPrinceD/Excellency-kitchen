import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Input } from "reactstrap";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    // Fetch reservations from API or use static data
    const fetchReservations = async () => {
      const data = [
        {
          reservationId: 1,
          customerName: "John Doe",
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
          mealSelections: [
            { mealName: "Curries", quantity: 2 }
          ],
          reservationDate: "2024-11-06T13:00:00"
        },
        {
          reservationId: 3,
          customerName: "Jim Brown",
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

  // Get the month name from the reservation date
  const getMonthName = (date) => {
    const month = new Date(date).getMonth();
    const months = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    return months[month];
  };

  // Handle filtering reservations based on selected month
  const handleMonthFilter = () => {
    if (selectedMonth) {
      const filtered = reservations.filter((reservation) => {
        const reservationMonth = getMonthName(reservation.reservationDate);
        return reservationMonth === selectedMonth;
      });
      setFilteredReservations(filtered);
    } else {
      setFilteredReservations(reservations); // Reset to show all
    }
  };

  return (
    <Container>
      <h2 className="mb-4">Reservations</h2>

      {/* Month Filter Section */}
      <Row className="mb-4">
        <Col>
          <Input
            type="select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="rounded-lg shadow-sm"
          >
            <option value="">Select a Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </Input>
          <Button
            onClick={handleMonthFilter}
            className="mt-2 btn-dark rounded-lg shadow-sm"
          >
            Filter
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
                <th>Meal Selections</th>
                <th>Reservation Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((reservation) => (
                <tr key={reservation.reservationId}>
                  <td>{reservation.reservationId}</td>
                  <td>{reservation.customerName}</td>
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
