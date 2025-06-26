import React, { useState } from 'react';
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
  IconButton
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Phone,
  Person,
  Search
} from '@mui/icons-material';
import { width } from '@mui/system';

// Text Input Component
const TextInput = ({ 
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
      {...props}
    />
  );
};

// Email Input Component
const EmailInput = ({ 
  label = "Email", 
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
      }}
      {...props}
    />
  );
};

// Password Input Component
const PasswordInput = ({ 
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
      type={showPassword ? 'text' : 'password'}
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
const PhoneInput = ({ 
  label = "Phone Number", 
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
      type="tel"
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
            <Phone />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

// Date Input Component (using native HTML date picker)
const DateInput = ({ 
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
const TimeInput = ({ 
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
const DateTimeInput = ({ 
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
const SelectInput = ({ 
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
      {(error || helperText) && <FormHelperText>{error || helperText}</FormHelperText>}
    </FormControl>
  );
};

// Multi-Select with Chips Component
const MultiSelectInput = ({ 
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
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((val) => (
              <Chip 
                key={val} 
                label={options.find(opt => opt.value === val)?.label || val}
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
      {(error || helperText) && <FormHelperText>{error || helperText}</FormHelperText>}
    </FormControl>
  );
};

// Radio Group Component
const RadioInput = ({ 
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
      <RadioGroup
        value={value}
        onChange={onChange}
        row={row}
        {...props}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      {(error || helperText) && <FormHelperText>{error || helperText}</FormHelperText>}
    </FormControl>
  );
};

// Checkbox Group Component
const CheckboxGroup = ({ 
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
      ? value.filter(v => v !== optionValue)
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
      {(error || helperText) && <FormHelperText>{error || helperText}</FormHelperText>}
    </FormControl>
  );
};

// Single Checkbox Component
const CheckboxInput = ({ 
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
        control={
          <Checkbox
            checked={checked}
            onChange={onChange}
            {...props}
          />
        }
        label={label}
      />
      {(error || helperText) && <FormHelperText>{error || helperText}</FormHelperText>}
    </FormControl>
  );
};

// Switch Component
const SwitchInput = ({ 
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
        control={
          <Switch
            checked={checked}
            onChange={onChange}
            {...props}
          />
        }
        label={label}
      />
      {(error || helperText) && <FormHelperText>{error || helperText}</FormHelperText>}
    </FormControl>
  );
};

// Slider Component
const SliderInput = ({ 
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
      {(error || helperText) && <FormHelperText>{error || helperText}</FormHelperText>}
    </FormControl>
  );
};

// Rating Component
const RatingInput = ({ 
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
      {(error || helperText) && <FormHelperText>{error || helperText}</FormHelperText>}
    </FormControl>
  );
};

// Autocomplete Component
const AutocompleteInput = ({ 
  label, 
  value, 
  onChange, 
  options = [], 
  error, 
  helperText,
  required = false,
  multiple = false,
  freeSolo = false,
  ...props 
}) => {
  return (
    <Autocomplete
      options={options}
      value={value}
      onChange={(e, newValue) => onChange({ target: { value: newValue } })}
      multiple={multiple}
      freeSolo={freeSolo}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={!!error}
          helperText={error || helperText}
          required={required}
          variant="outlined"
        />
      )}
      {...props}
    />
  );
};

// Search Input Component
const SearchInput = ({ 
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
const TextAreaInput = ({
  label,
  value,
  onChange,
  error,
  helperText,
  required = false,
  rows = 3,
  placeholder = '',
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

// Demo Component to showcase all form components
const FormComponentsDemo = () => {
  const [formData, setFormData] = useState({
    text: '',
    email: '',
    password: '',
    phone: '',
    date: '',
    time: '',
    datetime: '',
    select: '',
    multiSelect: [],
    radio: '',
    checkboxGroup: [],
    checkbox: false,
    switch: false,
    slider: 50,
    rating: 0,
    autocomplete: null,
    search: '',
    textAreaInput:"",
  });

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  const radioOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
    { value: 'maybe', label: 'Maybe' }
  ];

  const autocompleteOptions = [
    'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'
  ];

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        MUI Form Components Library
      </Typography>
      
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextInput
              label="Text Input"
              value={formData.text}
              onChange={handleChange('text')}
              placeholder="Enter text here"
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <EmailInput
              value={formData.email}
              onChange={handleChange('email')}
              required
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <PasswordInput
              value={formData.password}
              onChange={handleChange('password')}
              required
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <PhoneInput
              value={formData.phone}
              onChange={handleChange('phone')}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <DateInput
              label="Date"
              value={formData.date}
              onChange={handleChange('date')}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TimeInput
              label="Time"
              value={formData.time}
              onChange={handleChange('time')}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <DateTimeInput
              label="Date & Time"
              value={formData.datetime}
              onChange={handleChange('datetime')}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <SelectInput
              label="Select Option"
              value={formData.select}
              onChange={handleChange('select')}
              options={selectOptions}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <MultiSelectInput
              label="Multi Select"
              value={formData.multiSelect}
              onChange={handleChange('multiSelect')}
              options={selectOptions}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <RadioInput
              label="Radio Group"
              value={formData.radio}
              onChange={handleChange('radio')}
              options={radioOptions}
              row
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <CheckboxGroup
              label="Checkbox Group"
              value={formData.checkboxGroup}
              onChange={handleChange('checkboxGroup')}
              options={selectOptions}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <CheckboxInput
              label="I agree to the terms and conditions"
              checked={formData.checkbox}
              onChange={(e) => setFormData(prev => ({ ...prev, checkbox: e.target.checked }))}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <SwitchInput
              label="Enable notifications"
              checked={formData.switch}
              onChange={(e) => setFormData(prev => ({ ...prev, switch: e.target.checked }))}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <SliderInput
              label="Volume"
              value={formData.slider}
              onChange={handleChange('slider')}
              min={0}
              max={100}
              sx={{width:100}}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <RatingInput
              label="Rate this product"
              value={formData.rating}
              onChange={handleChange('rating')}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <AutocompleteInput
              label="Autocomplete"
              sx={{width:200}}
              value={formData.autocomplete}
              onChange={handleChange('autocomplete')}
              options={autocompleteOptions}
              freeSolo
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextAreaInput 
            label="Feedback"
            value={formData.textAreaInput}
            onChange={handleChange("textAreaInput")}
             placeholder="Enter Feedback"
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <SearchInput
              value={formData.search}
              onChange={handleChange('search')}
              onSearch={(value) => console.log('Searching for:', value)}
            />
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button variant="contained" size="large">
            Submit Form
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default FormComponentsDemo;