// Fixed authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../../utils/api";

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  loginStatus: "idle", // 'idle' | 'pending' | 'succeeded' | 'failed'
  logoutStatus: "idle",
  authChecked: false,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await userAPI.login(credentials);
      const user = response.data;

      if (user) {
        localStorage.setItem("userData", JSON.stringify(user));
        return { user };
      }

      return rejectWithValue("Invalid user data");
    } catch (error) {
      console.error("Login error:", error);
      return rejectWithValue(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  }
);

// Fixed logout async thunk
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (userId, { rejectWithValue }) => {
    try {
      // Always clear localStorage first to ensure user is logged out locally
      localStorage.removeItem("userData");

      // If userId is provided, try to logout from server
      if (userId) {
        await userAPI.logout(userId);
      }

      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      // Even if server logout fails, we still want to clear local storage
      localStorage.removeItem("userData");
      // Don't reject here - local logout should always succeed
      return { success: true };
    }
  }
);

// Async thunk to check auth state on app load
export const checkAuthState = createAsyncThunk(
  "auth/checkAuthState",
  async (_, { rejectWithValue }) => {
    try {
      const userData = localStorage.getItem("userData");
      if (userData) {
        const user = JSON.parse(userData);
        return { user };
      }
      return { user: null };
    } catch (error) {
      localStorage.removeItem("userData");
      return rejectWithValue("Invalid stored user data");
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAuthState: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loginStatus = "idle";
      state.logoutStatus = "idle";
      localStorage.removeItem("userData");
    },
    updateUserData: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("userData", JSON.stringify(state.user));
      }
    },
    resetLoginStatus: (state) => {
      state.loginStatus = "idle";
    },
    resetLogoutStatus: (state) => {
      state.logoutStatus = "idle";
    },
    // Add immediate logout action for better UX
    immediateLogout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.logoutStatus = "succeeded";
      localStorage.removeItem("userData");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.loginStatus = "pending";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
        state.loginStatus = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
        state.loginStatus = "failed";
      })

      // Logout - Fixed to always succeed
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.logoutStatus = "pending";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        state.logoutStatus = "succeeded";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        // This should rarely happen now since we don't reject in the thunk
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
        state.logoutStatus = "failed";
      })

      // Check Auth
      .addCase(checkAuthState.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthState.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authChecked = true;
        if (action.payload.user) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
        }
      })
      .addCase(checkAuthState.rejected, (state) => {
        state.isLoading = false;
        state.authChecked = true; // ✅ Even if failed, it's "done"
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

// Export actions
export const {
  clearError,
  clearAuthState,
  updateUserData,
  resetLoginStatus,
  resetLogoutStatus,
  immediateLogout,
} = authSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;
export const selectLoginStatus = (state) => state.auth.loginStatus;
export const selectLogoutStatus = (state) => state.auth.logoutStatus;
export const selectAuthChecked = (state) => state.auth.authChecked;
// Export reducer
export default authSlice.reducer;
