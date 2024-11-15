// reservation.js
import axios from "axios";

import { API_URL } from "./config";
import { getAuthToken } from "../utils/auth";
const token = getAuthToken();

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
export const updateReservation = async (reservationId, reservationUpdate) => {
    const token = getAuthToken();

    try {
        const response = await axios.patch(
            `${API_URL}/api/reservations/${reservationId}/`,
            reservationUpdate,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data; // Assuming the response returns updated reservation data
    } catch (error) {
        console.error("Error during PATCH request:", error.response || error);
        throw new Error('Error updating reservation: ', error);
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


export const updateReservationStatus = async (reservationId, status, token) => {
    try {
        const response = await axios.patch(
            `${API_URL}/api/reservations/${reservationId}/`,
            { status }, // Update the `is_confirmed` field based on status
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating reservation status:", error.response?.data || error.message);
        throw new Error("Failed to update reservation status. Please try again.");
    }
};

export const getReservationById = async (id, token) => {

    try {
        const response = await axios.get(`${API_URL}/api/reservations/${id}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching reservation by ID:", error);
        throw error;
    }
};

