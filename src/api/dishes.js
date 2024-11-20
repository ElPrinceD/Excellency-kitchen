import axios from "axios";
import { API_URL } from "./config";
import { getAuthToken } from "../utils/auth";

// Get all dishes
export const getDishes = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/api/dishes/`, {
            headers: {
                "ngrok-skip-browser-warning": "69420",
                Authorization: `Bearer ${token}`, // Include the JWT token in the header
            },
        });

        console.log(response.data)
        return response.data; // Return the response data
    } catch (error) {
        console.error("Error fetching dishes:", error.response?.data || error.message);
        throw new Error("Failed to fetch dishes. Please try again.");
    }
};

// Create a new dish
export const createDish = async (dishData) => {
    try {
        const response = await axios.post(`${API_URL}/dishes/`, dishData);
        return response.data; // Return the newly created dish
    } catch (error) {
        console.error("Error creating dish:", error);
        throw error;
    }
};

// Get a specific dish by ID
export const getDishById = async (id, token) => {

    try {
        const response = await axios.get(`${API_URL}/api/dishes/${id}/`, {
            headers: {
                "ngrok-skip-browser-warning": "69420",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching dish by ID:", error);
        throw error;
    }
};

export const getIngredientById = async (id, token) => {

    try {
        const response = await axios.get(`${API_URL}/api/ingredients/${id}/`, {
            headers: {
                "ngrok-skip-browser-warning": "69420",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching ingredient by ID:", error);
        throw error;
    }
};

export const updateReservationDishes = async (reservationId, dishesUpdate) => {
    const token = getAuthToken();

    try {
        const response = await axios.patch(
            `${API_URL}/api/reservations/${reservationId}/`,
            dishesUpdate,
            {
                headers: {
                    "ngrok-skip-browser-warning": "69420",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data; // Assuming the response returns updated reservation data
    } catch (error) {
        throw new Error('Error updating reservation dishes');
    }
};


//Set the first things to show all the elements