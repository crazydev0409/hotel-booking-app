import axios from "axios";

export const getPlacesByQuery = async (query: string, apiKey: string) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
        query
      )}&key=${apiKey}`
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};