import React, { forwardRef } from "react";
import {
  TextField,
  InputAdornment,
  FormHelperText,
  Box,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close"; // Cross icon

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 8,
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
  },
}));

export const CustomInput = forwardRef(
  (
    {
      label,
      name,
      placeholder,
      helperText,
      error = false,
      disabled = false,
      required = false,
      fullWidth = true,
      variant = "outlined",
      size = "medium",
      startIcon,
      endIcon,
      type = "text",
      multiline = false,
      rows = 4,
      value = "",
      onChange,
      onBlur,
      onFocus,
      ...props
    },
    ref
  ) => {
    const handleClear = (e) => {
      if (onChange) {
        onChange({
          ...e,
          target: {
            ...e.target,
             name,
            value: "",
          },
        });
      }
    };

    const showClearIcon = !disabled && !!value && type !== "password";

    return (
      <Box>
        <StyledTextField
          ref={ref}
          label={label}
          name={name}
          placeholder={placeholder}
          error={error}
          disabled={disabled}
          required={required}
          fullWidth={fullWidth}
          variant={variant}
          size={size}
          type={type}
          multiline={multiline}
          rows={multiline ? rows : undefined}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          InputProps={{
            startAdornment: startIcon && (
              <InputAdornment position="start">{startIcon}</InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {showClearIcon && (
                  <IconButton
                    aria-label="clear input"
                    onClick={handleClear}
                    size="small"
                    edge="end"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
                {endIcon}
              </InputAdornment>
            ),
          }}
          {...props}
        />
        {helperText && (
          <FormHelperText error={error}>{helperText}</FormHelperText>
        )}
      </Box>
    );
  }
);

CustomInput.displayName = "CustomInput";
