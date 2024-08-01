import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../types';
import api from '../../services/api';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (page: number) => {
    const response = await api.get(`/posts?limit=10&skip=${(page - 1) * 10}`);
    return response.data.posts.map((post: Post, index: number) => ({
      ...post,
      uniqueId: `${post.id}-${index}-${Date.now()}`,
    }));
  }
);
