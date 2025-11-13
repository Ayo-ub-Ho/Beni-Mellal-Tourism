import axios from "axios";

const api = axios.create({
  baseURL: "https://69086a582d902d0651b03223.mockapi.io/api/v1",
  timeout: 5000,
});

export const getProdacte = async () => {
  try {
    const response = await api.get("/places");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const addProdacte = async (data: {
  name: string;
  description?: string;
  image?: string;
  images?: string[];
}) => {
  try {
    const response = await api.post("/places", data);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};
