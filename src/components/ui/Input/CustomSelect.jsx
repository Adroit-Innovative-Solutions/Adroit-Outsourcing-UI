import React, { forwardRef } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  InputAdornment,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
  },
}));

export const CustomSelect = forwardRef(({
  label,
  value,
  onChange,
  onBlur,
  onFocus,
  error = false,
  helperText,
  disabled = false,
  required = false,
  fullWidth = true,
  size = 'medium',
  startIcon,
  endIcon,
  options = [],  // array of { value, label }
  multiple = false,
  ...props
}, ref) => {
  return (
    <Box>
      <StyledFormControl
        variant="outlined"
        error={error}
        disabled={disabled}
        required={required}
        fullWidth={fullWidth}
        size={size}
      >
        {label && <InputLabel>{label}</InputLabel>}

        <Select
          ref={ref}
          label={label}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          multiple={multiple}
          startAdornment={startIcon ? (
            <InputAdornment position="start">
              {startIcon}
            </InputAdornment>
          ) : null}
          endAdornment={endIcon ? (
            <InputAdornment position="end">
              {endIcon}
            </InputAdornment>
          ) : null}
          {...props}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        {helperText && (
          <FormHelperText>{helperText}</FormHelperText>
        )}
      </StyledFormControl>
    </Box>
  );
});

CustomSelect.displayName = 'CustomSelect';
