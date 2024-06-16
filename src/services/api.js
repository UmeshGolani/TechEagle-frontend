// src/services/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'https://techeagle-backend-h8mx.onrender.com/api' });

API.interceptors.request.use(req => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const signUp = (userData) => API.post('/auth/signup', userData);
export const signIn = (userData) => API.post('/auth/login', userData);

export const fetchActivities = () => API.get('/activities');
export const createActivity = (activity) => API.post('/activities', activity);
export const updateActivity = (id, activity) => API.put(`/activities/${id}`, activity);
export const deleteActivity = (id) => API.delete(`/activities/${id}`);
