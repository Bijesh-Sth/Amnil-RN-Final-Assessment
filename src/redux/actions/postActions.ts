import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../types';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (page: number) => {
    const response = await fetch(`https://dummyjson.com/posts?limit=10&skip=${(page - 1) * 10}`);
    const data = await response.json();
    return data.posts.map((post: Post, index: number) => ({
      ...post,
      uniqueId: `${post.id}-${index}-${Date.now()}`
    }));
  }
);
