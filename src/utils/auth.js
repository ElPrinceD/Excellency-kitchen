export const setAuthToken = (token) => {
    localStorage.setItem("authToken", token); // Store the token in localStorage
};

export const setReservationID = (reservationID) => {
    localStorage.setItem("reservationID", reservationID); // Store the token in localStorage
};

export const setDate = (date) => {
    localStorage.setItem("loginDate", date);
}

export const getDate = () => {
    localStorage.getItem("loginDate");
}

export const getReservationID = () => {
    localStorage.getItem("reservationID"); // Store the token in localStorage
};




export const getAuthToken = () => {
    return localStorage.getItem("authToken"); // Get the token from localStorage
};

export const removeAuthToken = () => {
    localStorage.removeItem("authToken"); // Remove the token from localStorage
};

export const getReservationDetails = () => {
    const reservationDetails = localStorage.getItem("reservationDetails");
    return reservationDetails ? JSON.parse(reservationDetails) : null; // Parse JSON string back into an object
};

// Remove reservation details from localStorage
export const removeReservationDetails = () => {
    localStorage.removeItem("reservationId");
    localStorage.removeItem("reservationDetails");
};