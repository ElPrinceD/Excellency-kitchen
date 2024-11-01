import React from "react";
import Helmet from "../components/Helmet/Helmet.js";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

// Import your video file
import deliveryVideo from "../assets/videos/Excellency.mp4"; // Make sure to adjust the path based on your project structure
import "../styles/hero-section.css";

const Home = () => {
  return (
    <Helmet title="Home">
      <section className="hero-section">
        <Container fluid>
          <Row className="h-100">
            <Col lg="3" md="3" className="hero__content-container">
              <div className="hero__content">
                <h5 className="mb-3">Your best destination for Events</h5>
                <h1 className="mb-4 hero__title">
                  <span>Choose</span> your Meal Order
                </h1>

                <button className="order__btn d-flex align-items-center justify-content-between">
                  <Link to="/book-event">
                    Choose <i className="ri-arrow-right-s-line"></i>
                  </Link>
                </button>
              </div>
            </Col>

            <Col lg="9" md="9" className="hero__img-container">
              <div className="hero__img">
                <video 
                  src={deliveryVideo} 
                  autoPlay 
                  loop 
                  muted 
                  className="w-100 h-100 hero__video"
                  alt="delivery-video"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
