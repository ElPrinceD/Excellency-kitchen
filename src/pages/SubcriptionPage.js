import React, { useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import SubscriptionCard from "../components/UI/subcription/SubscriptionCard";
import Helmet from "../components/Helmet/Helmet";
import "../styles/pagination.css";
import "../styles/subscription.css"; 

const subscriptionOptions = [
    {
      id: "silver",
      title: "Silver Menu",
      image: "https://img.freepik.com/free-vector/silver-metal-background-1_78370-324.jpg?semt=ais_hybrid",
      description: "£27.50 Per Head\n1 Salad\n3 Starters\n1 Rice Dish\n3 Curries\n1 Dessert"
    },
    {
      id: "gold",
      title: "Gold Menu",
      image: "https://img.freepik.com/free-photo/golden-foil-texture-background-shiny-wrapping-paper-decoration-element_211682-61.jpg?semt=ais_hybrid",
      description: "£35 Per Head\n3 Salads\n5 Starters (including lamb leg)\n2 Rice Dishes\n3 Curries\n2 Desserts"
    },
    {
      id: "platinum",
      title: "Platinum Menu",
      image: "https://img.freepik.com/free-vector/silver-foil-metallic-texture-background-design_1048-15718.jpg?semt=ais_hybrid",
      description: "£45 Per Head\n5 Salads\n7 Starters\n3 Rice Dishes\n5 Curries\n3 Desserts\nSpecial Drinks Included"
    },
  ];
  

const Subscription = () => {
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const handleSelect = (id) => {
    setSelectedSubscription(id);
  };

  const handleContinue = () => {
    alert(`You selected the ${selectedSubscription} subscription.`);
  };

  return (
    <Helmet title="Subscription Options">
      <Container>
        <h2 className="text-center mb-4">Select Your Preferred Meal Subscription</h2>
        <Row>
          {subscriptionOptions.map((option) => (
            <Col
              lg="4"
              md="6"
              sm="6"
              xs="12"
              key={option.id}
              className="mb-4 mt-4"
            >
              <SubscriptionCard
                item={option}
                selectedSubscription={selectedSubscription}
                onSelect={handleSelect}
              />
            </Col>
          ))}
        </Row>
        <div className="d-flex justify-content-end mt-4">
          <Button
          
            className="continue-btn"
            onClick={handleContinue}
            disabled={!selectedSubscription} 
          >
            Continue
          </Button>
        </div>
      </Container>
    </Helmet>
  );
};

export default Subscription;
