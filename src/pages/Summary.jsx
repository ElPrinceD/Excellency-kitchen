import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useLocation, Link } from "react-router-dom";  // Import useLocation

const SummaryPage = () => {
  const location = useLocation();
  const { selectedItems } = location.state || {};  // Retrieve selected items from state

  // Flatten all selected items for display
  const allSelectedItems = Object.values(selectedItems).flat();

  return (
    <Container>
      <h3 className="mb-4">Your Selections</h3>
      <Row>
        {allSelectedItems.length > 0 ? (
          allSelectedItems.map((item) => (
            <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mb-4 mt-4">
              <div className="product-card">
                <img src={item.image} alt={item.name} />
                <h5>{item.name}</h5>
                <p>{item.description}</p>
              </div>
            </Col>
          ))
        ) : (
          <p>No items selected.</p>
        )}
      </Row>
      <div className="d-flex justify-content-end mt-4">
        <Link to="/pizzas">
          <button className="btn btn-primary">Go Back</button>
        </Link>
      </div>
    </Container>
  );
};

export default SummaryPage;
