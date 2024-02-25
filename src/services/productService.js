// productService.js
import axios from "axios";

const API_URL = "https://dummyjson.com";

const productService = {
  async getAllProducts(limit, offset) {
    try {
      const response = await axios.get(
        `${API_URL}/products?_limit=${limit}&_start=${offset}`
      );
      return response.data;
    } catch (error) {
      throw error.response.data.error;
    }
  },

  async searchProducts(query) {
    try {
      const response = await axios.get(`${API_URL}/products/search?q=${query}`);
      return response.data;
    } catch (error) {
      throw error.response.data.error;
    }
  },

  async getProductById(id) {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data.error;
    }
  },
};

export default productService;
