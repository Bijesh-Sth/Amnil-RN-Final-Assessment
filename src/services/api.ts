import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  store  from '../redux/store';
import { refreshToken, logoutUser } from '../redux/actions/userActions';

const api = axios.create({
  baseURL: 'https://dummyjson.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await store.dispatch(refreshToken() as any);
        
        if (refreshResponse.meta.requestStatus === 'fulfilled') {
          const newToken = refreshResponse.payload.token;
          api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('refreshToken');
        store.dispatch(logoutUser() as any);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
