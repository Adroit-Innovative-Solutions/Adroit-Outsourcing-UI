import React, { useCallback, useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import NotesIcon from "@mui/icons-material/Notes";

const getStartIcon = (type, withCountryCode) => {
  if (type === "tel" && withCountryCode) {
    return (
      <Box display="flex" alignItems="center" gap={0.5}>
        <PhoneIcon fontSize="small" />
        <Typography variant="body2" sx={{ minWidth: 30 }}>
          +91
        </Typography>
      </Box>
    );
  }

  switch (type) {
    case "email":
      return <EmailIcon />;
    case "tel":
      return <PhoneIcon />;
    case "password":
      return <LockIcon />;
    case "textarea":
      return <NotesIcon />;
    default:
      return null;
  }
};

const TextInput = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  type = "text",
  disabled = false,
  required = false,
  fullWidth = true,
  multiline = false,
  rows = 3,
  countryCode = type === "tel" ? "+91" : null,
  ...props
}) => {
  const isPassword = type === "password";
  const isMultiline = type === "textarea" || multiline;
  const [showPassword, setShowPassword] = useState(false);

  const showClear = Boolean(value) && !disabled && !isPassword;

  const handleClear = useCallback(() => {
    if (!onChange || !name) return;
    const syntheticEvent = {
      target: {
        name,
        value: "",
      },
    };
    onChange(syntheticEvent);
  }, [onChange, name]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      type={inputType}
      error={Boolean(error)}
      helperText={helperText || error}
      disabled={disabled}
      required={required}
      fullWidth={fullWidth}
      variant="outlined"
      multiline={isMultiline}
      rows={isMultiline ? rows : 1}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {getStartIcon(type, Boolean(countryCode))}
          </InputAdornment>
        ),
        endAdornment: (
          <>
            {showClear && (
              <InputAdornment position="end">
                <IconButton onClick={handleClear} size="small" edge="end">
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            )}
            {isPassword && (
              <InputAdornment position="end">
                <IconButton
                  onClick={togglePasswordVisibility}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )}
          </>
        ),
      }}
      {...props}
    />
  );
};

export default TextInput;
