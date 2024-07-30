import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types';
import { fetchPosts } from '../actions/postActions';

interface PostState {
  loading: boolean;
  posts: Post[];
  error: string | null;
  page: number;
}

const initialState: PostState = {
  loading: false,
  posts: [],
  error: null,
  page: 1,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    editPost: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    removeAllPosts: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        if (state.page === 1) {
          state.posts = action.payload;
        } else {
          state.posts = [...state.posts, ...action.payload];
        }
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      });
  },
});

export const { addPost, editPost, deletePost, setPage, removeAllPosts } = postSlice.actions;
export default postSlice.reducer;
