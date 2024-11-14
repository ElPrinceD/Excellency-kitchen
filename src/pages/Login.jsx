import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { FaUser, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import visibility icons
import { login, clientLogin } from "../api/auth"; // Import the login function
import { setAuthToken, setReservationID, getReservationID } from "../utils/auth"; // Utility function to save token
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // State for storing username
  const [password, setPassword] = useState(""); // State for storing password
  const [errorMessage, setErrorMessage] = useState(""); // State for handling errors
  const [isLoading, setIsLoading] = useState(false); // State for loading spinner
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const data = await clientLogin(username, password); // Call the login API
      console.log(data)
      const { access_token, reservation } = data; // Assuming the response contains the access token

      setAuthToken(access_token); // Save the token

      setReservationID(reservation[0].reservation_id)
      console.log('Reservation 1: ', reservation[0].reservation_id)
      const reservationId = reservation[0].reservation_id

      navigate("/subscription", { state: { reservationId } }); // Redirect after login
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response && error.response.status === 401) {
        setErrorMessage("Username or password is wrong");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
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
            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <div className="input-icon password-toggle-container">
                  <FaLock className="icon" />
                  <Input
                    type={showPassword ? "text" : "password"} // Toggle input type
                    id="password"
                    placeholder="Enter your password"
                    className="rounded-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </Button>
                </div>
              </FormGroup>
              <Button type="submit" color="danger" className="login-btn" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
