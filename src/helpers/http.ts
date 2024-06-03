import axios from 'axios';

export const http = axios.create({
  baseURL: "https://hotel-booking-backend-splu.onrender.com/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

export const mapApiKey = process.env.PLACE_API_KEY;