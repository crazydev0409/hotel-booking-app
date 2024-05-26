import axios from 'axios';

export const http = axios.create({
  baseURL: process.env.API_URL || 'http://192.168.8.183:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});