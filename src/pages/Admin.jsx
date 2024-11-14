import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Input, Button } from "reactstrap";
import { getReservations, updateReservationStatus } from "../api/reservation";
import { getDishById } from "../api/dishes";
import { getAuthToken } from "../utils/auth";
import { Link } from 'react-router-dom';
import "../styles/admin.css";

const AdminPage = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [dishNames, setDishNames] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const token = getAuthToken();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getReservations(token);
        setReservations(data);
        setFilteredReservations(data); // Initially show all reservations

        // Fetch dish details for all reservations
        const dishIds = [...new Set(data.flatMap(res => res.dishes))];
        const dishNameMap = {};

        for (const id of dishIds) {
          try {
            const dish = await getDishById(id, token);
            dishNameMap[id] = dish.name;
          } catch (error) {
            console.error(`Error fetching dish with ID ${id}:`, error);
          }
        }
        setDishNames(dishNameMap);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchReservations();
  }, [token]);

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

  const handleStatusChange = async (reservationId, newStatus) => {
    try {
      await updateReservationStatus(reservationId, newStatus, token);
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.id === reservationId ? { ...reservation, status: newStatus } : reservation
        )
      );
      setFilteredReservations((prevFiltered) =>
        prevFiltered.map((reservation) =>
          reservation.id === reservationId ? { ...reservation, status: newStatus } : reservation
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error.message);
    }
  };

  const getRowClass = (hall) => {
    switch (hall) {
      case "Bellisima":
        return "bellisima-row";
      case "Versaille":
        return "versailles-row";
      case "Balmayna":
        return "balmayna-row";
      case "Jomaireh":
        return "jomaireh-row";
      case "Palm Suite":
        return "palm-suite-row";
      case "Lotus":
        return "lotus-row";
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
                <th>Client Name</th>
                <th>Date</th>
                <th>Contact Number</th>
                <th>Number</th>
                <th>Venue</th>
                <th>Package</th>
                <th>Time</th>
                <th>Pending Menu Date</th>
                {/* <th>Confirmed Menu Date</th> */}
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((reservation) => (
                <tr key={reservation.id} className={getRowClass(reservation.hall)}>
                  <td>
                    <Link to={`/reservations/${reservation.id}`} className="client-name-link">
                      {reservation.client_name}
                    </Link>
                  </td>
                  <td>{new Date(reservation.date).toLocaleDateString()}</td>
                  <td>{reservation.contact_number}</td>
                  <td>{reservation.number_of_people}</td>
                  <td><h5 className={getRowClass(reservation.hall)}>{reservation.hall}</h5></td>
                  <td>{reservation.meal_subscription}</td>
                  <td>{reservation.time}</td>
                  <td>{new Date(reservation.created_at).toLocaleDateString()}</td>
                  {/* <td>
                    {reservation.dishes.length > 0 ? (
                      <ul>
                        {reservation.dishes.map((dishId, index) => (
                          <li key={index}>{dishNames[dishId] || `Loading dish ${dishId}...`}</li>
                        ))}
                      </ul>
                    ) : (
                      "Not selected yet"
                    )}
                  </td> */}
                  <td>
                    <Input
                      type="select"
                      value={reservation.status}
                      onChange={(e) => handleStatusChange(reservation.id, e.target.value)}
                      className="rounded-lg shadow-sm"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="CONFIRMED">Confirmed</option>
                    </Input>
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
