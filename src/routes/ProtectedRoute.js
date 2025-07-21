// src/routes/ProtectedRoute.jsx
import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsAuthenticated,
  selectAuthChecked,
  checkAuthState,
} from "../store/slices/authSlice";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authChecked = useSelector(selectAuthChecked);

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  if (!authChecked) return null; // or a loading spinner

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
