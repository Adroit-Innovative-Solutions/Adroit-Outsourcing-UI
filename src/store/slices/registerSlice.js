import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userAPI } from '../../utils/api'; // adjust path as needed

// Async thunk for registration
export const registerUser = createAsyncThunk(
  'register/registerUser',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userAPI.register(payload);
      if (!response.success) {
        return rejectWithValue(response.message || 'Registration failed');
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    loading: false,
    error: null,
    success: false,
    data: null,
  },
  reducers: {
    resetRegisterState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetRegisterState } = registerSlice.actions;
export default registerSlice.reducer;
