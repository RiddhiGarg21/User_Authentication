import axios from "axios";

// Backend Base URL
const API = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true // Required for refresh token cookies
});

// ==========================
// Register User
// ==========================
export const registerUser = async (userData) => {
  const response = await API.post("/register", userData);
  return response.data;
};

// ==========================
// Verify Email OTP
// ==========================
export const verifyOTP = async (email, otp) => {
  const response = await API.post("/verify-email", {
    email,
    otp,
  });

  return response.data;
};

// ==========================
// Login User
// ==========================
export const loginUser = async (credentials) => {
  const response = await API.post("/login", credentials);
  return response.data;
};

// ==========================
// Get Logged In User
// ==========================
export const getProfile = async (token) => {
  const response = await API.get("/get-me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ==========================
// Refresh Access Token
// ==========================
export const refreshToken = async () => {
  const response = await API.get("/refresh-token");
  return response.data;
};

// ==========================
// Logout Current Device
// ==========================
export const logout = async () => {
  const response = await API.get("/logout");
  return response.data;
};

// ==========================
// Logout All Devices
// ==========================
export const logoutAll = async () => {
  const response = await API.get("/logout-all");
  return response.data;
};

export default API;