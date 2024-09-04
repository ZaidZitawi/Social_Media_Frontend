import axios from 'axios';

const API_URL = 'http://localhost:8080/v0/user'; // Adjust the URL as needed

export const findUserById = (userId) => {
  return axios.get(`${API_URL}/findById/${userId}`);
};

export const findUserByEmail = (email, token) => {
  return axios.get(`${API_URL}/findByEmail`, { 
    params: { email },
    headers: { Authorization: `Bearer ${token}` }
  });
};

