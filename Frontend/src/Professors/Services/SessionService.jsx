import axios from "axios";
export const getSessions = async (id) => {
  try {
    const res = await axios.get(`http://localhost:8000/api/session/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching sessions:", error);
    throw error; 
  }
};
