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
