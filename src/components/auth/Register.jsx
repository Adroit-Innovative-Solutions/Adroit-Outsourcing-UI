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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput from "../ui/Input/PhoneInput";
import TextField from "@mui/material/TextField";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Register = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);
  const [countryCode, setCountryCode] = React.useState("+91");

  const formik = useFormik({
    initialValues: {
      employeeId: "",
      employeeName: "",
      employeeMobileNo: "",
      employeeEmailId: "",
      employeePassword: "",
      employeeRole: "EMPLOYEE",
    },
    validationSchema: Yup.object({
      employeeId: Yup.string()
        .matches(/^ADIT\d{5}$/, "ID must start with ADIT and 5 digits")
        .required("Employee ID is required"),

      employeeName: Yup.string()
        .max(20, "Max 20 characters")
        .required("Name is required"),

      employeeMobileNo: Yup.string().required("Mobile number is required"),

      employeeEmailId: Yup.string()
        .email("Invalid email format")
        .matches(
          /^[a-zA-Z0-9._%+-]+@aroitinnovative\.com$/,
          "Use company email (example@aroitinnovative.com)"
        )
        .required("Email is required"),

      employeePassword: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
          "Password must include letters, numbers & special characters"
        )
        .required("Password is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const payload = {
        ...values,
        countryCode,
      };
      console.log("Submitted payload:", payload);
      resetForm();
      setCountryCode("+91");
      setShowPassword(false);
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
            label="Employee ID"
            name="employeeId"
            value={values.employeeId}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.employeeId && Boolean(errors.employeeId)}
            helperText={touched.employeeId && errors.employeeId}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Employee Name"
            name="employeeName"
            value={values.employeeName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.employeeName && Boolean(errors.employeeName)}
            helperText={touched.employeeName && errors.employeeName}
            fullWidth
            margin="normal"
          />

          <PhoneInput
            label="Mobile Number"
            name="employeeMobileNo"
            value={values.employeeMobileNo}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.employeeMobileNo && errors.employeeMobileNo}
            helperText={touched.employeeMobileNo && errors.employeeMobileNo}
            countryCode={countryCode}
            setCountryCode={setCountryCode}
            required
          />

          <TextField
            label="Email ID"
            name="employeeEmailId"
            value={values.employeeEmailId}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.employeeEmailId && Boolean(errors.employeeEmailId)}
            helperText={touched.employeeEmailId && errors.employeeEmailId}
            fullWidth
            margin="normal"
            type="email"
          />

          <TextField
            label="Password"
            name="employeePassword"
            type={showPassword ? "text" : "password"}
            value={values.employeePassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.employeePassword && Boolean(errors.employeePassword)}
            helperText={touched.employeePassword && errors.employeePassword}
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

          <Stack direction="row" spacing={2} mt={3}>
            <Button type="submit" variant="contained" fullWidth>
              Register
            </Button>
            <Button
              type="button"
              variant="outlined"
              fullWidth
              onClick={() => {
                resetForm();
                setCountryCode("+91");
                setShowPassword(false);
              }}
            >
              Reset
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
