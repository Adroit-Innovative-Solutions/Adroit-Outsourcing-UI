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
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Alert,
  Container,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Phone,
  Person,
  Search,
  Close,
  Add,
  Delete,
  Edit,
  Save,
  Preview,
  Code,
  PlayArrow,
} from "@mui/icons-material";
import PhoneIcon from "@mui/icons-material/Phone";
import CloseIcon from "@mui/icons-material/Close";

// Import all form components (keeping the original code)
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
  clearable = true,
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

const EmailInput = ({
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

const PhoneInput = ({
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
    { code: "+1", label: "US", pattern: [3, 3, 4] },
    { code: "+44", label: "UK", pattern: [5, 6] },
    { code: "+91", label: "IN", pattern: [4, 3, 3] },
    { code: "+86", label: "CN", pattern: [3, 4, 4] },
    { code: "+81", label: "JP", pattern: [3, 4, 4] },
    { code: "+33", label: "FR", pattern: [3, 3, 3, 3] },
    { code: "+49", label: "DE", pattern: [3, 3, 4, 4] },
  ];

  const selectedCountry = countryCodes.find((c) => c.code === countryCode);
  const expectedLength = selectedCountry?.pattern.reduce((a, b) => a + b, 0) || 10;

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
              sx={{ width: 70, fontSize: 12 }}
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
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

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
        control={<Checkbox checked={checked} onChange={onChange} {...props} />}
        label={label}
      />
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

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
      InputLabelProps={{ shrink: true }}
      inputProps={{ min, max }}
      {...props}
    />
  );
};

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
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

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
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

// Form Builder Component
const FormBuilder = ({ onFormSave }) => {
  const [formConfig, setFormConfig] = useState({
    title: "",
    description: "",
    steps: [
      {
        title: "Step 1",
        fields: []
      }
    ]
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [fieldDialog, setFieldDialog] = useState({ open: false, field: null, index: -1 });

  const fieldTypes = [
    { value: "text", label: "Text Input" },
    { value: "email", label: "Email Input" },
    { value: "password", label: "Password Input" },
    { value: "phone", label: "Phone Input" },
    { value: "select", label: "Select Dropdown" },
    { value: "radio", label: "Radio Group" },
    { value: "checkbox", label: "Checkbox" },
    { value: "checkboxGroup", label: "Checkbox Group" },
    { value: "date", label: "Date Input" },
    { value: "slider", label: "Slider" },
    { value: "rating", label: "Rating" },
  ];

  const addStep = () => {
    setFormConfig(prev => ({
      ...prev,
      steps: [...prev.steps, { title: `Step ${prev.steps.length + 1}`, fields: [] }]
    }));
  };

  const removeStep = (stepIndex) => {
    if (formConfig.steps.length > 1) {
      const newSteps = formConfig.steps.filter((_, index) => index !== stepIndex);
      setFormConfig(prev => ({ ...prev, steps: newSteps }));
      if (currentStep >= newSteps.length) {
        setCurrentStep(newSteps.length - 1);
      }
    }
  };

  const addField = () => {
    setFieldDialog({ open: true, field: null, index: -1 });
  };

  const editField = (fieldIndex) => {
    const field = formConfig.steps[currentStep].fields[fieldIndex];
    setFieldDialog({ open: true, field, index: fieldIndex });
  };

  const saveField = (fieldData) => {
    setFormConfig(prev => {
      const newSteps = [...prev.steps];
      if (fieldDialog.index === -1) {
        newSteps[currentStep].fields.push(fieldData);
      } else {
        newSteps[currentStep].fields[fieldDialog.index] = fieldData;
      }
      return { ...prev, steps: newSteps };
    });
    setFieldDialog({ open: false, field: null, index: -1 });
  };

  const removeField = (fieldIndex) => {
    setFormConfig(prev => {
      const newSteps = [...prev.steps];
      newSteps[currentStep].fields = newSteps[currentStep].fields.filter((_, index) => index !== fieldIndex);
      return { ...prev, steps: newSteps };
    });
  };

  const updateStepTitle = (stepIndex, title) => {
    setFormConfig(prev => {
      const newSteps = [...prev.steps];
      newSteps[stepIndex].title = title;
      return { ...prev, steps: newSteps };
    });
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Form Configuration</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Form Title"
              value={formConfig.title}
              onChange={(e) => setFormConfig(prev => ({ ...prev, title: e.target.value }))}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Form Description"
              value={formConfig.description}
              onChange={(e) => setFormConfig(prev => ({ ...prev, description: e.target.value }))}
              margin="normal"
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Form Steps</Typography>
          <Button startIcon={<Add />} onClick={addStep} variant="contained" size="small">
            Add Step
          </Button>
        </Box>

        <Tabs value={currentStep} onChange={(e, newValue) => setCurrentStep(newValue)}>
          {formConfig.steps.map((step, index) => (
            <Tab key={index} label={step.title} />
          ))}
        </Tabs>

        <Box sx={{ mt: 2 }}>
          {formConfig.steps.map((step, stepIndex) => (
            <Box key={stepIndex} sx={{ display: stepIndex === currentStep ? 'block' : 'none' }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  label="Step Title"
                  value={step.title}
                  onChange={(e) => updateStepTitle(stepIndex, e.target.value)}
                  size="small"
                />
                {formConfig.steps.length > 1 && (
                  <Button
                    color="error"
                    onClick={() => removeStep(stepIndex)}
                    size="small"
                  >
                    Delete Step
                  </Button>
                )}
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1">Fields</Typography>
                <Button startIcon={<Add />} onClick={addField} variant="outlined" size="small">
                  Add Field
                </Button>
              </Box>

              {step.fields.map((field, fieldIndex) => (
                <Card key={fieldIndex} sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="body1">{field.label}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Type: {fieldTypes.find(t => t.value === field.type)?.label}
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton onClick={() => editField(fieldIndex)} size="small">
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => removeField(fieldIndex)} size="small" color="error">
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ))}
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => onFormSave(formConfig)}
          disabled={!formConfig.title || formConfig.steps.every(step => step.fields.length === 0)}
        >
          Generate Form
        </Button>
      </Box>

      <FieldDialog
        open={fieldDialog.open}
        field={fieldDialog.field}
        fieldTypes={fieldTypes}
        onSave={saveField}
        onClose={() => setFieldDialog({ open: false, field: null, index: -1 })}
      />
    </Box>
  );
};

// Field Dialog Component
const FieldDialog = ({ open, field, fieldTypes, onSave, onClose }) => {
  const [fieldData, setFieldData] = useState({
    type: "text",
    label: "",
    name: "",
    placeholder: "",
    required: false,
    helperText: "",
    options: []
  });

  const [optionText, setOptionText] = useState("");

  useEffect(() => {
    if (field) {
      setFieldData(field);
    } else {
      setFieldData({
        type: "text",
        label: "",
        name: "",
        placeholder: "",
        required: false,
        helperText: "",
        options: []
      });
    }
  }, [field, open]);

  const handleSave = () => {
    if (fieldData.label && fieldData.name) {
      onSave(fieldData);
    }
  };

  const addOption = () => {
    if (optionText.trim()) {
      setFieldData(prev => ({
        ...prev,
        options: [...prev.options, { value: optionText.trim(), label: optionText.trim() }]
      }));
      setOptionText("");
    }
  };

  const removeOption = (index) => {
    setFieldData(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }));
  };

  const needsOptions = ["select", "radio", "checkboxGroup"].includes(fieldData.type);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{field ? "Edit Field" : "Add Field"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Field Type</InputLabel>
              <Select
                value={fieldData.type}
                onChange={(e) => setFieldData(prev => ({ ...prev, type: e.target.value }))}
                label="Field Type"
              >
                {fieldTypes.map(type => (
                  <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Field Label"
              value={fieldData.label}
              onChange={(e) => setFieldData(prev => ({ ...prev, label: e.target.value }))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Field Name"
              value={fieldData.name}
              onChange={(e) => setFieldData(prev => ({ ...prev, name: e.target.value }))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Placeholder"
              value={fieldData.placeholder}
              onChange={(e) => setFieldData(prev => ({ ...prev, placeholder: e.target.value }))}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Helper Text"
              value={fieldData.helperText}
              onChange={(e) => setFieldData(prev => ({ ...prev, helperText: e.target.value }))}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={fieldData.required}
                  onChange={(e) => setFieldData(prev => ({ ...prev, required: e.target.checked }))}
                />
              }
              label="Required Field"
            />
          </Grid>
          {needsOptions && (
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>Options</Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Add option"
                  value={optionText}
                  onChange={(e) => setOptionText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addOption()}
                />
                <Button onClick={addOption} variant="outlined" size="small">Add</Button>
              </Box>
              {fieldData.options.map((option, index) => (
                <Chip
                  key={index}
                  label={option.label}
                  onDelete={() => removeOption(index)}
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" disabled={!fieldData.label || !fieldData.name}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Dynamic Form Renderer
const DynamicFormRenderer = ({ formConfig, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});

  const handleFieldChange = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: "" }));
    }
  };

  const validateStep = (stepIndex) => {
    const step = formConfig.steps[stepIndex];
    const stepErrors = {};
    
    step.fields.forEach(field => {
      if (field.required && (!formData[field.name] || formData[field.name] === "")) {
        stepErrors[field.name] = "This field is required";
      }
    });

    return stepErrors;
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length === 0) {
      setCurrentStep(prev => prev + 1);
    } else {
      setErrors(stepErrors);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    const allErrors = {};
    formConfig.steps.forEach((step, stepIndex) => {
      const stepErrors = validateStep(stepIndex);
      Object.assign(allErrors, stepErrors);
    });

    if (Object.keys(allErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(allErrors);
    }
  };

  const renderField = (field) => {
    const commonProps = {
      key: field.name,
      label: field.label,
      value: formData[field.name] || "",
      onChange: (e) => handleFieldChange(field.name, e.target.value),
      error: errors[field.name],
      helperText: field.helperText,
      required: field.required,
      placeholder: field.placeholder,
    };

    switch (field.type) {
      case "text":
        return <TextInput {...commonProps} />;
      case "email":
        return <EmailInput {...commonProps} />;
      case "password":
        return <PasswordInput {...commonProps} />;
      case "phone":
        return <PhoneInput {...commonProps} />;
      case "select":
        return <SelectInput {...commonProps} options={field.options} />;
      case "radio":
        return <RadioInput {...commonProps} options={field.options} />;
      case "checkbox":
        return (
          <CheckboxInput
            {...commonProps}
            checked={formData[field.name] || false}
            onChange={(e) => handleFieldChange(field.name, e.target.checked)}
          />
        );
      case "checkboxGroup":
        return (
          <CheckboxGroup
            {...commonProps}
            value={formData[field.name] || []}
            options={field.options}
          />
        );
      case "date":
        return <DateInput {...commonProps} />;
      case "slider":
        return (
          <SliderInput
            {...commonProps}
            value={formData[field.name] || 0}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
          />
        );
      case "rating":
        return (
          <RatingInput
            {...commonProps}
            value={formData[field.name] || 0}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
          />
        );
      default:
        return <TextInput {...commonProps} />;
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>{formConfig.title}</Typography>
      {formConfig.description && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {formConfig.description}
        </Typography>
      )}

      <Stepper activeStep={currentStep} orientation="vertical">
        {formConfig.steps.map((step, stepIndex) => (
          <Step key={stepIndex}>
            <StepLabel>{step.title}</StepLabel>
            <StepContent>
              <Grid container spacing={3}>
                {step.fields.map((field, fieldIndex) => (
                  <Grid item xs={12} md={6} key={fieldIndex}>
                    {renderField(field)}
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ mb: 2, mt: 3 }}>
                <div>
                  <Button
                    disabled={currentStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  {currentStep === formConfig.steps.length - 1 ? (
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      color="primary"
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      color="primary"
                    >
                      Next
                    </Button>
                  )}
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Paper>
  );
};

// Form Preview Component
const FormPreview = ({ formConfig, formData }) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Form Preview</Typography>
      <Divider sx={{ mb: 2 }} />
      
      <Typography variant="h5" gutterBottom>{formConfig.title}</Typography>
      {formConfig.description && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {formConfig.description}
        </Typography>
      )}

      {formConfig.steps.map((step, stepIndex) => (
        <Box key={stepIndex} sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {step.title}
          </Typography>
          <Grid container spacing={2}>
            {step.fields.map((field, fieldIndex) => (
              <Grid item xs={12} md={6} key={fieldIndex}>
                <Box sx={{ p: 2, border: '1px dashed #ccc', borderRadius: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {field.type.toUpperCase()}
                  </Typography>
                  <Typography variant="body1">
                    {field.label} {field.required && <span style={{ color: 'red' }}>*</span>}
                  </Typography>
                  {field.placeholder && (
                    <Typography variant="body2" color="text.secondary">
                      Placeholder: {field.placeholder}
                    </Typography>
                  )}
                  {field.helperText && (
                    <Typography variant="body2" color="text.secondary">
                      Helper: {field.helperText}
                    </Typography>
                  )}
                  {field.options && field.options.length > 0 && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Options: {field.options.map(opt => opt.label).join(', ')}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Paper>
  );
};

// JSON Config Display Component
const JsonConfigDisplay = ({ formConfig }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(formConfig, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">JSON Configuration</Typography>
        <Button
          variant="outlined"
          onClick={handleCopy}
          startIcon={<Code />}
          size="small"
        >
          {copied ? 'Copied!' : 'Copy JSON'}
        </Button>
      </Box>
      <Box
        component="pre"
        sx={{
          backgroundColor: '#f5f5f5',
          p: 2,
          borderRadius: 1,
          overflow: 'auto',
          maxHeight: '400px',
          fontSize: '0.875rem',
          fontFamily: 'monospace',
        }}
      >
        {JSON.stringify(formConfig, null, 2)}
      </Box>
    </Paper>
  );
};

// Main Application Component
const DynamicFormGenerator = () => {
  const [mode, setMode] = useState(0); // 0: Builder, 1: Preview, 2: Live Form, 3: JSON
  const [formConfig, setFormConfig] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);

  const handleFormSave = (config) => {
    setFormConfig(config);
    setMode(2); // Switch to live form
  };

  const handleFormSubmit = (data) => {
    setSubmittedData(data);
    alert('Form submitted successfully!');
  };

  const resetForm = () => {
    setFormConfig(null);
    setSubmittedData(null);
    setMode(0);
  };

  // Sample form configurations
  const sampleForms = {
    registration: {
      title: "User Registration",
      description: "Create your account with us",
      steps: [
        {
          title: "Personal Information",
          fields: [
            {
              type: "text",
              label: "First Name",
              name: "firstName",
              placeholder: "Enter your first name",
              required: true,
              helperText: "",
              options: []
            },
            {
              type: "text",
              label: "Last Name",
              name: "lastName",
              placeholder: "Enter your last name",
              required: true,
              helperText: "",
              options: []
            },
            {
              type: "email",
              label: "Email Address",
              name: "email",
              placeholder: "Enter your email",
              required: true,
              helperText: "We'll never share your email",
              options: []
            },
            {
              type: "phone",
              label: "Phone Number",
              name: "phone",
              placeholder: "",
              required: true,
              helperText: "",
              options: []
            }
          ]
        },
        {
          title: "Account Details",
          fields: [
            {
              type: "password",
              label: "Password",
              name: "password",
              placeholder: "Create a strong password",
              required: true,
              helperText: "Minimum 8 characters",
              options: []
            },
            {
              type: "select",
              label: "Account Type",
              name: "accountType",
              placeholder: "",
              required: true,
              helperText: "",
              options: [
                { value: "personal", label: "Personal" },
                { value: "business", label: "Business" },
                { value: "enterprise", label: "Enterprise" }
              ]
            },
            {
              type: "checkboxGroup",
              label: "Interests",
              name: "interests",
              placeholder: "",
              required: false,
              helperText: "Select your areas of interest",
              options: [
                { value: "technology", label: "Technology" },
                { value: "sports", label: "Sports" },
                { value: "music", label: "Music" },
                { value: "travel", label: "Travel" }
              ]
            },
            {
              type: "checkbox",
              label: "I agree to the terms and conditions",
              name: "agreeTerms",
              placeholder: "",
              required: true,
              helperText: "",
              options: []
            }
          ]
        }
      ]
    },
    survey: {
      title: "Customer Satisfaction Survey",
      description: "Help us improve our services",
      steps: [
        {
          title: "Service Rating",
          fields: [
            {
              type: "rating",
              label: "Overall Satisfaction",
              name: "overallRating",
              placeholder: "",
              required: true,
              helperText: "Rate your overall experience",
              options: []
            },
            {
              type: "radio",
              label: "How did you hear about us?",
              name: "hearAbout",
              placeholder: "",
              required: true,
              helperText: "",
              options: [
                { value: "social", label: "Social Media" },
                { value: "friend", label: "Friend/Family" },
                { value: "search", label: "Search Engine" },
                { value: "advertisement", label: "Advertisement" }
              ]
            },
            {
              type: "slider",
              label: "Likelihood to Recommend",
              name: "recommend",
              placeholder: "",
              required: true,
              helperText: "0 = Not likely, 10 = Very likely",
              options: []
            }
          ]
        },
        {
          title: "Additional Feedback",
          fields: [
            {
              type: "text",
              label: "Additional Comments",
              name: "comments",
              placeholder: "Share your thoughts...",
              required: false,
              helperText: "",
              options: []
            },
            {
              type: "date",
              label: "Date of Service",
              name: "serviceDate",
              placeholder: "",
              required: false,
              helperText: "",
              options: []
            }
          ]
        }
      ]
    }
  };

  const loadSampleForm = (formKey) => {
    setFormConfig(sampleForms[formKey]);
    setMode(2);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          Dynamic Form Generator
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Create beautiful multi-step forms with our intuitive form builder
        </Typography>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={mode} onChange={(e, newValue) => setMode(newValue)} centered>
          <Tab label="Form Builder" icon={<Edit />} />
          <Tab label="Preview" icon={<Preview />} disabled={!formConfig} />
          <Tab label="Live Form" icon={<PlayArrow />} disabled={!formConfig} />
          <Tab label="JSON Config" icon={<Code />} disabled={!formConfig} />
        </Tabs>
      </Paper>

      {mode === 0 && (
        <Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Start - Load Sample Forms
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                variant="outlined"
                onClick={() => loadSampleForm('registration')}
              >
                User Registration Form
              </Button>
              <Button
                variant="outlined"
                onClick={() => loadSampleForm('survey')}
              >
                Customer Survey Form
              </Button>
            </Box>
            <Divider sx={{ my: 3 }} />
          </Box>
          <FormBuilder onFormSave={handleFormSave} />
        </Box>
      )}

      {mode === 1 && formConfig && (
        <FormPreview formConfig={formConfig} />
      )}

      {mode === 2 && formConfig && (
        <Box>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5">Live Form</Typography>
            <Button onClick={resetForm} variant="outlined">
              Create New Form
            </Button>
          </Box>
          <DynamicFormRenderer
            formConfig={formConfig}
            onSubmit={handleFormSubmit}
          />
          {submittedData && (
            <Paper sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Submitted Data
              </Typography>
              <Box
                component="pre"
                sx={{
                  backgroundColor: '#f5f5f5',
                  p: 2,
                  borderRadius: 1,
                  overflow: 'auto',
                  fontSize: '0.875rem',
                  fontFamily: 'monospace',
                }}
              >
                {JSON.stringify(submittedData, null, 2)}
              </Box>
            </Paper>
          )}
        </Box>
      )}

      {mode === 3 && formConfig && (
        <JsonConfigDisplay formConfig={formConfig} />
      )}

      {!formConfig && mode !== 0 && (
        <Alert severity="info" sx={{ mt: 3 }}>
          No form configuration found. Please create a form first using the Form Builder.
        </Alert>
      )}
    </Container>
  );
};

export default DynamicFormGenerator;