import { createSlice } from '@reduxjs/toolkit';

const initialState= {
    id: '',
    accessToken: '',
    expirationTime: 0,
    role: '',
    isLoggedIn: false,
  };

  export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setId: (state, action) => {
        state.id = action.payload;
      },
      setAccessToken: (state, action) => {
        state.accessToken = action.payload;
      },
      setExpirationTime: (state, action) => {
        state.expirationTime = action.payload;
      },
      setRole: (state, action) => {
        state.role = action.payload;
      },
      setIsLoggedIn: (state, action) => {
        state.isLoggedIn = action.payload;
      },
    },
  });
  
  export const {
    setId,
    setAccessToken,
    setExpirationTime,
    setRole,
    setIsLoggedIn,
    setStudentList,
    setSelectedStudentList,
    filteredUsers,
    filteredSelectedUsers,
  } = userSlice.actions;
  