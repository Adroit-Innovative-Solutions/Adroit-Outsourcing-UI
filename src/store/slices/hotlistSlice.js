import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { hotlistAPI } from "../../utils/api";

// Async thunk to fetch consultant by ID
export const fetchConsultantById = createAsyncThunk(
  "hotlist/fetchConsultantById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await hotlistAPI.getConsultantById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const hotlistSlice = createSlice({
  name: "hotlist",
  initialState: {
    consultant: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearConsultant: (state) => {
      state.consultant = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConsultantById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConsultantById.fulfilled, (state, action) => {
        state.loading = false;
        state.consultant = action.payload.data;
      })
      .addCase(fetchConsultantById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearConsultant } = hotlistSlice.actions;
export default hotlistSlice.reducer;
