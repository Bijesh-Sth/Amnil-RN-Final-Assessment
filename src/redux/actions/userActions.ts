import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
import { clearUser } from '../reducers/userReducer';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('auth/login', { username, password });
      const { token, refreshToken, ...userData } = response.data;
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      return { ...userData, token, refreshToken };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    console.log('fetchUser');
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');
      const response = await api.get('auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const refreshToken = createAsyncThunk(
  'user/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (!refreshToken) throw new Error('No refresh token found');
      const response = await api.post('auth/refresh', { refreshToken });
      const { token, refreshToken: newRefreshToken } = response.data;
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('refreshToken', newRefreshToken);
      return { token, refreshToken: newRefreshToken };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { dispatch }) => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('refreshToken');
    dispatch(clearUser());
  }
);
