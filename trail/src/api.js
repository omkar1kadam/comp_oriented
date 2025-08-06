// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://comp-oriented.onrender.com/', // your Node backend port
  withCredentials: true,            // send cookies across requests
});

export default api;
