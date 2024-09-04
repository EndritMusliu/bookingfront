import axios from 'axios';

// Define the base URL for the API
const API_URL = 'http://127.0.0.1:8000/api/';  // Update this to your actual API URL

// Create an axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to automatically include the token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');  // Fetch the token from localStorage
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
