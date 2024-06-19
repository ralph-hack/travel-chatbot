import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const TRAVEL_API_KEY = process.env.TRAVEL_API_KEY;
const TRAVEL_API_ENDPOINT = process.env.TRAVEL_API_ENDPOINT;

export async function getTravelData(query) {
  try {
    const response = await axios.get(TRAVEL_API_ENDPOINT, {
      params: { query, apiKey: TRAVEL_API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching travel data:", error);
    return null;
  }
}
