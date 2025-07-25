// src/components/Register.jsx
import React from "react";
import {
  Box,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Button,
  Stack,
  useTheme,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput from "../ui/Input/PhoneInput";
import { showSuccessToast, showErrorToast } from "../../utils/toastUtils";
import { userAPI } from "../../utils/api";
import { CustomButton } from "../ui/Button/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  resetRegisterState,
} from "../../store/slices/registerSlice";

const Register = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [countryCode, setCountryCode] = React.useState("+91");
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      userId: "",
      userName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      roles: ["RECRUITER"],
    },
    validationSchema: Yup.object({
      userId: Yup.string()
        .matches(/^ADIT\d{5}$/, "ID must start with ADIT and 5 digits")
        .required("User ID is required"),

      userName: Yup.string()
        .max(20, "Max 20 characters")
        .required("Name is required"),

      phoneNumber: Yup.string().required("Mobile number is required"),

      email: Yup.string()
        .email("Invalid email format")
        .matches(
          /^[a-zA-Z0-9._%+-]+@adroitinnovative\.com$/,
          "Use company email (example@adroitinnovative.com)"
        )
        .required("Email is required"),

      password: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
          "Password must include letters, numbers & special characters"
        )
        .required("Password is required"),

      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        userId: values.userId,
        userName: values.userName,
        password: values.password,
        email: values.email,
        phoneNumber: values.phoneNumber,
        roles: values.roles,
        confirmPassword: values.confirmPassword,
      };

      try {
        const resultAction = await dispatch(registerUser(payload));

        if (registerUser.fulfilled.match(resultAction)) {
          const { message, data } = resultAction.payload;
          showSuccessToast(`${message}. Registered Email: ${data.email}`);
          resetForm();
          setCountryCode("+91");
          setShowPassword(false);
          setShowConfirmPassword(false);
          dispatch(resetRegisterState());
        } else {
          showErrorToast(resultAction.payload || "Registration failed.");
        }
      } catch (error) {
        showErrorToast(error.message || "Unexpected error.");
      }
    },
  });

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    errors,
    touched,
    isSubmitting,
  } = formik;

  return (
    <Box display="flex" justifyContent="center" px={2}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 450,
          borderRadius: 4,
          boxShadow: `0 8px 24px ${theme.palette.grey[300]}`,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={600}
          color="primary"
          gutterBottom
          textAlign="center"
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={1}
        >
          <PersonAddIcon fontSize="large" color="primary" />
          Register
        </Typography>

        <Typography
          variant="subtitle2"
          color="text.secondary"
          textAlign="center"
          mb={3}
        >
          Fill in your employee details below
        </Typography>

        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            label="User ID"
            name="userId"
            value={values.userId}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.userId && Boolean(errors.userId)}
            helperText={touched.userId && errors.userId}
            fullWidth
            margin="normal"
          />

          <TextField
            label="User Name"
            name="userName"
            value={values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.userName && Boolean(errors.userName)}
            helperText={touched.userName && errors.userName}
            fullWidth
            margin="normal"
          />

          <PhoneInput
            label="Mobile Number"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phoneNumber && errors.phoneNumber}
            helperText={touched.phoneNumber && errors.phoneNumber}
            countryCode={countryCode}
            setCountryCode={setCountryCode}
            required
          />

          <TextField
            label="Email ID"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            fullWidth
            margin="normal"
            type="email"
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            fullWidth
            margin="normal"
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

          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Stack direction="row" spacing={2} mt={3}>
            <Button
              type="button"
              variant="outlined"
              fullWidth
              onClick={() => {
                resetForm();
                setCountryCode("+91");
                setShowPassword(false);
                setShowConfirmPassword(false);
              }}
            >
              Reset
            </Button>
            <CustomButton type="submit" fullWidth loading={isSubmitting}>
              Register
            </CustomButton>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
