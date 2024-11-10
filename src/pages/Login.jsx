import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { FaUser, FaLock } from "react-icons/fa";
import { login } from "../api/auth"; // Import the login function
import { setAuthToken } from "../utils/auth"; // Utility function to save token
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // State for storing username
  const [password, setPassword] = useState(""); // State for storing password
  const [errorMessage, setErrorMessage] = useState(""); // State for handling errors
  const [isLoading, setIsLoading] = useState(false); // State for loading spinner

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Set loading to true while the request is in progress

    try {
      const data = await login(username, password); // Call the login API
      const { access } = data; // Assuming the response contains the access token

      // Save the token in localStorage or a utility function
      setAuthToken(access);

      // Redirect to another page after successful login
      navigate("/book-event");
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage(error.message); // Display the error message from API
    } finally {
      setIsLoading(false); // Stop loading once the request is complete
    }
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
            {errorMessage && <Alert color="danger">{errorMessage}</Alert>} {/* Show error message */}
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
                    value={username} // Bind email state to this input
                    onChange={(e) => setUsername(e.target.value)} // Update email on change
                    required
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
                    value={password} // Bind password state to this input
                    onChange={(e) => setPassword(e.target.value)} // Update password on change
                    required
                  />
                </div>
              </FormGroup>
              <Button type="submit" color="danger" className="login-btn" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"} {/* Show loading text */}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
