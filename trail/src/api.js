// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:2402', // your Node backend port
  withCredentials: true,            // send cookies across requests
});

export default api;
