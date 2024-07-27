import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const searchProducts = createAsyncThunk(
  'search/searchProducts',
  async (query: string) => {
    const response = await api.get('/products/search', {
      params: { q: query }
    });
    return response.data.products;
  }
);
