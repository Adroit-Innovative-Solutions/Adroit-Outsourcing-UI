import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Alert,
  Grid,
  Divider,
  Radio,
  RadioGroup,
  FormLabel,
  Switch,
  Slider,
  Rating,
  Autocomplete,
  Chip,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { format } from "date-fns";

// Enhanced FormGenerator component integrated with Stepper
const StepperFormGenerator = ({
  stepperConfig,
  onSubmit = (data) => console.log("Form submitted:", data),
  onStepChange = (step) => console.log("Step changed:", step),
  initialData = {},
  submitButtonText = "Submit",
  nextButtonText = "Next",
  backButtonText = "Back",
  title = "Dynamic Stepper Form",
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(() => {
    // Initialize form data based on all steps
    const initialFormData = { ...initialData };
    stepperConfig.steps?.forEach((step) => {
      step.fields?.forEach((field) => {
        if (initialFormData[field.name] === undefined) {
          // Set default values based on field type
          switch (field.type) {
            case "multiselect":
            case "checkboxGroup":
              initialFormData[field.name] = field.defaultValue || [];
              break;
            case "checkbox":
            case "switch":
              initialFormData[field.name] = field.defaultValue || false;
              break;
            case "slider":
              initialFormData[field.name] =
                field.defaultValue || field.min || 0;
              break;
            case "rating":
              initialFormData[field.name] = field.defaultValue || 0;
              break;
            case "date":
            case "time":
            case "datetime":
              initialFormData[field.name] = field.defaultValue || null;
              break;
            default:
              initialFormData[field.name] = field.defaultValue || "";
          }
        }
      });
    });
    return initialFormData;
  });
  const [errors, setErrors] = useState({});

  const currentStep = stepperConfig.steps?.[activeStep];

  const handleNext = () => {
    if (validateCurrentStep()) {
      const newStep = activeStep + 1;
      setActiveStep(newStep);
      onStepChange(newStep);
    }
  };

  const handleBack = () => {
    const newStep = activeStep - 1;
    setActiveStep(newStep);
    onStepChange(newStep);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData(initialData);
    setErrors({});
  };

  const handleFieldChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
    }
  };

  const validateCurrentStep = () => {
    if (!currentStep || !currentStep.fields) return true;

    const newErrors = {};

    currentStep.fields.forEach((field) => {
      const value = formData[field.name];

      if (field.required) {
        if (
          !value ||
          (Array.isArray(value) && value.length === 0) ||
          value === "" ||
          (["date", "time", "datetime"].includes(field.type) && value === null)
        ) {
          newErrors[field.name] = `${field.label} is required`;
        }
      }

      // Email validation
      if (field.type === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.name] = "Please enter a valid email address";
        }
      }

      // Custom validation
      if (field.validation && value) {
        const validationResult = field.validation(value, formData);
        if (validationResult !== true) {
          newErrors[field.name] = validationResult;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = () => {
  if (validateCurrentStep()) {
    // Format date fields before submitting
    const formattedData = { ...formData };
    stepperConfig.steps.forEach((step) => {
      step.fields.forEach((field) => {
        const value = formData[field.name];
        if (
          (field.type === "date" ||
            field.type === "datetime" ||
            field.type === "time") &&
          value instanceof Date
        ) {
          const dateFormat =
            field.type === "time"
              ? "HH:mm"
              : field.type === "datetime"
              ? "dd/MM/yyyy HH:mm"
              : "dd/MM/yyyy";

          formattedData[field.name] = format(value, dateFormat);
        }
      });
    });

    onSubmit(formattedData); // ✅ Submit formatted data
  }
};

  const renderField = (field) => {
    const value =
      formData[field.name] ||
      (field.type === "multiselect" || field.type === "checkboxGroup"
        ? []
        : "");
    const error = errors[field.name];

    const commonProps = {
      fullWidth: true,
      margin: "normal",
      error: !!error,
      helperText: error || field.helperText,
      required: field.required,
      disabled: field.disabled,
    };

    switch (field.type) {
      case "text":
      case "email":
      case "password":
      case "tel":
      case "number":
        return (
          <TextField
            key={field.name}
            {...commonProps}
            label={field.label}
            type={field.type}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            multiline={field.multiline}
            rows={field.rows}
          />
        );

      case "select":
        return (
          <FormControl key={field.name} {...commonProps}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={value}
              label={field.label}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
            >
              {field.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {error && (
              <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
          </FormControl>
        );

      case "multiselect":
        return (
          <FormControl key={field.name} {...commonProps}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              multiple
              value={value}
              label={field.label}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((val) => {
                    const option = field.options?.find(
                      (opt) => opt.value === val
                    );
                    return (
                      <Chip
                        key={val}
                        label={option?.label || val}
                        size="small"
                      />
                    );
                  })}
                </Box>
              )}
            >
              {field.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {error && (
              <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
          </FormControl>
        );

      case "radio":
        return (
          <Box key={field.name} sx={{ mt: 2, mb: 1 }}>
            <FormLabel component="legend" error={!!error}>
              {field.label}
            </FormLabel>
            <RadioGroup
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              row={field.row}
            >
              {field.options?.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
            {error && (
              <Typography variant="caption" color="error">
                {error}
              </Typography>
            )}
          </Box>
        );

      case "checkbox":
        return (
          <FormControlLabel
            key={field.name}
            control={
              <Checkbox
                checked={!!value}
                onChange={(e) =>
                  handleFieldChange(field.name, e.target.checked)
                }
              />
            }
            label={field.label}
            sx={{ mt: 2, mb: 1 }}
          />
        );

      case "switch":
        return (
          <FormControlLabel
            key={field.name}
            control={
              <Switch
                checked={!!value}
                onChange={(e) =>
                  handleFieldChange(field.name, e.target.checked)
                }
              />
            }
            label={field.label}
            sx={{ mt: 2, mb: 1 }}
          />
        );

      case "slider":
        return (
          <Box key={field.name} sx={{ mt: 3, mb: 2 }}>
            <Typography gutterBottom>{field.label}</Typography>
            <Slider
              value={value || field.min || 0}
              onChange={(e, newValue) =>
                handleFieldChange(field.name, newValue)
              }
              min={field.min || 0}
              max={field.max || 100}
              step={field.step || 1}
              marks={field.marks}
              valueLabelDisplay="auto"
            />
            {error && (
              <Typography variant="caption" color="error">
                {error}
              </Typography>
            )}
          </Box>
        );

      case "rating":
        return (
          <Box key={field.name} sx={{ mt: 2, mb: 1 }}>
            <Typography component="legend">{field.label}</Typography>
            <Rating
              value={value || 0}
              onChange={(e, newValue) =>
                handleFieldChange(field.name, newValue)
              }
              max={field.max || 5}
            />
            {error && (
              <Typography variant="caption" color="error">
                {error}
              </Typography>
            )}
          </Box>
        );

      case "autocomplete":
        return (
          <Autocomplete
            key={field.name}
            options={field.options || []}
            value={
              field.multiple
                ? value
                : field.options?.find((opt) => opt.value === value) || null
            }
            onChange={(e, newValue) => {
              if (field.multiple) {
                handleFieldChange(
                  field.name,
                  newValue?.map((item) => item.value) || []
                );
              } else {
                handleFieldChange(field.name, newValue?.value || "");
              }
            }}
            getOptionLabel={(option) => option.label || ""}
            multiple={field.multiple}
            freeSolo={field.freeSolo}
            renderInput={(params) => (
              <TextField
                {...params}
                {...commonProps}
                label={field.label}
                placeholder={field.placeholder}
              />
            )}
          />
        );

      case "date":
        return (
          <LocalizationProvider key={field.name} dateAdapter={AdapterDateFns}>
            <DatePicker
              label={field.label}
              value={value}
              onChange={(newValue) => handleFieldChange(field.name, newValue)}
              renderInput={(params) => (
                <TextField {...params} {...commonProps} fullWidth />
              )}
              inputFormat={field.format || "MM/dd/yyyy"}
              disableFuture={field.disableFuture}
              disablePast={field.disablePast}
              minDate={field.minDate}
              maxDate={field.maxDate}
            />
          </LocalizationProvider>
        );

      case "time":
        return (
          <LocalizationProvider key={field.name} dateAdapter={AdapterDateFns}>
            <TimePicker
              label={field.label}
              value={value}
              onChange={(newValue) => handleFieldChange(field.name, newValue)}
              renderInput={(params) => (
                <TextField {...params} {...commonProps} fullWidth />
              )}
              ampm={field.ampm !== false} // default to true
            />
          </LocalizationProvider>
        );

      case "datetime":
        return (
          <LocalizationProvider key={field.name} dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label={field.label}
              value={value}
              onChange={(newValue) => handleFieldChange(field.name, newValue)}
              renderInput={(params) => (
                <TextField {...params} {...commonProps} fullWidth />
              )}
              inputFormat={field.format || "MM/dd/yyyy hh:mm a"}
              disableFuture={field.disableFuture}
              disablePast={field.disablePast}
              minDate={field.minDate}
              maxDate={field.maxDate}
              ampm={field.ampm !== false} // default to true
            />
          </LocalizationProvider>
        );

      case "textarea":
        return (
          <TextField
            key={field.name}
            {...commonProps}
            label={field.label}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            multiline
            rows={field.rows || 4}
            placeholder={field.placeholder}
          />
        );

      default:
        console.warn(`Unknown field type: ${field.type}`);
        return null;
    }
  };

  const isLastStep = activeStep === stepperConfig.steps?.length - 1;

  if (!stepperConfig || !stepperConfig.steps) {
    return (
      <Paper sx={{ p: 3 }}>
        <Alert severity="error">
          Invalid stepper configuration. Please provide a valid stepperConfig
          with steps array.
        </Alert>
      </Paper>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ maxWidth: stepperConfig.maxWidth || 800, mx: "auto", p: 2 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          {/* Form Title */}
          <Typography variant="h4" gutterBottom align="center">
            {stepperConfig.title || title}
          </Typography>

          {/* Form Description */}
          {stepperConfig.description && (
            <>
              <Typography
                variant="body1"
                color="text.secondary"
                paragraph
                align="center"
              >
                {stepperConfig.description}
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </>
          )}

          {/* Stepper */}
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {stepperConfig.steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Content */}
          {activeStep === stepperConfig.steps.length ? (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" gutterBottom color="success.main">
                ✅ Form Completed Successfully!
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Thank you for submitting the form. Your information has been
                received.
              </Typography>
              <Button onClick={handleReset} variant="outlined">
                Reset Form
              </Button>
            </Box>
          ) : (
            <Box>
              <Typography variant="h6" gutterBottom>
                {currentStep.label}
              </Typography>

              {currentStep.description && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {currentStep.description}
                </Typography>
              )}

              <Grid container spacing={currentStep.spacing || 2}>
                {currentStep.fields?.map((field) => (
                  <Grid
                    item
                    xs={field.gridSize?.xs || 12}
                    sm={field.gridSize?.sm || 12}
                    md={field.gridSize?.md || 6}
                    lg={field.gridSize?.lg}
                    xl={field.gridSize?.xl}
                    key={field.name}
                  >
                    {renderField(field)}
                  </Grid>
                ))}
              </Grid>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
              >
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                >
                  {backButtonText}
                </Button>

                <Button
                  variant="contained"
                  onClick={isLastStep ? handleSubmit : handleNext}
                  sx={{ ml: 1 }}
                >
                  {isLastStep ? submitButtonText : nextButtonText}
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
      </Box>
    </LocalizationProvider>
  );
};

// Example usage with comprehensive configuration including date pickers
const ExampleUsage = () => {
  const stepperConfig = {
    title: "Event Registration Form",
    description: "Please fill out all steps to register for the event",
    maxWidth: 900,
    steps: [
      {
        label: "Personal Information",
        description: "Basic information about yourself",
        spacing: 3,
        fields: [
          {
            name: "firstName",
            label: "First Name",
            type: "text",
            required: true,
            gridSize: { xs: 12, md: 6 },
          },
          {
            name: "lastName",
            label: "Last Name",
            type: "text",
            required: true,
            gridSize: { xs: 12, md: 6 },
          },
          {
            name: "email",
            label: "Email Address",
            type: "email",
            required: true,
            gridSize: { xs: 12 },
          },
          {
            name: "birthDate",
            label: "Date of Birth",
            type: "date",
            required: true,
            gridSize: { xs: 12, md: 6 },
            disableFuture: true,
            format: "MM/dd/yyyy",
          },
          {
            name: "gender",
            label: "Gender",
            type: "radio",
            required: true,
            row: true,
            gridSize: { xs: 12, md: 6 },
            options: [
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ],
          },
        ],
      },
      {
        label: "Event Details",
        description: "Information about the event you want to attend",
        fields: [
          {
            name: "eventDate",
            label: "Event Date",
            type: "date",
            required: true,
            gridSize: { xs: 12, md: 6 },
            disablePast: true,
            minDate: new Date(),
          },
          {
            name: "eventTime",
            label: "Event Time",
            type: "time",
            required: true,
            gridSize: { xs: 12, md: 6 },
          },
          {
            name: "preferredSession",
            label: "Preferred Session",
            type: "select",
            required: true,
            gridSize: { xs: 12 },
            options: [
              { value: "morning", label: "Morning Session (9AM-12PM)" },
              { value: "afternoon", label: "Afternoon Session (1PM-4PM)" },
              { value: "evening", label: "Evening Session (5PM-8PM)" },
            ],
          },
          {
            name: "specialRequirements",
            label: "Special Requirements",
            type: "textarea",
            placeholder: "Any dietary restrictions, accessibility needs, etc.",
            rows: 3,
            gridSize: { xs: 12 },
          },
        ],
      },
      {
        label: "Preferences & Confirmation",
        description: "Finalize your registration",
        fields: [
          {
            name: "interests",
            label: "Topics of Interest",
            type: "multiselect",
            required: true,
            gridSize: { xs: 12, md: 6 },
            options: [
              { value: "technology", label: "Technology" },
              { value: "design", label: "Design" },
              { value: "business", label: "Business" },
              { value: "marketing", label: "Marketing" },
              { value: "data", label: "Data Science" },
            ],
          },
          {
            name: "experienceLevel",
            label: "Experience Level",
            type: "slider",
            required: true,
            min: 0,
            max: 10,
            step: 1,
            marks: [
              { value: 0, label: "Beginner" },
              { value: 5, label: "Intermediate" },
              { value: 10, label: "Expert" },
            ],
            gridSize: { xs: 12, md: 6 },
          },
          {
            name: "arrivalTime",
            label: "Estimated Arrival Time",
            type: "datetime",
            required: true,
            gridSize: { xs: 12, md: 6 },
            minDate: new Date(),
          },
          {
            name: "newsletter",
            label: "Subscribe to our newsletter",
            type: "switch",
            defaultValue: true,
            gridSize: { xs: 12, md: 6 },
          },
          {
            name: "termsAccepted",
            label: "I accept the terms and conditions",
            type: "checkbox",
            required: true,
            gridSize: { xs: 12 },
          },
        ],
      },
    ],
  };

  const handleFormSubmit = (data) => {
    console.log("Form submitted with data fromexample component", data);
    // Here you would typically send the data to your backend
    alert("Form submitted successfully!");
  };

  const handleStepChange = (step) => {
    console.log("Step changed to:", step);
  };

  return (
    <Box sx={{ p: 2, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <StepperFormGenerator
        stepperConfig={stepperConfig}
        onSubmit={handleFormSubmit}
        onStepChange={handleStepChange}
        submitButtonText="Complete Registration"
      />
    </Box>
  );
};

export default ExampleUsage;
