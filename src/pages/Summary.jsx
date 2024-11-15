import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import SelectableProductCard from "../components/UI/product-card/SelectableProductCard";
import { updateReservation } from "../api/reservation"; // Import the updateReservation function

const SummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // For navigation after confirmation

  const {
    selectedItems,
    notes,
    reservationId,
    selectedCuisine,
    selectedSpiceLevel,
    selectedChutneys,
  } = location.state || {};

  // Group items by category
  const groupedItems = selectedItems
    ? Object.entries(selectedItems).reduce((acc, [category, items]) => {
      acc[category] = items;
      return acc;
    }, {})
    : {};

  // Flatten the selected dishes into an array of dish IDs
  const getDishIds = () => {
    return Object.values(selectedItems).flat().map(item => item.id);
  };

  const handleConfirm = async () => {
    const reservationUpdate = {
      dishes: getDishIds(),  // Use dish IDs only
      additional_notes: notes,
      reservationId,
      cuisine: selectedCuisine,
      spice_level: selectedSpiceLevel,
      chutneys: Array.isArray(selectedChutneys) ? selectedChutneys : [selectedChutneys]  // Ensure chutneys is an array of strings
    };

    console.log(reservationUpdate); // Check the data structure

    try {
      const updatedReservation = await updateReservation(reservationId, reservationUpdate);
      console.log('Reservation updated successfully:', updatedReservation);
      navigate('/confirmation'); // Navigate to a confirmation page (you can customize this)
    } catch (error) {
      console.error('Error updating reservation:', error);
      alert('There was an error updating your reservation.');
    }
  };

  return (
    <Container>
      <h3 className="mb-4 text-center">Food Reservation Summary</h3>

      <Row className="mb-4">
        <Col>
          <h5>Selected Cuisine:</h5>
          <p>{selectedCuisine || "N/A"}</p>
        </Col>
        <Col>
          <h5>Spice Level:</h5>
          <p>{selectedSpiceLevel || "N/A"}</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h5>Selected Chutneys:</h5>
          <p>
            {selectedChutneys && selectedChutneys.length > 0
              ? selectedChutneys.join(", ")
              : "None"}
          </p>
        </Col>
        <Col>
          <h5>Additional Notes:</h5>
          <p>{notes || "No notes provided."}</p>
        </Col>
      </Row>

      <h4 className="mb-3">Your Selected Dishes</h4>
      {Object.keys(groupedItems).length > 0 ? (
        Object.entries(groupedItems).map(([category, items]) => (
          <div key={category}>
            <h5 className="mt-4">{category}</h5>
            <Row>
              {items.map((item) => (
                <Col
                  lg="3"
                  md="4"
                  sm="6"
                  xs="6"
                  key={item.id}
                  className="mb-4 mt-4"
                >
                  <SelectableProductCard item={item} />
                </Col>
              ))}
            </Row>
          </div>
        ))
      ) : (
        <Row>
          <Col>
            <p>No dishes selected.</p>
          </Col>
        </Row>
      )}

      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-primary" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </Container>
  );
};

export default SummaryPage;
