import React, { useState } from 'react';
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
  Alert
} from '@mui/material';

// Default step configuration - you can customize this
const defaultSteps = [
  {
    label: 'Personal Information',
    fields: [
      { name: 'firstName', label: 'First Name', type: 'text', required: true },
      { name: 'lastName', label: 'Last Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true }
    ]
  },
  {
    label: 'Contact Details',
    fields: [
      { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
      { name: 'address', label: 'Address', type: 'text', required: false },
      { name: 'city', label: 'City', type: 'text', required: true }
    ]
  },
  {
    label: 'Preferences',
    fields: [
      { 
        name: 'category', 
        label: 'Category', 
        type: 'select', 
        required: true,
        options: [
          { value: 'business', label: 'Business' },
          { value: 'personal', label: 'Personal' },
          { value: 'education', label: 'Education' }
        ]
      },
      { name: 'newsletter', label: 'Subscribe to Newsletter', type: 'checkbox', required: false }
    ]
  }
];

const CustomStepperForm = ({ 
  steps = defaultSteps, 
  onSubmit = (data) => console.log('Form submitted:', data),
  onStepChange = (step) => console.log('Step changed:', step),
  initialData = {},
  submitButtonText = 'Submit',
  nextButtonText = 'Next',
  backButtonText = 'Back'
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

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

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  };

  const validateCurrentStep = () => {
    const currentStepFields = steps[activeStep].fields;
    const newErrors = {};
    
    currentStepFields.forEach(field => {
      if (field.required && (!formData[field.name] || formData[field.name] === '')) {
        newErrors[field.name] = `${field.label} is required`;
      }
      
      // Email validation
      if (field.type === 'email' && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.name])) {
          newErrors[field.name] = 'Please enter a valid email address';
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateCurrentStep()) {
      onSubmit(formData);
    }
  };

  const renderField = (field) => {
    const value = formData[field.name] || '';
    const error = errors[field.name];

    switch (field.type) {
      case 'select':
        return (
          <FormControl fullWidth margin="normal" key={field.name} error={!!error}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={value}
              label={field.label}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
            >
              {field.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {error && <Typography variant="caption" color="error" sx={{ mt: 1 }}>{error}</Typography>}
          </FormControl>
        );
      
      case 'checkbox':
        return (
          <FormControlLabel
            key={field.name}
            control={
              <Checkbox
                checked={!!value}
                onChange={(e) => handleInputChange(field.name, e.target.checked)}
              />
            }
            label={field.label}
            sx={{ mt: 2, mb: 1 }}
          />
        );
      
      default:
        return (
          <TextField
            key={field.name}
            fullWidth
            margin="normal"
            label={field.label}
            type={field.type}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
            error={!!error}
            helperText={error}
          />
        );
    }
  };

  const isLastStep = activeStep === steps.length - 1;

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Form Completed Successfully!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Thank you for submitting the form. Your information has been received.
          </Typography>
          <Button onClick={handleReset} variant="outlined">
            Reset Form
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography variant="h6" gutterBottom>
            {steps[activeStep].label}
          </Typography>
          
          <Box sx={{ mt: 2, mb: 3 }}>
            {steps[activeStep].fields.map(renderField)}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
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
  );
};

// Example usage with custom configuration
const ExampleUsage = () => {
  const customSteps = [
    {
      label: 'Account Setup',
      fields: [
        { name: 'username', label: 'Username', type: 'text', required: true },
        { name: 'password', label: 'Password', type: 'password', required: true }
      ]
    },
    {
      label: 'Profile',
      fields: [
        { name: 'bio', label: 'Bio', type: 'text', required: false },
        { 
          name: 'role', 
          label: 'Role', 
          type: 'select', 
          required: true,
          options: [
            { value: 'admin', label: 'Administrator' },
            { value: 'user', label: 'User' },
            { value: 'moderator', label: 'Moderator' }
          ]
        }
      ]
    }
  ];

  const handleFormSubmit = (data) => {
    alert('Custom form submitted! Check console for data.');
    console.log('Custom form data:', data);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        Reusable MUI Stepper Form
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        This is a reusable stepper form component. You can customize steps, fields, validation, and callbacks.
      </Alert>

      <CustomStepperForm
        steps={customSteps}
        onSubmit={handleFormSubmit}
        onStepChange={(step) => console.log('Step changed to:', step)}
        initialData={{ username: '', role: 'user' }}
        submitButtonText="Create Account"
      />
    </Box>
  );
};

export default ExampleUsage;