import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Input } from "reactstrap";
import { getReservations } from "../api/reservation";
import { getAuthToken } from "../utils/auth";
import '../styles/admin.css';

const AdminPage = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const token = getAuthToken();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getReservations(token);
        setReservations(data);
        setFilteredReservations(data); // Initially show all reservations
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchReservations();
  }, []);

  useEffect(() => {
    if (searchQuery || selectedDate) {
      const filtered = reservations.filter((reservation) => {
        const reservationDate = reservation.date;
        const matchesDate = selectedDate ? reservationDate === selectedDate : true;
        const matchesSearch = searchQuery
          ? reservation.client_name.toLowerCase().includes(searchQuery.toLowerCase())
          : true;
        return matchesDate && matchesSearch;
      });
      setFilteredReservations(filtered);
    } else {
      setFilteredReservations(reservations);
    }
  }, [searchQuery, selectedDate, reservations]);

  const getRowColor = (hall) => {
    switch (hall) {
      case "Bellisima":
        return "success";
      case "Balmayna":
        return "danger";
      default:
        return "";
    }
  };

  return (
    <Container>
      <h2 className="mb-4">Reservations</h2>

      <Row className="mb-4">
        <Col md={4}>
          <Input
            type="text"
            placeholder="Search by Client Name"
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
      </Row>

      <Row>
        <Col>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Client Name</th>
                <th>Date</th>
                <th>Contact Number</th>

                <th>Address</th>
                <th>Number</th>
                <th>Venue</th>
                <th>Package</th>
                <th>Time</th>

                <th>Pending Menu Date</th>
                <th>Confirmed Menu Date</th>

              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((reservation) => (
                <tr key={reservation.id} className={getRowColor(reservation.hall)}>
                  <td>{reservation.id}</td>
                  <td>{reservation.client_name}</td>
                  <td>{new Date(reservation.date).toLocaleDateString()}</td>
                  <td>{reservation.contact_number}</td>

                  <td>{reservation.address}</td>
                  <td>{reservation.number_of_people}</td>
                  <td>{reservation.hall}</td>
                  <td>{reservation.meal_subscription}</td>
                  <td>{reservation.time}</td>

                  <td>
                    {reservation.dishes.length > 0 ? (
                      <ul>
                        {reservation.dishes.map((dish, index) => (
                          <li key={index}>{dish}</li>
                        ))}
                      </ul>
                    ) : (
                      "Not selected yet"
                    )}
                  </td>
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
