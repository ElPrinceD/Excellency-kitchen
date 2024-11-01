// src/pages/Chefs.js
import React from "react";
import { Container, Row, Col } from "reactstrap";
import chefs from "../assets/fake-data/chefs";
import Helmet from "../components/Helmet/Helmet";
import "../styles/chefs.css"; // Create a CSS file for styling if needed

const Chefs = () => {
  return (
    <Helmet title="Our Chefs">
      <Container>
        <h2 className="text-center mb-4">Meet Our Chefs</h2>
        <Row>
          {chefs.map((chef) => (
            <Col lg="4" md="6" sm="6" xs="12" key={chef.id} className="mb-4">
              <div className="chef__item text-center">
                <img className="chef__img" src={chef.image} alt={chef.name} />
                <h5>{chef.name}</h5>
                <p>{chef.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Helmet>
  );
};

export default Chefs;
