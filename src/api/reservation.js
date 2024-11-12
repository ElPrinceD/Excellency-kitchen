// reservation.js
import axios from "axios";

import { API_URL } from "./config";

export const makeReservation = async (reservationData, token) => {
    try {
        const response = await axios.post(`${API_URL}/api/reservations/`, reservationData, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the JWT token in the header
                "Content-Type": "application/json",
            },
        });
        console.log(response.data)
        return response.data; // Return the response data
    } catch (error) {
        console.error("Error making reservation:", error.response?.data || error.message);
        throw new Error("Reservation failed. Please try again.");
    }
};


export const getReservations = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/api/reservations/`, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the JWT token in the header
            },
        });

        console.log(response.data)
        return response.data; // Return the response data
    } catch (error) {
        console.error("Error fetching reservations:", error.response?.data || error.message);
        throw new Error("Failed to fetch reservations. Please try again.");
    }
};
