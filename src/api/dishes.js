import axios from "axios";
import { API_URL } from "../config/api"; // Import the base URL from the config

// Get all dishes
export const getDishes = async () => {
    try {
        const response = await axios.get(`${API_URL}/dishes/`);
        return response.data; // Return the list of dishes
    } catch (error) {
        console.error("Error fetching dishes:", error);
        throw error;
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
export const getDishById = async (dishId) => {
    try {
        const response = await axios.get(`${API_URL}/dishes/${dishId}/`);
        return response.data; // Return the dish data
    } catch (error) {
        console.error(`Error fetching dish ${dishId}:`, error);
        throw error;
    }
};
