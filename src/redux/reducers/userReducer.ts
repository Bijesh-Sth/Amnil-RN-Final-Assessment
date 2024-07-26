import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser, logoutUser, fetchUser } from '../actions/userActions';

interface UserState {
  id: number | null;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  id: null,
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  gender: '',
  image: '',
  token: '',
  refreshToken: '',
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.id = null;
      state.username = '';
      state.email = '';
      state.firstName = '';
      state.lastName = '';
      state.gender = '';
      state.image = '';
      state.token = '';
      state.refreshToken = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.id = action.payload.id;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.gender = action.payload.gender;
        state.image = action.payload.image;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.id = action.payload.id;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.gender = action.payload.gender;
        state.image = action.payload.image;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.id = null;
        state.username = '';
        state.email = '';
        state.firstName = '';
        state.lastName = '';
        state.gender = '';
        state.image = '';
        state.token = '';
        state.refreshToken = '';
        state.status = 'idle';
        state.error = null;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
