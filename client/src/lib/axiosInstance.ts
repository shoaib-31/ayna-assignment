import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:1337", // Replace with your Strapi server URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to attach the JWT token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the JWT token from localStorage
    const token = localStorage.getItem("jwt");

    // If a token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add an interceptor to handle unauthorized responses
axiosInstance.interceptors.response.use(
  (response) => {
    // If the response is successful, return it
    return response;
  },
  (error) => {
    // Handle unauthorized errors (status code 401)
    if (error.response?.status === 401) {
      console.error("Unauthorized access detected. Clearing local storage.");

      // Clear JWT token and other stored user data
      localStorage.removeItem("jwt");

      // Redirect the user to the login page
      window.location.href = "/login";
    }

    // Reject the error so it can be handled elsewhere
    return Promise.reject(error);
  }
);

export default axiosInstance;
