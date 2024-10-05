
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8063/api/property';

export const getProperties = async (params) => {
  const response = await axios.get(API_BASE_URL, { params });
  return response.data;
};

export const getPropertyById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const getDistinctLocations = async () => {
  const response = await axios.get(`${API_BASE_URL}/distinct-locations`);
  return response.data;
};

export const getDistinctPropertyNames = async () => {
  const response = await axios.get(`${API_BASE_URL}/distinct-names`);
  return response.data;
};

export const getMinPrice = async () => {
  const response = await axios.get(`${API_BASE_URL}/min-price`);
  return response.data;
};

export const getMaxPrice = async () => {
  const response = await axios.get(`${API_BASE_URL}/max-price`);
  return response.data;
};
