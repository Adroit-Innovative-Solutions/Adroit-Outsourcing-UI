import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ClearIcon from "@mui/icons-material/Clear";

const PasswordInput = ({
  label = "Password",
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  name = "password",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClear = () => {
    const syntheticEvent = {
      target: {
        name,
        value: "",
      },
    };
    onChange(syntheticEvent);
  };

  const showClear = value && !disabled;

  return (
    <TextField
      label={label}
      type={showPassword ? "text" : "password"}
      name={name}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error || helperText}
      required={required}
      disabled={disabled}
      fullWidth
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {showClear && (
              <IconButton onClick={handleClear} size="small" edge="end">
                <ClearIcon fontSize="small" />
              </IconButton>
            )}
            <IconButton
              onClick={() => setShowPassword((prev) => !prev)}
              edge="end"
              size="small"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default PasswordInput;
