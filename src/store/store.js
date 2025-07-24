import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import registerReducer from './slices/registerSlice';
import employeeReducer from "./slices/employeeSlice";
import hotlistReducer from "./slices/hotlistSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
     register: registerReducer,
     employees: employeeReducer,
     hotlist: hotlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Optional: Export dispatch & state helpers (no types in JS)
export const AppDispatch = store.dispatch;
