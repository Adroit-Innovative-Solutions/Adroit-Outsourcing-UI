import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import UserRegister from "./Register";
import {
  loginUser,
  checkAuthState,
  clearError,
  resetLoginStatus,
  selectAuth,
  selectIsAuthenticated,
  selectIsLoading,
  selectError,
  selectLoginStatus,
  selectAuthChecked,
} from "../../store/slices/authSlice";
import { showSuccessToast, showErrorToast } from "../../utils/toastUtils";

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux selectors
  const auth = useSelector(selectAuth);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const loginStatus = useSelector(selectLoginStatus);
  const authChecked = useSelector(selectAuthChecked);

  // Redirect if already authenticated
  useEffect(() => {
    if (authChecked && isAuthenticated) {
      navigate("/layout");
    }
  }, [authChecked, isAuthenticated, navigate]);

  // Handle login status changes
  useEffect(() => {
    if (loginStatus === "succeeded") {
      showSuccessToast("Login successful!");
      dispatch(resetLoginStatus());
      navigate("/layout");
    } else if (loginStatus === "failed" && error) {
      showErrorToast(error);
      dispatch(clearError());
    }
  }, [loginStatus, error, dispatch, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      dispatch(clearError());
      dispatch(loginUser(values));
      setSubmitting(false);
    },
  });

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
  } = formik;

  const handleToggleForm = () => {
    setIsRegister((prev) => !prev);
  };

  const handleRegisterSuccess = (data, type) => {
    console.log("Registered:", data);
    showSuccessToast("Registration successful! Please login.");
    setIsRegister(false); // go back to login after success
  };

  const handleForgotPassword = async (email) => {
    if (!email) {
      showErrorToast("Please enter your email first");
      return;
    }

    try {
      // Replace with actual forgot password API call
      // await userAPI.forgotPassword({ email });
      showSuccessToast("Password reset link sent to your email!");
    } catch (error) {
      showErrorToast(error.message || "Failed to send reset link");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      height="100vh"
    >
      {/* Left Panel */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        px={4}
        py={isMobile ? 6 : 10}
        minHeight={isMobile ? "100vh" : "100vh"}
        borderRadius={isMobile ? 0 : 4}
        boxShadow={isMobile ? "none" : 4}
        sx={{
          transition: "all 0.3s ease-in-out",
          backgroundImage:
            "linear-gradient(120deg, #e16941ff 0%, #e9682cff 100%)",
          color: "white",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* SVG Connect Logo */}
        <Box sx={{ mb: 3 }}>
          <svg
            width={isMobile ? 80 : 100}
            height={isMobile ? 80 : 100}
            viewBox="0 0 120 120"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <circle
              cx="60"
              cy="60"
              r="58"
              stroke="white"
              strokeWidth="4"
              opacity="0.3"
            />
            <circle cx="60" cy="30" r="8" fill="white" />
            <circle cx="30" cy="90" r="8" fill="white" />
            <circle cx="90" cy="90" r="8" fill="white" />
            <line
              x1="60"
              y1="30"
              x2="30"
              y2="90"
              stroke="white"
              strokeWidth="2"
            />
            <line
              x1="60"
              y1="30"
              x2="90"
              y2="90"
              stroke="white"
              strokeWidth="2"
            />
            <line
              x1="30"
              y1="90"
              x2="90"
              y2="90"
              stroke="white"
              strokeWidth="2"
            />
            <circle cx="60" cy="60" r="6" fill="white" />
            <line
              x1="60"
              y1="30"
              x2="60"
              y2="60"
              stroke="white"
              strokeWidth="2"
            />
            <line
              x1="30"
              y1="90"
              x2="60"
              y2="60"
              stroke="white"
              strokeWidth="2"
            />
            <line
              x1="90"
              y1="90"
              x2="60"
              y2="60"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        </Box>

        {/* Title */}
        <Typography
          variant={isMobile ? "h4" : "h3"}
          fontWeight="bold"
          sx={{
            maxWidth: 500,
            letterSpacing: 1,
            mb: 1,
          }}
        >
          {isRegister ? "Join Us Today!" : "Welcome Back!"}
        </Typography>

        {/* Tagline */}
        <Typography
          variant="subtitle1"
          sx={{
            maxWidth: 480,
            opacity: 0.85,
            fontSize: isMobile ? "0.9rem" : "1rem",
          }}
        >
          Empowering your professional connections and career growth.
        </Typography>
      </Box>

      {/* Right Panel */}
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="#f5f5f5"
        p={isMobile ? 2 : 4}
        position="relative"
      >
        {/* Toggle Button */}
        <Box position="absolute" top={16} right={16}>
          <Button variant="outlined" size="small" onClick={handleToggleForm}>
            {isRegister ? "Login" : "Register"}
          </Button>
        </Box>

        {/* Conditionally Render Form */}
        {isRegister ? (
          <UserRegister
            onCancel={handleToggleForm}
            onSuccess={handleRegisterSuccess}
          />
        ) : (
          <Paper
            elevation={3}
            sx={{
              p: 4,
              width: "100%",
              maxWidth: 500,
              border: "1px solid #ccc",
              borderRadius: 3,
              backgroundColor: "white",
              position: "relative",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mb={3}
              gap={1}
            >
              <LoginIcon color="primary" />
              <Typography variant="h5" fontWeight={600}>
                Login
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                margin="normal"
                required
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                margin="normal"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt={1}
                mb={2}
              >
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleForgotPassword(values.email);
                  }}
                  underline="hover"
                  variant="body2"
                >
                  Forgot Password?
                </Link>

                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  disabled={isLoading || isSubmitting}
                  sx={{ ml: 2, minWidth: 100 }} // optional: adds spacing & ensures consistent button width
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </Box>
            </form>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default Login;
