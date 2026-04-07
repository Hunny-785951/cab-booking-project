// src/api/index.js

const BASE_URL = "http://localhost:8080/api";

// ===== IMPROVED AUTH FETCH WITH BETTER ERROR HANDLING =====
export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Try to parse JSON response
    const data = await response.json();

    if (!response.ok) {
      // Throw error with message from backend
      throw new Error(data.message || data.error || "Request failed");
    }

    return data;
  } catch (error) {
    // If JSON parsing fails or other error
    console.error("API Error:", error);
    throw error;
  }
};

// ------------------------------
// AUTH APIs
// ------------------------------
export const loginUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }
  
  return data;
};

export const signupUser = async (name, email, password) => {
  const response = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }
  
  return data;
};

// ------------------------------
// CAB APIs
// ------------------------------

export const getAvailableCabs = async () => {
  return authFetch(`${BASE_URL}/cabs/available`);
};

// ✅ FIXED: bookCab now sends correct format
export const bookCab = async (userId, x, y) => {
  // Ensure all values are numbers
  const requestBody = {
    userId: parseInt(userId),
    x: parseInt(x),
    y: parseInt(y)
  };

  console.log("📤 Booking cab with data:", requestBody);

  return authFetch(`${BASE_URL}/cabs/book`, {
    method: "POST",
    body: JSON.stringify(requestBody),
  });
};

// Alternative: If you want to keep the old signature
export const bookCabWithObject = async (bookingData) => {
  const requestBody = {
    userId: parseInt(bookingData.userId),
    x: parseInt(bookingData.x),
    y: parseInt(bookingData.y)
  };

  console.log("📤 Booking cab with data:", requestBody);

  return authFetch(`${BASE_URL}/cabs/book`, {
    method: "POST",
    body: JSON.stringify(requestBody),
  });
};

export const getTripHistory = async (userId) => {
  return authFetch(`${BASE_URL}/cabs/trips/${userId}`);
};

export const updateCabLocation = async (cabId, x, y) => {
  return authFetch(
    `${BASE_URL}/cabs/updateLocation/${cabId}?x=${x}&y=${y}`,
    { method: "PUT" }
  );
};

// ------------------------------
// TRIPS APIs
// ------------------------------

export const getAllTrips = async () => {
  return authFetch(`${BASE_URL}/cabs/trips`);
};

export const getTrips = async () => {
  return authFetch(`${BASE_URL}/cabs/trips`);
};

// ===== ADDITIONAL HELPER FUNCTIONS =====

// Get user from localStorage
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

// Get user ID from localStorage
export const getCurrentUserId = () => {
  const user = getCurrentUser();
  return user?.userId || user?.id || null;
};

// Check if user is logged in
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
};