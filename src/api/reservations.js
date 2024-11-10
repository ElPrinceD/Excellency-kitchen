import axios from "axios";
import { API_URL } from "../config/api"; // Import the base URL from the config

// Get all reservations
export const getReservations = async () => {
    try {
        const response = await axios.get(`${API_URL}/reservations/`);
        return response.data; // Return the list of reservations
    } catch (error) {
        console.error("Error fetching reservations:", error);
        throw error;
    }
};

// Create a new reservation
export const createReservation = async (reservationData) => {
    try {
        const response = await axios.post(`${API_URL}/reservations/`, reservationData);
        return response.data; // Return the newly created reservation
    } catch (error) {
        console.error("Error creating reservation:", error);
        throw error;
    }
};

// Get a specific reservation by ID
export const getReservationById = async (reservationId) => {
    try {
        const response = await axios.get(`${API_URL}/reservations/${reservationId}/`);
        return response.data; // Return the reservation data
    } catch (error) {
        console.error(`Error fetching reservation ${reservationId}:`, error);
        throw error;
    }
};
