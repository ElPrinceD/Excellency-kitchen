import axios from "axios";
import { API_URL } from "./config"; // Import the base URL from the config

// Login function
export const login = async (username, password) => {
    try {

        const response = await axios.post(`${API_URL}/login/`, { username, password });
        return response.data; // Return the authentication token or user data
    } catch (error) {
        console.error("Error logging in:", error);
        throw error; // Throw error to be handled in the calling component
    }
};


export const clientLogin = async (username, password) => {
    try {
        // Send login request to the backend
        const response = await axios.post(`${API_URL}/client-login/`, { username, password });

        // Check if login is successful
        if (response.data.access_token) {
            // Save the authentication token in localStorage or wherever you prefer
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh_token);

            // Save the reservation details in localStorage as well, or use a state management tool like Redux
            const reservation = response.data.reservation;
            localStorage.setItem('reservation', JSON.stringify(reservation));

            // Return the token and reservation data
            return {
                access_token: response.data.access_token,
                refresh_token: response.data.refresh_token,
                reservation: reservation
            };
        } else {
            throw new Error('Login failed, no access token received.');
        }

    } catch (error) {
        console.error("Error logging in:", error);
        throw error; // Throw error to be handled in the calling component
    }
};