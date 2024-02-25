import axios from "axios";

const API_URL = "https://dummyjson.com";

const authService = {
  // async login(credentials) {
  //   try {
  //     const response = await axios.post(`${API_URL}/login`, credentials);
  //     localStorage.setItem('token', response.data.token);
  //     return response.data;
  //   } catch (error) {
  //     throw error.response.data.error;
  //   }
  // },
  async login(credentials) {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      console.log("res:", response);
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        return data;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error) {
      throw new Error("Error during login: " + error.message);
    }
  },

  async register(user) {
    try {
      const response = await axios.post(`${API_URL}/users/add`, user);
      return response.data;
    } catch (error) {
      throw error.response.data.error;
    }
  },

  logout() {
    localStorage.removeItem("token");
  },

  isAuthenticated() {
    return localStorage.getItem("token") !== null;
  },
};

export default authService;
