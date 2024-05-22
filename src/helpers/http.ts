import axios from 'axios';

export const http = axios.create({
  baseURL: process.env.API_URL || 'http://10.0.2.2:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});