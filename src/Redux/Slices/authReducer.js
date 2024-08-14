import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../utils/apiUtils';


export const loginHandler = createAsyncThunk('loginHandler', async ({adminName,adminPassword}) => {
  
    try {
    const response = await axios.post(`${API}/admin/login`, {
        adminName,
        adminPassword,
      });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Login failed: Unexpected server response');
      }
    
    } catch (error) {
        console.log("error in authreducer",error)
        // dispatch(loginFail(error.response?.data || 'Login failed'));
      
    }
  });

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

// Create a slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      console.log("action.payload",state.isAuthenticated)
      state.user = action.payload;
      state.error = null;
    },
    loginFail: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginHandler.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginHandler.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.error.message;
      });
  },
});

// Export actions
export const { loginSuccess, loginFail, logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;