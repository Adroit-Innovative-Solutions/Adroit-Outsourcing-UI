import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import ClearIcon from "@mui/icons-material/Clear";

const EmailInput = ({
  label = "Email",
  name = "email",
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required = false,
  disabled = false,
  ...props
}) => {
  const showClear = value && !disabled;

  const handleClear = () => {
    const syntheticEvent = {
      target: {
        name,
        value: "",
      },
    };
    onChange(syntheticEvent);
  };

  return (
    <TextField
      label={label}
      name={name}
      type="email"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={!!error}
      helperText={error || helperText}
      required={required}
      disabled={disabled}
      fullWidth
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <EmailIcon />
          </InputAdornment>
        ),
        endAdornment: showClear && (
          <InputAdornment position="end">
            <IconButton onClick={handleClear} size="small">
              <ClearIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default EmailInput;
