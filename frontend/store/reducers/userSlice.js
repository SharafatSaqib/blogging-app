// store/reducers/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Utility function to safely interact with localStorage
const safeLocalStorage = {
  getItem: (key) => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem(key));
    }
    return null;
  },
  setItem: (key, value) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },
  removeItem: (key) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
};

const initialState = {
  user: safeLocalStorage.getItem('user'),
  likedPosts: safeLocalStorage.getItem('likedPosts') || [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { uid, displayName, email, accessToken } = action.payload.user;
      state.user = { uid, displayName, email, accessToken };
      safeLocalStorage.setItem('user', { uid, displayName, email, accessToken });
    },
    logOut: (state) => {
      state.user = null;
      state.likedPosts = [];
      safeLocalStorage.removeItem('user');
      safeLocalStorage.removeItem('likedPosts');
    },
    likePost: (state, action) => {
      // Prevent duplicate likes
      if (!state.likedPosts.includes(action.payload)) {
        state.likedPosts.push(action.payload);
        safeLocalStorage.setItem('likedPosts', state.likedPosts);
      }
    },
    unlikePost: (state, action) => {
      state.likedPosts = state.likedPosts.filter((id) => id !== action.payload);
      safeLocalStorage.setItem('likedPosts', state.likedPosts);
    },
  },
});

export const { setUser, logOut, likePost, unlikePost } = userSlice.actions;
export default userSlice.reducer;
