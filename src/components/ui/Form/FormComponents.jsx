import React, { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  RadioGroup,
  Radio,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  Chip,
  Box,
  OutlinedInput,
  Button,
  Typography,
  Paper,
  Grid,
  Switch,
  Slider,
  Rating,
  Autocomplete,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Phone,
  Person,
  Search,
  Close,
} from "@mui/icons-material";
import PhoneIcon from "@mui/icons-material/Phone";
import CloseIcon from "@mui/icons-material/Close";

// Text Input Component
// Updated TextInput component with clear button
export const TextInput = ({
  label,
  value,
  onChange,
  error,
  helperText,
  required = false,
  multiline = false,
  rows = 1,
  placeholder,
  disabled = false,
  fullWidth = true,
  clearable = true, // New prop to control clear button visibility
  ...props
}) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error || helperText}
      required={required}
      multiline={multiline}
      rows={multiline ? rows : 1}
      placeholder={placeholder}
      disabled={disabled}
      fullWidth={fullWidth}
      variant="outlined"
      InputProps={{
        endAdornment: clearable && value && !disabled && (
          <InputAdornment position="end">
            <IconButton
              onClick={() => onChange({ target: { value: "" } })}
              edge="end"
              size="small"
            >
              <Close fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

// Email Input Component
export const EmailInput = ({
  label = "Email",
  value,
  onChange,
  error,
  helperText,
  required = false,
  clearable = true,
  ...props
}) => {
  return (
    <TextField
      label={label}
      type="email"
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error || helperText}
      required={required}
      fullWidth
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Email />
          </InputAdornment>
        ),
        endAdornment: clearable && value && (
          <InputAdornment position="end">
            <IconButton
              onClick={() => onChange({ target: { value: "" } })}
              edge="end"
              size="small"
            >
              <Close fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};
// Password Input Component
export const PasswordInput = ({
  label = "Password",
  value,
  onChange,
  error,
  helperText,
  required = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      label={label}
      type={showPassword ? "text" : "password"}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error || helperText}
      required={required}
      fullWidth
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
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

// Phone Input Component

export const PhoneInput = ({
  label = "Phone Number",
  value,
  onChange,
  error,
  helperText,
  required = false,
  clearable = true,
  ...props
}) => {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [localError, setLocalError] = useState("");

  const countryCodes = [
    { code: "+1", label: "US", pattern: [3, 3, 4] }, // 10 digits
    { code: "+44", label: "UK", pattern: [5, 6] }, // 11 digits
    { code: "+91", label: "IN", pattern: [4, 3, 3] }, // 10 digits
    { code: "+86", label: "CN", pattern: [3, 4, 4] }, // 11 digits
    { code: "+81", label: "JP", pattern: [3, 4, 4] }, // 11 digits
    { code: "+33", label: "FR", pattern: [3, 3, 3, 3] }, // 12 digits
    { code: "+49", label: "DE", pattern: [3, 3, 4, 4] }, // 14 digits
  ];

  const selectedCountry = countryCodes.find((c) => c.code === countryCode);
  const expectedLength =
    selectedCountry?.pattern.reduce((a, b) => a + b, 0) || 10;

  const formatPhoneNumber = (value, pattern) => {
    const digits = value.replace(/\D/g, "");
    let formatted = "";
    let idx = 0;

    for (let len of pattern) {
      if (idx >= digits.length) break;
      if (formatted) formatted += " ";
      formatted += digits.slice(idx, idx + len);
      idx += len;
    }

    return formatted;
  };

  const handlePhoneChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, expectedLength);
    const formatted = formatPhoneNumber(digits, selectedCountry?.pattern);

    setPhoneNumber(formatted);

    const isValid = digits.length === expectedLength;
    setLocalError(isValid ? "" : `Must be ${expectedLength} digits`);

    onChange?.({
      target: {
        name: props.name || "phone",
        value: {
          full: `${countryCode} ${formatted}`,
          number: digits,
          isValid,
        },
      },
    });
  };

  const handleClear = () => {
    setPhoneNumber("");
    setLocalError("");
    onChange?.({
      target: {
        name: props.name || "phone",
        value: {
          full: "",
          number: "",
          isValid: !required,
        },
      },
    });
  };

  useEffect(() => {
    // When country code changes, revalidate
    const digits = phoneNumber.replace(/\D/g, "");
    const isValid = digits.length === expectedLength;
    setLocalError(isValid || !digits ? "" : `Must be ${expectedLength} digits`);
  }, [countryCode]);

  return (
    <TextField
      label={label}
      type="tel"
      value={phoneNumber}
      onChange={handlePhoneChange}
      error={!!error || !!localError}
      helperText={error || localError || helperText}
      required={required}
      fullWidth
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <PhoneIcon sx={{ fontSize: 20, mr: 1 }} />
            <Select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              variant="standard"
              disableUnderline
              sx={{
                width: 70, // reduced width
                fontSize: 12, // smaller font size
                "& .MuiSelect-select": {
                  paddingRight: "4px !important",
                  fontSize: 12, // match dropdown font size
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: 180,
                    fontSize: 12,
                    "& .MuiMenuItem-root": {
                      fontSize: 12, // reduce font in dropdown
                    },
                    "&::-webkit-scrollbar": {
                      width: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#4C585B",
                      borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: "#f1f1f1",
                    },
                  },
                },
              }}
            >
              {countryCodes.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  {country.code}({country.label})
                </MenuItem>
              ))}
            </Select>
          </InputAdornment>
        ),
        endAdornment: clearable && phoneNumber && (
          <InputAdornment position="end">
            <IconButton onClick={handleClear} edge="end" size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

// Date Input Component (using native HTML date picker)
export const DateInput = ({
  label,
  value,
  onChange,
  error,
  helperText,
  required = false,
  min,
  max,
  ...props
}) => {
  return (
    <TextField
      label={label}
      type="date"
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error || helperText}
      required={required}
      fullWidth
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        min: min,
        max: max,
      }}
      {...props}
    />
  );
};

// Time Input Component
export const TimeInput = ({
  label,
  value,
  onChange,
  error,
  helperText,
  required = false,
  ...props
}) => {
  return (
    <TextField
      label={label}
      type="time"
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error || helperText}
      required={required}
      fullWidth
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
      {...props}
    />
  );
};

// DateTime Local Input Component
export const DateTimeInput = ({
  label,
  value,
  onChange,
  error,
  helperText,
  required = false,
  ...props
}) => {
  return (
    <TextField
      label={label}
      type="datetime-local"
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error || helperText}
      required={required}
      fullWidth
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
      {...props}
    />
  );
};

// Select Dropdown Component
export const SelectInput = ({
  label,
  value,
  onChange,
  options = [],
  error,
  helperText,
  required = false,
  multiple = false,
  ...props
}) => {
  return (
    <FormControl fullWidth error={!!error} required={required}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        label={label}
        multiple={multiple}
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

// Multi-Select with Chips Component
export const MultiSelectInput = ({
  label,
  value = [],
  onChange,
  options = [],
  error,
  helperText,
  required = false,
  ...props
}) => {
  return (
    <FormControl fullWidth error={!!error} required={required}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={value}
        onChange={onChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((val) => (
              <Chip
                key={val}
                label={options.find((opt) => opt.value === val)?.label || val}
                size="small"
              />
            ))}
          </Box>
        )}
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

// Radio Group Component
export const RadioInput = ({
  label,
  value,
  onChange,
  options = [],
  error,
  helperText,
  required = false,
  row = false,
  ...props
}) => {
  return (
    <FormControl error={!!error} required={required}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup value={value} onChange={onChange} row={row} {...props}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

// Checkbox Group Component
export const CheckboxGroup = ({
  label,
  value = [],
  onChange,
  options = [],
  error,
  helperText,
  required = false,
  ...props
}) => {
  const handleChange = (optionValue) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange({ target: { value: newValue } });
  };

  return (
    <FormControl error={!!error} required={required}>
      <FormLabel>{label}</FormLabel>
      <Box>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                checked={value.includes(option.value)}
                onChange={() => handleChange(option.value)}
              />
            }
            label={option.label}
          />
        ))}
      </Box>
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

// Single Checkbox Component
export const CheckboxInput = ({
  label,
  checked,
  onChange,
  error,
  helperText,
  required = false,
  ...props
}) => {
  return (
    <FormControl error={!!error} required={required}>
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={onChange} {...props} />}
        label={label}
      />
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

// Switch Component
export const SwitchInput = ({
  label,
  checked,
  onChange,
  error,
  helperText,
  ...props
}) => {
  return (
    <FormControl error={!!error}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={onChange} {...props} />}
        label={label}
      />
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

// Slider Component
export const SliderInput = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  marks = false,
  error,
  helperText,
  ...props
}) => {
  return (
    <FormControl fullWidth error={!!error}>
      <FormLabel>{label}</FormLabel>
      <Box sx={{ px: 2, pt: 2 }}>
        <Slider
          value={value}
          onChange={(e, newValue) => onChange({ target: { value: newValue } })}
          min={min}
          max={max}
          step={step}
          marks={marks}
          valueLabelDisplay="auto"
          {...props}
        />
      </Box>
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

// Rating Component
export const RatingInput = ({
  label,
  value,
  onChange,
  max = 5,
  error,
  helperText,
  ...props
}) => {
  return (
    <FormControl error={!!error}>
      <FormLabel>{label}</FormLabel>
      <Box sx={{ pt: 1 }}>
        <Rating
          value={value}
          onChange={(e, newValue) => onChange({ target: { value: newValue } })}
          max={max}
          {...props}
        />
      </Box>
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
};


// Autocomplete Component
export const AutocompleteInput = ({
  label,
  value,
  onChange,
  options = [],
  error,
  helperText,
  required = false,
  multiple = false,
  freeSolo = false,
  clearable = true,
  width = "100%", // Default width
  ...props
}) => {
  return (
    <Autocomplete
      options={options}
      value={value}
      onChange={(e, newValue) => onChange({ target: { value: newValue } })}
      multiple={multiple}
      freeSolo={freeSolo}
      clearIcon={clearable ? <Close fontSize="small" /> : null}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={!!error}
          helperText={error || helperText}
          required={required}
          variant="outlined"
          sx={{ width }}
        />
      )}
      {...props}
    />
  );
};


// Search Input Component
export const SearchInput = ({
  label = "Search",
  value,
  onChange,
  onSearch,
  placeholder = "Search...",
  ...props
}) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      fullWidth
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
        endAdornment: onSearch && (
          <InputAdornment position="end">
            <Button onClick={() => onSearch(value)} size="small">
              Search
            </Button>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

// TextAreaInput Component
export const TextAreaInput = ({
  label,
  value,
  onChange,
  error,
  helperText,
  required = false,
  rows = 3,
  placeholder = "",
  disabled = false,
  ...props
}) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      error={error}
      helperText={helperText}
      multiline
      rows={rows}
      fullWidth
      variant="outlined"
      {...props}
    />
  );
};
