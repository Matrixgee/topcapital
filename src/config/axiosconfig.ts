import Axios from "axios";

const axios = Axios.create({
  baseURL: `${import.meta.env.VITE_DEVE_URL}`,
});

// Adding a response interceptor
axios.interceptors.response.use(
  (response) => {
    // Handle successful responses
    console.log("Response:", response);
    return response; // Always return the response or its modified version
  },
  (error) => {
    // Handle errors
    console.error("Error:", error);
    return Promise.reject(error); // Reject the promise with the error
  }
);

export default axios;
