import axios from 'axios';

const API_URL = 'http://localhost:8080/v0/profile'; // Adjust the URL as needed

export const getProfileByUserId = (userId) => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  return axios.get(`${API_URL}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Include token in the Authorization header
    },
  });
};
