import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import { getReservationById } from "../api/reservation";
import SubscriptionCard from "../components/UI/subcription/SubscriptionCard";
import Helmet from "../components/Helmet/Helmet";
import { getAuthToken } from "../utils/auth";
import "../styles/pagination.css";
import "../styles/subscription.css";

// Define the subscription options with their respective meal limits
const subscriptionOptions = [
  {
    id: "Silver",
    title: "Silver Menu",
    image: "https://img.freepik.com/free-vector/silver-metal-background-1_78370-324.jpg?semt=ais_hybrid",
    description: "£27.50 Per Head\n1 Salad\n3 Starters\n1 Rice Dish\n3 Curries\n1 Dessert\n2 Chutneys",
    limits: { Salads: 1, Starters: 3, "Rice Dishes": 1, Curries: 3, Desserts: 1, Chutneys: 2 },
  },
  {
    id: "Gold",
    title: "Gold Menu",
    image: "https://img.freepik.com/free-photo/golden-foil-texture-background-shiny-wrapping-paper-decoration-element_211682-61.jpg?semt=ais_hybrid",
    description: "£35 Per Head\n3 Salads\n5 Starters (including lamb leg)\n2 Rice Dishes\n3 Curries\n2 Desserts\n3 Chutneys",
    limits: { Salads: 3, Starters: 5, "Rice Dishes": 2, Curries: 3, Desserts: 2, Chutneys: 3 },
  },
  {
    id: "Platinum",
    title: "Platinum Menu",
    image: "https://img.freepik.com/free-vector/silver-foil-metallic-texture-background-design_1048-15718.jpg?semt=ais_hybrid",
    description: "£45 Per Head\n5 Salads\n7 Starters\n3 Rice Dishes\n5 Curries\n3 Desserts\n4 Chutneys\nSpecial Drinks Included",
    limits: { Salads: 5, Starters: 7, "Rice Dishes": 3, Curries: 5, Desserts: 3, Chutneys: 4 },
  },
];

const Subscription = () => {
  const { state } = useLocation();
  const location = useLocation();
  const token = getAuthToken();
  const { reservationId, client_name } = location.state || {};
  console.log(client_name)
  const userName = state?.userName || "Guest"; // Get the user's name from state or default to 'Guest'
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [reservationDetails, setReservationDetails] = useState(null);
  console.log("Subscription Page", reservationDetails)
  const navigate = useNavigate();

  // Fetch reservation details using reservationId
  useEffect(() => {
    const fetchReservationDetails = async () => {
      console.log("Reserve ", reservationId)
      try {
        // Assuming fetchReservationById is a function that fetches reservation details
        const reservation = await getReservationById(reservationId, token);

        setReservationDetails(reservation);

        // If reservation has subscription info, set the selected subscription
        if (reservation && reservation.meal_subscription) {
          setSelectedSubscription(reservation.meal_subscription);
        }
      } catch (error) {
        console.error("Error fetching reservation details:", error);
      }
    };

    if (reservationId) {
      fetchReservationDetails();
    }
  }, [reservationId]);

  // Handle subscription selection
  const handleSelect = (id) => {
    setSelectedSubscription(id);
  };

  // Handle "Continue" button click
  const handleContinue = () => {
    if (selectedSubscription) {
      const selectedOption = subscriptionOptions.find((option) => option.id === selectedSubscription);

      // Pass selected subscription limits and subscription type to the next page
      if (selectedOption) {
        navigate("/options", {
          state: {
            limits: selectedOption.limits,
            subscriptionType: selectedOption.title,
            reservationId: reservationId
          }
        });
      }
    }
  };

  return (
    <Helmet title="Subscription Options">
      <Container>
        <h2 className="text-center mb-4">{client_name}, Please Select Your Preferred Meal Subscription</h2>
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
            Next Page
          </Button>
        </div>
      </Container>
    </Helmet>
  );
};

export default Subscription;
