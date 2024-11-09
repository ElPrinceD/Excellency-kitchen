import React from "react";
import Helmet from "../components/Helmet/Helmet.js";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import guyImg from "../assets/images/Excellency_0007_catering-img-1.webp";
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
                <img src="https://excellencymidlands.com/wp-content/uploads/2023/04/Excellency_0002_catering-img-6.webp"alt="delivery-guy" className="w-100 h-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
