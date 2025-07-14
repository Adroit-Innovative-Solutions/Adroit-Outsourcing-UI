import React, { useState } from "react";
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
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useNavigate } from "react-router-dom";

import UserRegister from "./Register"; // 👈 make sure path is correct

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isRegister, setIsRegister] = useState(false);

  const navigate = useNavigate();

  const [email, setEmail] = useState("example@aroitinnovative.com");
  const [password, setPassword] = useState("Test@123");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // TEMP hardcoded check (or replace with actual validation)
    if (email === "example@aroitinnovative.com" && password === "Test@123") {
      console.log("Login successful:", { email, password });
      navigate("/layout"); // 👈 redirect to /layout
    } else {
      alert("Invalid credentials");
    }
  };

  const handleToggleForm = () => {
    setIsRegister((prev) => !prev);
  };

  const handleRegisterSuccess = (data, type) => {
    console.log("Registered:", data);
    setIsRegister(false); // go back to login after success
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
        alignItems="center"
        justifyContent="center"
        bgcolor="primary.main"
        color="white"
        p={4}
        minHeight={isMobile ? "40vh" : "auto"}
      >
        <Typography
          variant={isMobile ? "h4" : "h3"}
          fontWeight="bold"
          textAlign="center"
        >
          {isRegister ? "Join Us Today!" : "Welcome Back!"}
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

            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

              <Box display="flex" justifyContent="flex-end" mt={1} mb={2}>
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Forgot Password?");
                  }}
                  underline="hover"
                  variant="body2"
                >
                  Forgot Password?
                </Link>
              </Box>

              <Button
                fullWidth
                variant="contained"
                type="submit"
                color="primary"
              >
                Login
              </Button>
            </form>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default Login;
