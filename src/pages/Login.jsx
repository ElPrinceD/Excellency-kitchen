import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { FaUser, FaLock } from "react-icons/fa";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    // Add any login logic here, if needed
    navigate("/book-event");
  };

  return (
    <Container fluid className="login-page">
      <Row className="h-100">
        <Col md="7" className="login-image-container">
          <img
            src="https://excellencymidlands.com/wp-content/uploads/2023/04/Excellency_0002_catering-img-6.webp"
            alt="Login"
            className="login-image"
          />
        </Col>
        <Col md="5" className="login-form-container d-flex align-items-center">
          <div className="form-wrapper w-100">
            <h3 className="login-title">Login to Excellency Catering Service</h3>
            <Form onSubmit={handleLogin}>
              <FormGroup>
                <Label for="username">Username</Label>
                <div className="input-icon">
                  <FaUser className="icon" />
                  <Input
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    className="rounded-input"
                  />
                </div>
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <div className="input-icon">
                  <FaLock className="icon" />
                  <Input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className="rounded-input"
                  />
                </div>
              </FormGroup>
              <Button type="submit" color="danger" className="login-btn">Login</Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
