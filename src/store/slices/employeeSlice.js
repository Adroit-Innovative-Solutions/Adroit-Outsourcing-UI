import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { employeeAPI } from "../../utils/api";

// Async thunk to fetch all employees
export const fetchEmployees = createAsyncThunk(
  "employees/fetchAll",
  async (params, { rejectWithValue }) => {
    try {
      const res = await employeeAPI.getAll(params);
      return res.data; // { content, totalElements }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to create a new employee
export const createEmployee = createAsyncThunk(
  "employees/create",
  async (employeeData, { rejectWithValue }) => {
    try {
      const res = await employeeAPI.create(employeeData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to update an employee
export const updateEmployee = createAsyncThunk(
  "employees/update",
  async ({ userId, employeeData }, { rejectWithValue }) => {
    try {
      const res = await employeeAPI.update(userId, employeeData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to delete an employee
export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (userId, { rejectWithValue }) => {
    try {
      await employeeAPI.deleteEmployee(userId);
      return userId; // Return the deleted employee's ID
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to fetch a single employee
export const fetchEmployeeById = createAsyncThunk(
  "employees/fetchOne",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await employeeAPI.getById(userId);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    data: [],
    currentEmployee: null,
    total: 0,
    loading: false,
    error: null,
    operationLoading: false,
    operationError: null,
  },
  reducers: {
    clearCurrentEmployee: (state) => {
      state.currentEmployee = null;
    },
    clearErrors: (state) => {
      state.error = null;
      state.operationError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all employees
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.content || [];
        state.total = action.payload?.totalElements || 0;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch employees";
      })

      // Fetch single employee
      .addCase(fetchEmployeeById.pending, (state) => {
        state.operationLoading = true;
        state.operationError = null;
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.currentEmployee = action.payload;
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload || "Failed to fetch employee";
      })

      // Create employee
      .addCase(createEmployee.pending, (state) => {
        state.operationLoading = true;
        state.operationError = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.data.unshift(action.payload); // Add new employee to the beginning
        state.total += 1;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload || "Failed to create employee";
      })

      // Update employee
      .addCase(updateEmployee.pending, (state) => {
        state.operationLoading = true;
        state.operationError = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.operationLoading = false;
        const index = state.data.findIndex(
          (emp) => emp.userId === action.payload.userId
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
        if (state.currentEmployee?.userId === action.payload.userId) {
          state.currentEmployee = action.payload;
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload || "Failed to update employee";
      })

      // Delete employee
      .addCase(deleteEmployee.pending, (state) => {
        state.operationLoading = true;
        state.operationError = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.data = state.data.filter((emp) => emp.userId !== action.payload);
        state.total -= 1;
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload || "Failed to delete employee";
      });
  },
});

export const { clearCurrentEmployee, clearErrors } = employeeSlice.actions;
export default employeeSlice.reducer;