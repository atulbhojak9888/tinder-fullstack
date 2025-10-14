import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE = 'http://10.0.2.2:8000/api/v1'; // use emulator localhost mapping or set your LAN IP

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchPeople = async ({ page = 1, per_page = 10 } = {}) => {
  const { data } = await api.get('/people', { params: { page, per_page } });
  return data;
};

export const likePerson = async (personId) => {
  const { data } = await api.post(`/people/${personId}/like`);
  return data;
};

export const dislikePerson = async (personId) => {
  const { data } = await api.post(`/people/${personId}/dislike`);
  return data;
};

export const fetchLikedPeople = async ({ per_page=20 } = {}) => {
  const { data } = await api.get('/likes/people', { params: { per_page }});
  return data;
};

export const register = async (payload) => {
  const { data } = await api.post('/register', payload);
  return data;
};

export const login = async (payload) => {
  const { data } = await api.post('/login', payload);
  if (data.token) await AsyncStorage.setItem('token', data.token);
  return data;
};

export const logout = async () => {
  await api.post('/logout');
  await AsyncStorage.removeItem('token');
};
